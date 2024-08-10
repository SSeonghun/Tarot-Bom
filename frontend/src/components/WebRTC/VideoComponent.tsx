import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import { useEffect, useRef } from "react";

interface VideoComponentProps {
    track: LocalVideoTrack | RemoteVideoTrack;
    participantIdentity: string;
    local?: boolean;
}

function VideoComponent({ track, participantIdentity, local = false }: VideoComponentProps) {
    const videoElement = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoElement.current) {
            track.attach(videoElement.current);
        }

        return () => {
            track.detach();
        };
    }, [track]);

    return (
        
        <div id={"camera-" + participantIdentity} className="relative w-full h-full bg-gray-800 rounded-lg overflow-hidden">
        <video ref={videoElement} id={track.sid} className="w-full h-full object-fill" autoPlay playsInline></video>
        <div className="absolute top-0 left-0 p-1 bg-gray-100 text-gray-600 font-bold rounded-br-lg">
            <p>{participantIdentity + (local ? " (You)" : "")}</p>
        </div>
        
    </div>
        
    );
}
{/* <Link to="/webrtc" className="text-black hover:text-gray-400">화상 타로 입장</Link> */}
export default VideoComponent;
