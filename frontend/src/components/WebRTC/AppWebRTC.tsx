import React, { useState, useEffect, useRef } from 'react';
import { Room, RoomEvent, LocalVideoTrack, LocalAudioTrack,RemoteTrack, RemoteTrackPublication, RemoteParticipant } from 'livekit-client';
import VideoComponent from './VideoComponent';
import AudioComponent from './AudioComponent';
import TaroSelect from './TaroSelect';
import cardImg from '../../assets/tarot_images - 복사본/c01.jpg';
import ChatAndControls from './Controller/ChatAndControls';
import MainBg from '../../assets/mainBg.png';
import DrawingCanvasComponent, { DrawingCanvasHandle } from './Tools/DrawingCanvasComponent';
import ResizeComponent from './Controller/ResizeComponent';

type TrackInfo = {
    trackPublication: RemoteTrackPublication;
    participantIdentity: string;
};

let APPLICATION_SERVER_URL = "";
let LIVEKIT_URL = "";
configureUrls();

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

const cards = Array.from({ length: 3 }, (_, index) => ({
    id: index,
    name: `ACE & CUPS`,
    detail: `야호 야호 야호 야호 야호 야호 야호 야호 야호 야호 야호 `,
    category: ['금전운'],
    imgUrl: cardImg,
    hsize: 'h-1',
    wsize: 'w-40'
}));

function AppWebRTC() {
    const [room, setRoom] = useState<Room | undefined>(undefined);
    const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack | undefined>(undefined);
    const [localAudioTrack, setLocalAudioTrack] = useState<LocalAudioTrack | undefined>(undefined);
    const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);
    // const [drawingData, setDrawingData] = useState<any>(null);
    const [participantName, setParticipantName] = useState("Participant" + Math.floor(Math.random() * 100));
    const [roomName, setRoomName] = useState("Test Room");
    const [cameraDeviceId, setCameraDeviceId] = useState<string | null>(null);
    const [audioDeviceId, setAudioDeviceId] = useState<string | null>(null);
    const [maximizedVideo, setMaximizedVideo] = useState<string | null>(null);
    const [isChatVisible, setIsChatVisible] = useState<boolean>(true);
    const [isCanvasVisible, setIsCanvasVisible] = useState<boolean>(false); // 캔버스 표시 상태 관리

    const [isMuted, setIsMuted] = useState(false); // 음소거 상태 관리
    const [isVideoOff, setIsVideoOff] = useState(false); // 비디오 끄기 상태 관리
    const canvasRef = useRef<DrawingCanvasHandle | null>(null);

    useEffect(() => {
        if (room) {
            console.log('Room is set. Listening for data events...');
            
            room.on(RoomEvent.DataReceived, async (data: Uint8Array) => {
                console.log('Data received:', data);

                const jsonString = new TextDecoder().decode(data);
                console.log('JSON string:', jsonString);

                try {
                    const jsonData = JSON.parse(jsonString);
                    if (jsonData.type === 'text') {
                        // Handle chat message
                        console.log('Received chat message:', jsonData);
                    } else if (jsonData.type === 'drawing') {
                        // Handle drawing data
                        await canvasRef.current?.loadDrawing(jsonData.content);
                        console.log('Drawing loaded successfully to canvas.');
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
            setParticipantName(userName);
        };

        fetchUserName();
    }, []);
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
    async function handleDrawingUpdate(data: any) {
        // Combine the last drawing data with the new update
        // const combinedData = { ...lastDrawingData, ...data };
        if (room?.localParticipant.publishData) {
            const dataToSend = JSON.stringify(data);
            const uint8ArrayData = new TextEncoder().encode(dataToSend);
            console.log('Sending drawing update:', data);
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
    return (
        <>
            {!room ? (
                <div className="relative h-screen overflow-hidden" id="join">
                    <img
                        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
                        src={MainBg}
                        alt="Main Background"
                    />
                    <div className="relative flex flex-col justify-center items-center h-full z-10" id="join-dialog">
                        <h2 className="text-gray-600 text-5xl font-bold text-center">온라인 타로 상담실</h2>
                        <form
                            onSubmit={(e) => {
                                joinRoom();
                                e.preventDefault();
                            }}
                        >
                            <div className="mb-4">
                                <label htmlFor="participant-name" className="block mb-2 text-teal-600 font-bold text-lg">참가자</label>
                                {/* <input
                                    id="participant-name"
                                    className="w-full p-2 mb-4 border border-teal-600 rounded focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                                    type="text"
                                    value={participantName}
                                    onChange={(e) => setParticipantName(e.target.value)}
                                    required
                                    readOnly // 사용자가 직접 입력하지 못하게 하려면 readOnly 속성을 추가합니다.
                                /> */}<p>{participantName}</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="room-name" className="block mb-2 text-teal-600 font-bold text-lg">상담실 번호</label>
                                {/* <input
                                    id="room-name"
                                    className="w-full p-2 mb-4 border border-teal-600 rounded focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                                    type="text"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    required
                                /> */}
                                <p>{roomName}</p>
                            </div>
                            <button
                                className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-200 hover:bg-teal-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                type="submit"
                                disabled={!roomName || !participantName}
                            >
                                입장
                            </button>
                        </form>
                    </div>
                </div>
            ) : (<div>
                <img
                        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
                        src={MainBg}
                        alt="Main Background"
                    />
            
                <div className="flex flex-col justify-center items-center h-full relative" id="room">
                    
                    {isCanvasVisible && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                                        <DrawingCanvasComponent onUpdate={handleDrawingUpdate} ref={canvasRef} />
                                    </div> )}
                    <div className="flex flex-col h-full w-full relative">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
                            {cards.map(card => (
                                <TaroSelect
                                    key={card.id}
                                    name={card.name}
                                    detail={card.detail}
                                    category={card.category}
                                    imgUrl={card.imgUrl}
                                    hsize={card.hsize}
                                    wsize={card.wsize}
                                />
                            ))}
                        </div>
                        <div className='flex flex-grow h-full'>
                            <div className="flex-1 relative">
                                <div id="layout-container" className="absolute inset-0 w-full h-full flex items-center justify-center">
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
                                    {remoteTracks.map((remoteTrack,index) =>
                                        remoteTrack.trackPublication.kind === "video" ? (
                                            <div key={remoteTrack.trackPublication.trackSid} className="absolute" style={{ transform: `translate(${index * 150}px, ${index * 150}px)` }}> {/* 비디오 위치 조정 주석 추가 */}
                                            
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
                            <div className="w-1/3">
                            {isChatVisible && (
                            <ChatAndControls
                                roomId={roomName} // 또는 적절한 roomId 값
                                participantName={participantName}
                                room={room}
                                handleSendChatMessage={handleSendChatMessage}
                                onCameraChange={handleCameraChange}
                                onAudioChange={handleAudioChange}
                            />)}
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full max-w-4xl px-5 mb-5 z-50">
                        <button
                            className="absolute top-0 right-0 mt-4 mr-4 font-bold text-white bg-red-500 border border-red-500 rounded hover:bg-red-600 px-4 py-2"
                            onClick={leaveRoom}>
                            나가기
                        </button>
                        <button
                            className="absolute top-0 right-0 mt-4 mr-16 font-bold text-white bg-blue-500 border border-blue-500 rounded hover:bg-blue-600 px-4 py-2"
                            onClick={clearCanvas}>
                            캔버스 지우기
                        </button>
                        <button
                            className="absolute top-0 right-0 mt-4 mr-28 font-bold text-white bg-green-500 border border-green-500 rounded hover:bg-green-600 px-4 py-2"
                            onClick={saveDrawing}>
                            그림 저장
                        </button>
                        {/* 토글 버튼 */}
                        <button 
                            className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded" 
                            onClick={() => setIsCanvasVisible(!isCanvasVisible)}
                        >
                            {isCanvasVisible ? 'Hide Canvas' : 'Show Canvas'}
                        </button>
                    </div>
                </div>
                </div> )}
        </>
    );
}

export default AppWebRTC;
