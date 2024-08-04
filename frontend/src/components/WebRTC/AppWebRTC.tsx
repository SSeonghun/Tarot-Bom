import {
    LocalVideoTrack,
    RemoteParticipant,
    RemoteTrack,
    RemoteTrackPublication,
    Room,
    RoomEvent
} from "livekit-client";
import { useState } from "react";
import VideoComponent from "./VideoComponent"; 
import AudioComponent from "./AudioComponent"; 
import TaroSelect from "./TaroSelect";
import cardImg from '../../assets/tarot_images - 복사본/c01.jpg'
import ChatAndControls from "./Controller/ChatAndControls"; 
import MainBg from '../../assets/mainBg.png';
type TrackInfo = {
    trackPublication: RemoteTrackPublication;
    participantIdentity: string;
};

// For local development, leave these variables empty
// For production, configure them with correct URLs depending on your deployment
let APPLICATION_SERVER_URL = "";
let LIVEKIT_URL = "";
configureUrls();

function configureUrls() {
    // If APPLICATION_SERVER_URL is not configured, use default value from local development
    if (!APPLICATION_SERVER_URL) {
        if (window.location.hostname === "localhost") {
            APPLICATION_SERVER_URL = "http://localhost:6080/";
        } else {
            APPLICATION_SERVER_URL = "https://" + window.location.hostname + ":6443/";
        }
    }

    // If LIVEKIT_URL is not configured, use default value from local development
    if (!LIVEKIT_URL) {
        if (window.location.hostname === "localhost") {
            LIVEKIT_URL = "ws://localhost:7880/";
        } else {
            LIVEKIT_URL = "wss://" + window.location.hostname + ":7443/";
        }
    }
}
const cards = Array.from({ length: 3 }, (_, index) => ({
    id: index,
    name: `ACE & CUPS`,
    detail: `야호 야호 야호 야호 야호 야호 야호 야호 야호 야호 야호 `,
    category: ['금전운'], // 더미 카테고리
    imgUrl: cardImg, 
    hsize: 'h-1',
    wsize: 'w-40'
  }));
function AppWebRTC() {
    const [room, setRoom] = useState<Room | undefined>(undefined);
    const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(undefined);
    const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);

    const [participantName, setParticipantName] = useState("Participant" + Math.floor(Math.random() * 100));
    const [roomName, setRoomName] = useState("Test Room");

    async function joinRoom() {
        // Initialize a new Room object
        const room = new Room();
        setRoom(room);

        // Specify the actions when events take place in the room
        // On every new Track received...
        room.on(
            RoomEvent.TrackSubscribed,
            (_track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
                setRemoteTracks((prev) => [
                    ...prev,
                    { trackPublication: publication, participantIdentity: participant.identity }
                ]);
            }
        );

        // On every Track destroyed...
        room.on(RoomEvent.TrackUnsubscribed, (_track: RemoteTrack, publication: RemoteTrackPublication) => {
            setRemoteTracks((prev) => prev.filter((track) => track.trackPublication.trackSid !== publication.trackSid));
        });

        try {
            // Get a token from your application server with the room name and participant name
            const token = await getToken(roomName, participantName);

            // Connect to the room with the LiveKit URL and the token
            await room.connect(LIVEKIT_URL, token);

            // Publish your camera and microphone
            await room.localParticipant.enableCameraAndMicrophone();
            setLocalTrack(room.localParticipant.videoTrackPublications.values().next().value.videoTrack);
        } catch (error) {
            console.log("There was an error connecting to the room:", (error as Error).message);
            await leaveRoom();
        }
    }

    async function leaveRoom() {
        // Leave the room by calling 'disconnect' method over the Room object
        await room?.disconnect();

        // Reset the state
        setRoom(undefined);
        setLocalTrack(undefined);
        setRemoteTracks([]);
    }

    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The method below request the creation of a token to
     * your application server. This prevents the need to expose
     * your LiveKit API key and secret to the client side.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints. In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     */
    async function getToken(roomName: string, participantName: string) {
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
            throw new Error(`Failed to get token: ${error.errorMessage}`);
        }

        const data = await response.json();
        return data.token;
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
                <div className="flex flex-col justify-center items-center h-full"
                id="room">
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
                    </div>
                </div>
                <div className="w-1/3">
                    <ChatAndControls/>
                </div>
            </div>
        </div>
                    
                    <div className="relative w-full max-w-4xl px-5 mb-5">
                        <button 
                            className="absolute top-0 right-0 mt-4 mr-4 font-bold text-white bg-red-500 border border-red-500 rounded hover:bg-red-600 px-4 py-2"
                            onClick={leaveRoom}>
                            나가기
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AppWebRTC;
