import React, { useState, useEffect, useRef } from "react";
import {
  LocalVideoTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
} from "livekit-client";
import MainBg from '../../assets/mainBg.png';
import Graphic from "../PlayTarot/Graphic";
import LeaveOfIcon  from '../../assets/방떠나기.png';
import SaveDrawOfIcon from '../../assets/그림 공유.png'
import ClearOfIcon from '../../assets/지우기.png'
import CloseDrowIcon from '../../assets/캔버스 끄기.png'
import OpenDrowIcon from '../../assets/캔버스 켜기.png'
import SelectIcon from '../../assets/선택완료.png'
import DrawingCanvasComponent, { DrawingCanvasHandle } from "../../components/WebRTC/Tools/DrawingCanvasComponent";
import ProfileModal from "../../components/WebRTC/Tools/ProfileModal";
import ScenarioPanel from "../../components/WebRTC/Controller/ScenarioPanel";
import { useLocation } from "react-router-dom";

// 정의된 타입
type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

interface RTCTest {
  // token: string; // 토큰
  // name: string; // 닉네임
  // type: string; // 룸 타입
  // position :string; token, name, type,position
}

// WebRTCpage 컴포넌트
const WebRTCpage: React.FC<RTCTest> = ({ }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const token = query.get('token') || '';
  const name = query.get('name') || '';
  const type = query.get('type') || '';
  const position = query.get('position') || '';
  console.log(token, name, type, position);

  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(undefined);
  const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);
  const [participantName, setParticipantName] = useState(position);
  const [roomName, setRoomName] = useState(token);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [displayedVideoTrackSid, setDisplayedVideoTrackSid] = useState<string | null>(null);
  const [isCanvasVisible, setIsCanvasVisible] = useState<boolean>(false); // 캔버스 표시 상태 관리

    const [isMuted, setIsMuted] = useState(false); // 음소거 상태 관리
    const [isVideoOff, setIsVideoOff] = useState(false); // 비디오 끄기 상태 관리
    
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // 모달 표시 상태 관리
    const [taroimageData, setTaroimageData]=useState<any>(null);
    const canvasRef = useRef<DrawingCanvasHandle | null>(null);
    const [isProfileModalVisible, setIsProfileModalVisible] = useState<boolean>(false);

    const [isCardSelectionOngoing, setIsCardSelectionOngoing] = useState(false);
    const [currentScenario, setCurrentScenario] = useState<'입장 인사'|'카드 선택 시간' | '카드 선택 확인'|'결과 확인'|'마무리 인사'>('입장 인사');

  const APPLICATION_SERVER_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:6080/"
      : "https://" + window.location.hostname + ":6443/";

  const LIVEKIT_URL =
    window.location.hostname === "localhost"
      ? "ws://localhost:7880/"
      : "wss://" + window.location.hostname + ":7443/";

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRefs = useRef<{ [trackSid: string]: HTMLVideoElement | null }>({});
  // Effect to join the room on mount
  useEffect(() => {
    joinRoom();
    
    // Cleanup on unmount
    return () => {
      leaveRoom();
    };
  }, []);
  useEffect(() => {
    if (room) {
        console.log('Room is set. Listening for data events...');
        
        room.on(RoomEvent.DataReceived, async (data: Uint8Array) => {
            console.log('Data received:', data);
            //const { type, ...rest } = data;
            const jsonString = new TextDecoder().decode(data);
            
            console.log('JSON string:', jsonString);
            const jsonData = JSON.parse(jsonString);
            const { type, ...rest } = jsonData;
            //await canvasRef.current?.loadDrawing(jsonData);
            try {
                
                
                if (type === 'text') {
                    // Handle chat message
                    console.log('Received chat message:', jsonData);
                } else if (type === 'drawing') {
                    // Handle drawing data
                    console.log(rest)
                    await canvasRef.current?.loadDrawing(rest.data);
                    console.log('Drawing loaded successfully to canvas.');
                }  else if(type==='startCardSelection'){
                    setIsCardSelectionOngoing(true);
                }else if(type==='requestScreenshot'){
                    setIsCardSelectionOngoing(false);
                }
            } catch (error) {
                console.error('Error parsing JSON data:', error);
            }
        });
    } else {
        console.log('Room is undefined, no event listeners attached.');
    }
}, [room]);
  async function startScreenShare() {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: {
        frameRate: { ideal: 30, max: 60 },  // 프레임률 조정
        width: { ideal: 1920 },  // 해상도 조정 (가로)
        height: { ideal: 1080 }  // 해상도 조정 (세로)
      } });
      const screenTrack = new LocalVideoTrack(stream.getVideoTracks()[0]);

      if (room) {
        // 기존의 카메라 트랙이 있다면 비활성화
        if (localTrack) {
          await room.localParticipant.unpublishTrack(localTrack);
          await localTrack.stop();
        }

        // 화면 공유 트랙을 게시
        await room.localParticipant.publishTrack(screenTrack);
        setLocalTrack(screenTrack);

        setIsScreenSharing(true);
      }
    } catch (error) {
      console.error("화면 공유를 시작하는데 실패했습니다:", error);
    }
  }

  async function stopScreenShare() {
    if (isScreenSharing && room) {
      // 화면 공유 트랙을 비활성화
      if (localTrack) {
        await room.localParticipant.unpublishTrack(localTrack);
        await localTrack.stop();
      }

      // 카메라 트랙 복원
      const cameraTrack = await createCameraTrack();
      await room.localParticipant.publishTrack(cameraTrack);
      setLocalTrack(cameraTrack);

      setIsScreenSharing(false);
    }
  }

  async function createCameraTrack() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    return new LocalVideoTrack(stream.getVideoTracks()[0]);
  }

  async function joinRoom() {
    const room = new Room();
    setRoom(room);

    room.on(RoomEvent.TrackSubscribed, (_track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
      console.log("트랙 구독됨:", publication.trackSid);

      if (publication.kind === 'video') {
        // 첫 번째 비디오 트랙만 표시하고 나머지 비디오 트랙은 숨김
        if (displayedVideoTrackSid === null) {
          setDisplayedVideoTrackSid(publication.trackSid);
        }
      }

      setRemoteTracks((prev) => [
        ...prev,
        {
          trackPublication: publication,
          participantIdentity: participant.identity,
        },
      ]);
    });

    room.on(RoomEvent.TrackUnsubscribed, (_track: RemoteTrack, publication: RemoteTrackPublication) => {
      console.log("트랙 구독 해제됨:", publication.trackSid);

      setRemoteTracks((prev) =>
        prev.filter((track) => track.trackPublication.trackSid !== publication.trackSid)
      );

      // 비디오 트랙이 모두 해제되면 표시할 비디오 트랙 SID 초기화
      if (publication.trackSid === displayedVideoTrackSid) {
        setDisplayedVideoTrackSid(null);
      }
    });

    try {
      const token = await getToken(roomName, participantName);
      await room.connect(LIVEKIT_URL, token);

      // 화면 공유가 필요한 경우 시작
      if (isScreenSharing) {
        await startScreenShare();
      }
    } catch (error) {
      console.log("방에 연결하는 중 오류 발생:", (error as Error).message);
      await leaveRoom();
    }
  }

  async function leaveRoom() {
    if (room) {
      await room.disconnect();
    }
    setRoom(undefined);
    setLocalTrack(undefined);
    setRemoteTracks([]);
  }

  async function getToken(roomName: string, participantName: string) {
    const response = await fetch(APPLICATION_SERVER_URL + "tarotbom/openvidu/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomName: roomName,
        participantName: participantName,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`토큰을 가져오는 데 실패했습니다: ${error.errorMessage}`);
    }

    const data = await response.json();
    return data.token;
  }

  useEffect(() => {
    if (localTrack && localVideoRef.current) {
      localTrack.attach(localVideoRef.current);
    }

    return () => {
      if (localTrack) {
        localTrack.detach();
      }
    };
  }, [localTrack]);
  useEffect(() => {
    if (room) {
        console.log('Room is set. Listening for data events...');
        
        room.on(RoomEvent.DataReceived, async (data: Uint8Array) => {
            console.log('Data received:', data);
            //const { type, ...rest } = data;
            const jsonString = new TextDecoder().decode(data);
            
            console.log('JSON string:', jsonString);
            const jsonData = JSON.parse(jsonString);
            const { type, ...rest } = jsonData;
            //await canvasRef.current?.loadDrawing(jsonData);
            try {
                
                
                if (type === 'text') {
                    // Handle chat message
                    console.log('Received chat message:', jsonData);
                } else if (type === 'drawing') {
                    // Handle drawing data
                    console.log(rest)
                    await canvasRef.current?.loadDrawing(rest.data);
                    console.log('Drawing loaded successfully to canvas.');
                }  else if(type==='startCardSelection'){
                    setIsCardSelectionOngoing(true);
                }else if(type==='requestScreenshot'){
                    setIsCardSelectionOngoing(false);
                }
            } catch (error) {
                console.error('Error parsing JSON data:', error);
            }
        });
    } else {
        console.log('Room is undefined, no event listeners attached.');
    }
}, [room]);
async function handleDrawingUpdate(message: any) {
  // Combine the last drawing data with the new update
  // const combinedData = { ...lastDrawingData, ...data };
  //if(message.type!='drawing')
     // return;
  //const data=message.data
  if (room?.localParticipant.publishData) {
//            const dataToSend = JSON.stringify(data);
      const dataToSend = JSON.stringify(message);
      const uint8ArrayData = new TextEncoder().encode(dataToSend);
      console.log('Sending drawing update:', message);
      try {
      await room.localParticipant.publishData(uint8ArrayData);
      console.log('Data successfully sent.');
  } catch (error) {
      console.error('Error sending data:', error);
  }
  } else {
      console.error('Room or publishData function is undefined.');
  }
}
  function clearCanvas() {
    console.log('Clearing canvas...');
    canvasRef.current?.clearCanvas();
}

function saveDrawing() {
    console.log('Saving drawing...');
    canvasRef.current?.saveDrawing();
}
  useEffect(() => {
    remoteTracks.forEach((trackInfo) => {
      if (trackInfo.trackPublication.kind === "video" && remoteVideoRefs.current[trackInfo.trackPublication.trackSid]) {
        // 첫 번째 비디오 트랙만 랜더링
        if (trackInfo.trackPublication.trackSid === displayedVideoTrackSid) {
          trackInfo.trackPublication.videoTrack?.attach(remoteVideoRefs.current[trackInfo.trackPublication.trackSid]!);
        } else {
          // 비디오 트랙을 숨김
          trackInfo.trackPublication.videoTrack?.detach();
        }
      }
    });

    return () => {
      remoteTracks.forEach((trackInfo) => {
        if (trackInfo.trackPublication.kind === "video") {
          trackInfo.trackPublication.videoTrack?.detach();
        }
      });
    };
  }, [remoteTracks, displayedVideoTrackSid]);
  const handlePreviewCard = () => {
    setIsModalVisible(true);
  };
  const OpenProfile = () => {
    setIsProfileModalVisible(true);
};

  async function handleScenarioChange() {
    try {
        // 현재 시나리오를 가져오는 방법을 적절히 수정하세요.
        // 여기서는 시나리오 상태가 '카드 선택 시간'인지 '카드 선택 확인'인지 확인하는 것으로 가정합니다.
        //const currentScenario = scenarios[currentScenario]; // scenarios 배열에서 현재 시나리오 가져오기
        console.log(currentScenario)
        if (currentScenario ==='입장 인사'){setCurrentScenario('카드 선택 시간')}
        else if (currentScenario === '카드 선택 시간') {
            console.log('카드 선택 시간 설정');
            
            setIsCanvasVisible(true); // 그림 그리기 기능 활성화

            // 카드 선택 시작 메시지 전송
            const startScenarioMessage = JSON.stringify({ type: 'startCardSelection' });
            const uint8ArrayData = new TextEncoder().encode(startScenarioMessage);
            await room?.localParticipant.publishData(uint8ArrayData);
            setCurrentScenario('카드 선택 확인')
        } else if (currentScenario === '카드 선택 확인') {
            console.log('카드 선택 확인');
            setIsCanvasVisible(false); // 그림 그리기 기능 비활성화

            // 스크린샷 요청 메시지 전송
            const endScenarioMessage = JSON.stringify({ type: 'requestScreenshot' });
            const uint8ArrayEndData = new TextEncoder().encode(endScenarioMessage);
            await room?.localParticipant.publishData(uint8ArrayEndData);

            // 비디오 최대화 해제
   
            setCurrentScenario('결과 확인')
        }else{
            setCurrentScenario('마무리 인사')
        }
    } catch (error) {
        console.error('시나리오 변경 중 오류 발생:', error);
    }
    // Implementation for scenario change
    // 카드선택 시간이 되었을때 localVideoTrack을 최대화하고, 그림그리기 기능을 활성화 시킨다
    // 카드 선택 확인이 끝나면 webrtc를 통해 다른 참가자가 스크린샷 기능을 사용하도록 유도하며, localVideoTrack을 최대화하고, 그림그리기 기능을 비활성화시키며 결과를 송출한다
    // 이 과정이 webrtc를 통해 상대방 유저에게 동일하게 적용되어야 하며, localParticipant.publishData를 활용하여 webrtc로 통제를 전송하고, 모든 방 참가자를 통제해야한다
};
  const isSeeker = participantName === 'Seeker';

  return (
    <div>
      
        <div id="room">
        <img
                        className="absolute inset-0 w-full h-full object-cover  z-0"
                        src={MainBg}
                        alt="Main Background"
                    />
          <div id="layout-container">
            {/* 로컬 비디오가 시각적으로 표시되지 않지만 존재함 */}
            <div className="video-container local" style={{ display: 'none' }}>
              <video ref={localVideoRef} autoPlay={true} muted />
              <div className="participant-name">{participantName}</div>
            </div>
            
            {isSeeker ? (
              <div>
              <Graphic />
              {remoteTracks.map((remoteTrack) =>
                remoteTrack.trackPublication.kind === "audio" ? (
                  <div
                    className="audio-container"
                    key={remoteTrack.trackPublication.trackSid}
                  >
                  </div>
                ) : null
              )}
            </div>
            ) : (
              remoteTracks.map((remoteTrack) =>
                remoteTrack.trackPublication.kind === "video" ? (
                  <div
                    className="video-container w-full h-full flex items-center justify-center"
                    key={remoteTrack.trackPublication.trackSid}
                    style={{ display: remoteTrack.trackPublication.trackSid === displayedVideoTrackSid ? 'flex' : 'none' }}
                  >
                    <video
                      ref={(el) =>
                        (remoteVideoRefs.current[
                          remoteTrack.trackPublication.trackSid
                        ] = el)
                      }
                      autoPlay={true}
                      className="object-cover w-full h-full"
                      style={{ display: remoteTrack.trackPublication.trackSid === displayedVideoTrackSid ? 'block' : 'none' }}
                    />
                    <div className="participant-name">
                      {remoteTrack.participantIdentity}
                    </div>
                  </div>
                ) : (
                  <div
                    className="audio-container"
                    key={remoteTrack.trackPublication.trackSid}
                  >
                    <audio autoPlay={true} />
                  </div>
                )
              )
            )}
            <div className="fixed bottom-4 left-4 bg-white border border-gray-300 rounded-lg p-4 shadow-md flex space-x-4 z-50">
                    {/* <p>진행 상황판</p>
                    <button
                            className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                            onClick={OpenProfile}  // 여기서 handleScreenshot 핸들러 호출
                        ><p>시커 프로필</p>
                           
                        </button>
                        <button
                            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                            onClick={handleScenarioChange}
                        >
                            {scenarios[currentScenario]}
                        </button> */}
                        <ScenarioPanel onScenarioChange={handleScenarioChange} onOpenProfile={OpenProfile} />
                        {/* 진행 상황을 알려주는 변화하는 버튼 */}
                        {/* 누르면 그다음 시나리오로 넘어가는 시나리오 통제 */}
                        {/* 필요 시니라오 : 입장인사 -> 카드 선택 시간 -> 결과 확인 */}
                    </div>
                    {isProfileModalVisible && (
                        <ProfileModal
                            isVisible={isProfileModalVisible}
                            profileData={{
                                name: participantName,
                                email: 'example@example.com', // Replace with actual email or data
                                //favoriteReaderList: card // Replace with actual data if needed
                            }}
                            onClose={() => setIsProfileModalVisible(false)}
                        />
                    )}
                    {isCanvasVisible && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50 overflow-visible">
                                        <DrawingCanvasComponent onUpdate={handleDrawingUpdate} ref={canvasRef} />
                                    </div> )}
            <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-md flex space-x-4 z-50">
                        <p>선택 완료 : 시커</p>
                        <button
                          className={`btn ${isScreenSharing ? "btn-warning" : "btn-primary"}`}
                          onClick={() => isScreenSharing ? stopScreenShare() : startScreenShare()}
                        >
                          {isScreenSharing ? "화면 공유 중지" : "화면 공유 시작"}
                        </button>
                        <button
                            className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                            onClick={clearCanvas}
                        >
                            <img src={ClearOfIcon} alt="" className="w-8 h-8" />
                        </button>
                        <button
                            className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                            onClick={saveDrawing}
                        >
                            <img src={SaveDrawOfIcon} alt="" className="w-8 h-8" />
                        </button>
                        
                        <button 
                            className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                            onClick={() => setIsCanvasVisible(!isCanvasVisible)}
                        >
                            {isCanvasVisible ? 
                            <img src={CloseDrowIcon } alt="" /> :
                            <img src={OpenDrowIcon} alt="" />
                            }
                        </button>
                        <button
                            className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                            onClick={leaveRoom}
                        >
                            <img src={LeaveOfIcon} alt="" className="w-8 h-8" />
                        </button>{/* 토글 버튼 */}
                        
                        <button
                            className="preview-button"
                            onClick={() => handlePreviewCard()}
                        >
                            선택결과
                        </button>
                    </div>
          </div>
        </div>
  
    </div>
  );
};

export default WebRTCpage;
