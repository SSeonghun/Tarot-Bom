import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import "./VideoComponent.css";
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
        
        <div id={"camera-" + participantIdentity} className="relative bg-gray-800 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <div className="absolute top-0 left-0 p-1 bg-gray-100 text-gray-600 font-bold rounded-br-lg">
            <p>{participantIdentity + (local ? " (You)" : "")}</p>
        </div>
        <video ref={videoElement} id={track.sid}></video>
    </div>
        
    );
}
{/* <Link to="/webrtc" className="text-black hover:text-gray-400">화상 타로 입장</Link> */}
export default VideoComponent;
