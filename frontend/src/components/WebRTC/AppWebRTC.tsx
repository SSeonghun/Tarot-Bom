import React, { useState, useEffect, useRef } from 'react';
import { Room, RoomEvent, LocalVideoTrack, RemoteTrack, RemoteTrackPublication, RemoteParticipant } from 'livekit-client';
import VideoComponent from './VideoComponent';
import AudioComponent from './AudioComponent';
import TaroSelect from './TaroSelect';
import cardImg from '../../assets/tarot_images - 복사본/c01.jpg';
import ChatAndControls from './Controller/ChatAndControls';
import MainBg from '../../assets/mainBg.png';
import DrawingCanvasComponent, { DrawingCanvasHandle } from './Tools/DrawingCanvasComponent';

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
            APPLICATION_SERVER_URL = "https://localhost/";
        } else {
            APPLICATION_SERVER_URL = "https://" + window.location.hostname + "/";
        }
    }

    if (!LIVEKIT_URL) {
        if (window.location.hostname === "localhost") {
            LIVEKIT_URL = "ws://localhost/";
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
    const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(undefined);
    const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);
    // const [drawingData, setDrawingData] = useState<any>(null);
    const [participantName, setParticipantName] = useState("Participant" + Math.floor(Math.random() * 100));
    const [roomName, setRoomName] = useState("Test Room");

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
                    console.log('Parsed JSON data:', jsonData);

                    // 그림을 캔버스에 로드
                    console.log('Attempting to load drawing to canvas:', canvasRef.current);
                    await canvasRef.current?.loadDrawing(jsonData);
                    console.log('Drawing loaded successfully to canvas.');
                } catch (error) {
                    console.error('Error parsing JSON data:', error);
                }
            });
        } else {
            console.log('Room is undefined, no event listeners attached.');
        }
    }, [room]);

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

            setLocalTrack(localVideoTrack);
        } catch (error) {
            console.error("Error connecting to the room:", (error as Error).message);
            await leaveRoom();
        }
    }

    async function leaveRoom() {
        console.log('Leaving room...');
        await room?.disconnect();
        setRoom(undefined);
        setLocalTrack(undefined);
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

    async function handleDrawingUpdate(data: any) {
        // Combine the last drawing data with the new update
        // const combinedData = { ...lastDrawingData, ...data };
        
        
    
        if (room?.localParticipant.publishData) {
            const dataToSend = JSON.stringify(data);
        const uint8ArrayData = new TextEncoder().encode(dataToSend);
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
                                <input
                                    id="participant-name"
                                    className="w-full p-2 mb-4 border border-teal-600 rounded focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                                    type="text"
                                    value={participantName}
                                    onChange={(e) => setParticipantName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="room-name" className="block mb-2 text-teal-600 font-bold text-lg">상담실 번호</label>
                                <input
                                    id="room-name"
                                    className="w-full p-2 mb-4 border border-teal-600 rounded focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                                    type="text"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    required
                                />
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
            ) : (
                <div className="flex flex-col justify-center items-center h-full" id="room">
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
                        <div className='flex h-screen'>
                            <div className="flex-1">
                                <div id="layout-container" className="grid grid-cols-auto-fit gap-4 w-full max-w-4xl h-full">
                                    {localTrack && (
                                        <VideoComponent track={localTrack} participantIdentity={participantName} local={true} />
                                    )}
                                    {remoteTracks.map((remoteTrack) =>
                                        remoteTrack.trackPublication.kind === "video" ? (
                                            <VideoComponent
                                                key={remoteTrack.trackPublication.trackSid}
                                                track={remoteTrack.trackPublication.videoTrack!}
                                                participantIdentity={remoteTrack.participantIdentity}
                                            />
                                        ) : (
                                            <AudioComponent
                                                key={remoteTrack.trackPublication.trackSid}
                                                track={remoteTrack.trackPublication.audioTrack!}
                                            />
                                        )
                                    )}
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <DrawingCanvasComponent onUpdate={handleDrawingUpdate} ref={canvasRef} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3">
                                <ChatAndControls />
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full max-w-4xl px-5 mb-5">
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
                    </div>
                </div>
            )}
        </>
    );
}

export default AppWebRTC;
