import React, { useState, useEffect, useRef } from 'react';
import { Room, RoomEvent, LocalVideoTrack, LocalAudioTrack,RemoteTrack, RemoteTrackPublication, RemoteParticipant } from 'livekit-client';
import VideoComponent from './VideoComponent';
import AudioComponent from './AudioComponent';

import cardImg from '../../assets/tarot_images - 복사본/c01.jpg';
import ChatAndControls from './Controller/ChatAndControls';
import MainBg from '../../assets/mainBg.png';
import DrawingCanvasComponent, { DrawingCanvasHandle } from './Tools/DrawingCanvasComponent';
import ResizeComponent from './Controller/ResizeComponent';
import LeaveOfIcon  from '../../assets/방떠나기.png';
import SaveDrawOfIcon from '../../assets/그림 공유.png'
import ClearOfIcon from '../../assets/지우기.png'
import CloseDrowIcon from '../../assets/캔버스 끄기.png'
import OpenDrowIcon from '../../assets/캔버스 켜기.png'
import SelectIcon from '../../assets/선택완료.png'
import ColorChange from '../../assets/색상 수정.png'
import html2canvas from 'html2canvas';
import ScreenShootImageUpload from './Tools/ScreenShootImageUpload';
import ProfileModal from './Tools/ProfileModal';
import ScenarioPanel from './Controller/ScenarioPanel';
type TrackInfo = {
    trackPublication: RemoteTrackPublication;
    participantIdentity: string;
};

let APPLICATION_SERVER_URL = "";
let LIVEKIT_URL = "";
configureUrls();
interface RTCTest {
    token: string; // 토큰
    name: string; // 닉네임
    type: string; // 룸 타입
    position: string;
    candidateId:number;
  }
function configureUrls() {
    if (!APPLICATION_SERVER_URL) {
        if (window.location.hostname === "localhost") {
            APPLICATION_SERVER_URL = "http://localhost:6080/";
        } else {
            APPLICATION_SERVER_URL = "https://" + window.location.hostname + "/";
        }
    }

    if (!LIVEKIT_URL) {
        if (window.location.hostname === "localhost") {
            LIVEKIT_URL = "ws://localhost:7880/";
        } else {
            LIVEKIT_URL = "wss://" + window.location.hostname + "/";
        }
    }
}

const AppWebRTC:React.FC<RTCTest>= ({ token, name, type,position,candidateId })=> {
    const [room, setRoom] = useState<Room | undefined>(undefined);
    const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack | undefined>(undefined);
    const [localAudioTrack, setLocalAudioTrack] = useState<LocalAudioTrack | undefined>(undefined);
    const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);

    const [participantName, setParticipantName] = useState(position);//"Participant" + Math.floor(Math.random() * 100)
    const [roomName, setRoomName] = useState(token);
    const [cameraDeviceId, setCameraDeviceId] = useState<string | null>(null);
    const [audioDeviceId, setAudioDeviceId] = useState<string | null>(null);
    const [maximizedVideo, setMaximizedVideo] = useState<string | null>(null);
    const [isChatVisible, setIsChatVisible] = useState<boolean>(true);
    const [isCanvasVisible, setIsCanvasVisible] = useState<boolean>(false); // 캔버스 표시 상태 관리

    const [isMuted, setIsMuted] = useState(false); // 음소거 상태 관리
    const [isVideoOff, setIsVideoOff] = useState(false); // 비디오 끄기 상태 관리
    
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // 모달 표시 상태 관리
    const [taroimageData, setTaroimageData]=useState<any>(null);
    const canvasRef = useRef<DrawingCanvasHandle | null>(null);
    const [isProfileModalVisible, setIsProfileModalVisible] = useState<boolean>(false);

    const [isCardSelectionOngoing, setIsCardSelectionOngoing] = useState(false);
    const [currentScenario, setCurrentScenario] = useState<'입장 인사'|'카드 선택 시간' | '카드 선택 확인'|'결과 확인'|'마무리 인사'>('입장 인사');
    const [color, setColor] = useState('black'); // 초기 색깔 설정
    const [showColorPicker, setShowColorPicker] = useState(false); // 색깔 선택 메뉴 표시 여부
    console.log(token, name, type,position)
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
    useEffect(() => {
        const setupTracks = async () => {
            if (!cameraDeviceId || !room) {
                console.log('No camera device ID or room. Skipping video setup.');
                return;
            }

            console.log('Setting up video track with device ID:', cameraDeviceId);
            const videoStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: cameraDeviceId } });
            const videoTrack = new LocalVideoTrack(videoStream.getVideoTracks()[0]);
            await room.localParticipant.publishTrack(videoTrack);

            setLocalVideoTrack(videoTrack);
            console.log('Video track published:', videoTrack);
        };

        setupTracks();
    }, [cameraDeviceId, room]);

    useEffect(() => {
        const setupAudio = async () => {
            if (!audioDeviceId || !room) {
                console.log('No audio device ID or room. Skipping audio setup.');
                return;
            }

            console.log('Setting up audio track with device ID:', audioDeviceId);
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: audioDeviceId } });
            const audioTrack = new LocalAudioTrack(audioStream.getAudioTracks()[0]);
            await room.localParticipant.publishTrack(audioTrack);

            setLocalAudioTrack(audioTrack);
            console.log('Audio track published:', audioTrack);
        };

        setupAudio();
    }, [audioDeviceId, room]);
    const handleCameraChange = async (deviceId: string | null) => {
        setCameraDeviceId(deviceId);
        if (!deviceId || !room) return;
    
        // Stop and remove the current video track if exists
        if (localVideoTrack) {
            await room.localParticipant.unpublishTrack(localVideoTrack);
            localVideoTrack.stop();
        }
    
    
        // Create and publish a new video track
        try {
            const videoStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId } });
            const videoTrack = new LocalVideoTrack(videoStream.getVideoTracks()[0]);
            await room.localParticipant.publishTrack(videoTrack);
            setLocalVideoTrack(videoTrack);
        } catch (error) {
            console.error("Error setting up new camera track:", error);
        }
    };

    const handleAudioChange = async (deviceId: string | null) => {
        setAudioDeviceId(deviceId);
        if (!deviceId || !room) return;
    
        // Stop and remove the current audio track if exists
        if (localAudioTrack) {
            await room.localParticipant.unpublishTrack(localAudioTrack);
            localAudioTrack.stop();
        }
    
        // Create and publish a new audio track
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId } });
            const audioTrack = new LocalAudioTrack(audioStream.getAudioTracks()[0]);
            await room.localParticipant.publishTrack(audioTrack);
            setLocalAudioTrack(audioTrack);
        } catch (error) {
            console.error("Error setting up new audio track:", error);
        }
    };
    useEffect(() => {
        const fetchUserName = async () => {
            // 예시로 사용자가 로그인된 이름을 가져오는 API 호출
            // 실제로는 백엔드에서 사용자 정보를 가져오는 API를 호출해야 함
            const userName = await getLoggedInUserName(); // 이 함수는 실제로 사용자 정보를 가져오는 함수로 대체해야 합니다.
            console.log(position)
            setParticipantName(position);
        };

        fetchUserName();
    }, [position]);
    console.log(position)
    // 더미 함수: 실제 사용자 정보를 가져오는 로직으로 대체하세요
    const getLoggedInUserName = async () => {
        return '홍길동'; // 예시: 로그인된 사용자 이름
    };
    const handleVideoDoubleClick = (videoId: string) => {
        console.log(`Video double-clicked: ${videoId}`);
        if (maximizedVideo === videoId) {
            setMaximizedVideo(null);
            setIsChatVisible(true);
        } else {
            setMaximizedVideo(videoId);
            setIsChatVisible(false);
        }
    };
    async function joinRoom() {
        const room = new Room();
        setRoom(room);
        console.log('Room instance created and state updated.');

        room.on(RoomEvent.TrackSubscribed, (_track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
            console.log('TrackSubscribed event:', { _track, publication, participant });
            setRemoteTracks((prev) => [
                ...prev,
                { trackPublication: publication, participantIdentity: participant.identity }
            ]);
        });

        room.on(RoomEvent.TrackUnsubscribed, (_track: RemoteTrack, publication: RemoteTrackPublication) => {
            console.log('TrackUnsubscribed event:', { _track, publication });
            setRemoteTracks((prev) => prev.filter((track) => track.trackPublication.trackSid !== publication.trackSid));
        });

        try {
            const token = await getToken(roomName, participantName);
            console.log('Received token:', token);

            await room.connect(LIVEKIT_URL, token);
            console.log('Connected to LiveKit room.');

            await room.localParticipant.enableCameraAndMicrophone();
            console.log('Camera and microphone enabled.');

            const localVideoTrack = room.localParticipant.videoTrackPublications.values().next().value.videoTrack;
            console.log('Local video track:', localVideoTrack);

            setLocalVideoTrack(localVideoTrack);

        } catch (error) {
            console.error("Error connecting to the room:", (error as Error).message);
            await leaveRoom();
        }
    }

    async function leaveRoom() {
        console.log('Leaving room...');
        await room?.disconnect();
        setRoom(undefined);
        setLocalVideoTrack(undefined);
        setLocalAudioTrack(undefined);
        setRemoteTracks([]);
        console.log('Room disconnected and state reset.');
    }

    async function getToken(roomName: string, participantName: string) {
        console.log('Requesting token for room:', roomName, 'and participant:', participantName);

        const response = await fetch(APPLICATION_SERVER_URL + "tarotbom/openvidu/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roomName: roomName,
                participantName: participantName
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Failed to get token, server response:', error);
            throw new Error(`Failed to get token: ${error.errorMessage}`);
        }

        const data = await response.json();
        console.log('Token received:', data.token);
        return data.token;
    }
    async function handleSendChatMessage(message: string) {
        if (room?.localParticipant.publishData) {
            const chatMessage = JSON.stringify({
                type: 'text',
                content: message,
                //timestamp: new Date()
            });
            console.log(message)
            const uint8ArrayData = new TextEncoder().encode(chatMessage);
            try {
                await room.localParticipant.publishData(uint8ArrayData);
                console.log('Chat message successfully sent.');
            } catch (error) {
                console.error('Error sending chat message:', error);
            }
        } else {
            console.error('Room or publishData function is undefined.');
        }
    }
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
    // 다른 상태 및 로직들...

    const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };
  const contentRef = useRef(null);
  async function handleScreenshot() {
    console.log(contentRef.current)
    
    if (contentRef.current) {
    try {
         // 페이지의 스크롤을 내리며 캡처할 필요가 있을 수 있음
         const body = document.body;
         const html = document.documentElement;
         const height = Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        );
        window.scrollTo(0, 0);
        const canvas = await html2canvas(contentRef.current, {
            height: height,
            useCORS: true, // CORS 설정 (필요시 추가)
        });
        const imageData = canvas.toDataURL('image/png');

        // 서버로 전송
        // const response = await fetch('/api/upload', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ image: imageData }),
        // });
        
        const link = document.createElement('a');
            link.href = imageData;
            link.download = 'screenshot.png';
            link.click(); // 자동으로 다운로드를 시작합니다
        if (imageData) {
            console.log(imageData)
            setTaroimageData(imageData)
            setIsModalVisible(true);
          console.log('Screenshot uploaded successfully');
        } else {
          console.error('Failed to upload screenshot');
        }
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    }
  };

const closeModal = () => {
    setIsModalVisible(false);
};
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
            handleVideoDoubleClick('local')// 더블클릭
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
            setMaximizedVideo(null);
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
// 색깔을 변경하는 함수
const changeColor = () => {
    setShowColorPicker(prev => !prev); // 색깔 선택 메뉴 토글
};

// 색깔을 설정하는 함수
const handleColorChange = (selectedColor: string) => {
    setColor(selectedColor);
    setShowColorPicker(false); // 색깔 선택 후 메뉴 숨기기
};

    return (
        <>
           
           <div ref={contentRef}>
                <img
                        className="absolute inset-0 w-full h-full object-cover  z-0"
                        src={MainBg}
                        alt="Main Background"
                    />
            
                <div className="flex flex-col justify-center items-center h-full relative" id="room">
                    
                    {isCanvasVisible && (
                <div className="fixed inset-0 bg-white bg-opacity-25 flex items-center justify-center z-50 overflow-visible">
                                        <DrawingCanvasComponent color={color} onUpdate={handleDrawingUpdate} ref={canvasRef} />
                                    </div> )}
                    <div className="flex flex-col h-full w-full relative overflow-visible">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
                        {isModalVisible && <ScreenShootImageUpload isVisible={isModalVisible} imageData={taroimageData} onClose={closeModal} candidateId={candidateId}/>
                        //<CardModal isVisible={isModalVisible} card={card[0]} onClose={closeModal} />
                        }
                        </div>
                        <div className='flex flex-grow h-full overflow-visible'>
                            <div className="flex-1 relative">
                                <div id="layout-container" className="absolute inset-0 w-full h-full flex flex-col items-center justify-between">
                                    {localVideoTrack && (
                                        <div className="absolute">
                                        <ResizeComponent
                                        videoId="local"
                                        isMaximized={maximizedVideo === 'local'}
                                        isMinimized={maximizedVideo !== null && maximizedVideo !== 'local'}
                                        onDoubleClick={() => handleVideoDoubleClick('local')}
                                        onToggleMute={handleToggleMute}
                                        onToggleVideo={handleToggleVideo}
                                        isMuted={isMuted}
                                        isVideoOff={isVideoOff}
                                    >
                                        {!isVideoOff && ( 
                                        <VideoComponent track={localVideoTrack} participantIdentity={participantName} local={true} />
                                    )}
                                        </ResizeComponent>
                                        </div>
                                    )}
                                    <div className="flex-grow flex items-center justify-center mb-4">
                                        {remoteTracks.map((remoteTrack,index) =>
                                        remoteTrack.trackPublication.kind === "video" ? (
                                            <div key={remoteTrack.trackPublication.trackSid} className="absolute" > {/* 비디오 위치 조정 주석 추가 */}
                                            
                                            <ResizeComponent
                                                    key={remoteTrack.trackPublication.trackSid}
                                                    videoId={remoteTrack.trackPublication.trackSid}
                                                    isMaximized={maximizedVideo === remoteTrack.trackPublication.trackSid}
                                                    isMinimized={maximizedVideo !== null && maximizedVideo !== remoteTrack.trackPublication.trackSid}
                                                    onDoubleClick={() => handleVideoDoubleClick(remoteTrack.trackPublication.trackSid)}
                                                    onToggleMute={handleToggleMute}
                                                    onToggleVideo={handleToggleVideo}
                                                    isMuted={isMuted}
                                                    isVideoOff={isVideoOff}
                                                >
                                            {!isVideoOff && (        
                                            <VideoComponent
                                                key={remoteTrack.trackPublication.trackSid}
                                                track={remoteTrack.trackPublication.videoTrack!}
                                                participantIdentity={remoteTrack.participantIdentity}
                                            />)}
                                            </ResizeComponent>

                                            </div>
                                        ) : (
                                            !isMuted&& (
                                            <AudioComponent
                                                key={remoteTrack.trackPublication.trackSid}
                                                track={remoteTrack.trackPublication.audioTrack!}
                                            />)
                                        )
                                    )}
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <div >
                            {isChatVisible && (
                            <ChatAndControls
                                roomId={roomName} // 또는 적절한 roomId 값
                                participantName={participantName}
                                room={room}
                                handleSendChatMessage={handleSendChatMessage}
                                onCameraChange={handleCameraChange}
                                onAudioChange={handleAudioChange}
                                candidateId={candidateId}
                            />)}
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full max-w-4xl px-5 mb-5 z-50">
                    <div>

                    </div>
                    
                    {/* <div className="fixed bottom-4 left-4 bg-white border border-gray-300 rounded-lg p-4 shadow-md flex space-x-4 z-50"> */}
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
                        {/* <ScenarioPanel onScenarioChange={handleScenarioChange} onOpenProfile={OpenProfile} /> */}
                        {/* 진행 상황을 알려주는 변화하는 버튼 */}
                        {/* 누르면 그다음 시나리오로 넘어가는 시나리오 통제 */}
                        {/* 필요 시니라오 : 입장인사 -> 카드 선택 시간 -> 결과 확인 */}
                    {/* </div> */}
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

                    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-md flex space-x-4 z-50">
                        {/* <p>선택 완료 : 시커</p> */}
                        <button
                    className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                    onClick={changeColor}
                >
                    <img src={ColorChange} alt="" className="w-8 h-8" />
                </button>
                {showColorPicker && (
                    <div className="absolute bottom-14 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex flex-wrap space-x-2 space-y-2 z-50">
                        {/* 색깔 버튼들 */}
                        {['black', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'].map(colorOption => (
                            <button
                                key={colorOption}
                                onClick={() => handleColorChange(colorOption)}
                                style={{ backgroundColor: colorOption }}
                                className="w-8 h-8 rounded-full border border-gray-300"
                            />
                        ))}
                    </div>
                )}
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
                            onClick={handleScreenshot}  // 여기서 handleScreenshot 핸들러 호출
                        >
                            <img src={SelectIcon} alt="" className="w-8 h-8" />
                        </button>
                        <button
                            className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                            onClick={leaveRoom}
                        >
                            <img src={LeaveOfIcon} alt="" className="w-8 h-8" />
                        </button>{/* 토글 버튼 */}
                        
                        {/* <button
                            className="preview-button"
                            onClick={() => handlePreviewCard()}
                        >
                            선택결과
                        </button> */}
                    </div>
                        
                    </div>
                </div>
                </div>
        </>
    );
}

export default AppWebRTC;
