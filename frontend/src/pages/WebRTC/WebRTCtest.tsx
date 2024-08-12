// src/pages/WebRTC/WebRTCpage.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  LocalVideoTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
} from "livekit-client";
import MainBg from '../../assets/mainBg.png'
import Graphic from "../PlayTarot/Graphic";
import html2canvas from 'html2canvas';
// Define types
type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

interface RTCTest {
  token: string; // 토큰
  name: string; // 닉네임
  type: string; // 룸 타입
}

// WebRTCpage component
const WebRTCpage: React.FC<RTCTest> = ({ token, name, type }) => {
  console.log(token, name, type);

  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(
    undefined
  );
  const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);
  const [participantName, setParticipantName] = useState<string | undefined>(
    name
  );
  const [roomName, setRoomName] = useState<string | undefined>(token);
  const [isHost, setIsHost] = useState<boolean>(false);
  
  const APPLICATION_SERVER_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:6080/"
      : "https://" + window.location.hostname + ":6443/";

  const LIVEKIT_URL =
    window.location.hostname === "localhost"
      ? "ws://localhost:7880/"
      : "wss://" + window.location.hostname + ":7443/";

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteAudioRefs = useRef<{
    [trackSid: string]: HTMLAudioElement | null;
  }>({});
  const graphicRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isSeeker = participantName === '시커'; // Check if the participant is '시커'

  async function joinRoom() {
    console.log("Joining room...");
    const room = new Room();
    setRoom(room);
    let firstParticipantJoined = false;
    room.on(
      RoomEvent.TrackSubscribed,
      (
        _track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant
      ) => {
        console.log("TrackSubscribed:", publication.trackSid, participant.identity);
        setRemoteTracks((prev) => [
          ...prev,
          {
            trackPublication: publication,
            participantIdentity: participant.identity,
          },
        ]);
      }
    );

    room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      console.log("ParticipantConnected:", participant.identity);
      if (!firstParticipantJoined) {
        firstParticipantJoined = true;
        setIsHost(false); // Since another participant has joined, current participant is not the host
      }
    });

    room.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
      console.log("ParticipantConnected:", participant.identity);
      if (participant.identity === participantName) {
        setIsHost(true); // If the current participant leaves and they were the first, they are the host
      }
    });
    room.on(
      RoomEvent.TrackUnsubscribed,
      (_track: RemoteTrack, publication: RemoteTrackPublication) => {
        console.log("TrackUnsubscribed:", publication.trackSid);
        setRemoteTracks((prev) =>
          prev.filter(
            (track) => track.trackPublication.trackSid !== publication.trackSid
          )
        );
      }
    );

    try {
      const token = await getToken(roomName as string, participantName as string);
      console.log('Fetched token:', token);
      console.log('Connecting to room with token:', token);
      await room.connect(LIVEKIT_URL, token);
      await room.localParticipant.setMicrophoneEnabled(true); // 마이크만 활성화
      // Set local participant as host if no other participants are in the room
      if (!firstParticipantJoined) {
        console.log('Setting local participant as host');
        setIsHost(true); // If this is the first participant, they are the host
      }
      if (!canvasRef.current) {
        console.error("Canvas reference is not defined.");
        return;
      }
      const stream = canvasRef.current?.captureStream(30); // 30fps로 canvas 캡처
      if (!stream) {
        console.error("Failed to capture stream from canvas.");
        return;
      }
      console.log("Captured stream:", stream);
      const audioTrack = room.localParticipant.audioTrackPublications
      .values()
      .next().value?.audioTrack;
      if (stream) {
        const [videoTrack] = stream.getVideoTracks();
        const localVideoTrack = new LocalVideoTrack(videoTrack);
        setLocalTrack(localVideoTrack);
        await room.localParticipant.publishTrack(localVideoTrack);
        console.log("Published local video track");
      }
      if (audioTrack) {
        setLocalTrack(audioTrack);
        console.log("Published local audio track");
      }
    } catch (error) {
      console.log("Error connecting to the room:", (error as Error).message);
      await leaveRoom();
    }
  }

  async function leaveRoom() {
    console.log('Leaving room...');
    await room?.disconnect();
    setRoom(undefined);
    setLocalTrack(undefined);
    setRemoteTracks([]);
  }

  async function getToken(roomName: string, participantName: string) {
    console.log("Fetching token for room:", roomName, "participant:", participantName);
    const response = await fetch(APPLICATION_SERVER_URL + "token", {
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
      console.error(`Failed to get token: ${error.errorMessage}`);
      throw new Error(`Failed to get token: ${error.errorMessage}`);
    }

    const data = await response.json();
    console.log("Received token:", data.token);
    return data.token;
  }
  useEffect(() => {
    // Get token and name from URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const name = queryParams.get("name");

    if (token && name) {
      setRoomName(token); // assuming token is used as room name
      setParticipantName(name);
    }
  }, []);

  useEffect(() => {
    if (localTrack && localVideoRef.current) {
      console.log('Attaching local track to video element');
      localTrack.attach(localVideoRef.current);
    }

    return () => {
      if (localTrack) {
        console.log('Detaching local track from video element');
        localTrack.detach();
      }
    };
  }, [localTrack]);
  useEffect(() => {
    const updateCanvas = async () => {
      if (canvasRef.current) {
        console.log('Updating canvas...');
        const context = canvasRef.current.getContext('2d');
        if (context) {
          console.log('Capturing graphic...');
          const canvas = await html2canvas(graphicRef.current!);
          context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          context.drawImage(canvas, 0, 0, canvasRef.current.width, canvasRef.current.height);
          console.log('Canvas updated');
        }
      }
      requestAnimationFrame(updateCanvas);
    };

    updateCanvas();
  }, []);
  useEffect(() => {
    remoteTracks.forEach((trackInfo) => {
      if (
        trackInfo.trackPublication.kind === "audio" &&
        remoteAudioRefs.current[trackInfo.trackPublication.trackSid]
      ) {
        console.log('Attaching remote audio track:', trackInfo.trackPublication.trackSid);
        trackInfo.trackPublication.videoTrack?.attach(
          remoteAudioRefs.current[trackInfo.trackPublication.trackSid]!
        );
      }
    });

    return () => {
      remoteTracks.forEach((trackInfo) => {
        if (trackInfo.trackPublication.kind === "audio") {
          console.log('Detaching remote audio track:', trackInfo.trackPublication.trackSid);
          trackInfo.trackPublication.videoTrack?.detach();
        }
      });
    };
  }, [remoteTracks]);

  return (
    <div>
      {!room ? (
        <div id="join" className="relative h-screen overflow-hidden">
          <img
              className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
              src={MainBg}
              alt="Main Background"
          />
          <div id="join-dialog " className="absolute bottom-10 left-10 z-10">
          <h2 className="text-white">Join an Audio Room</h2>
            <form
              onSubmit={(e) => {
                joinRoom();
                e.preventDefault();
              }}
            >
              <div>
                <label htmlFor="participant-name">Participant</label>
                <input
                  id="participant-name"
                  className="form-control"
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="room-name">Room</label>
                <input
                  id="room-name"
                  className="form-control"
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                />
              </div>
              <button
                className="btn btn-lg btn-success"
                type="submit"
                //disabled={!roomName || !participantName}
              >
                Join!
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div id="room">
          <div id="room-header">
            <h2 id="room-title">{roomName}</h2>
            <button
              className="btn btn-danger"
              id="leave-room-button"
              onClick={leaveRoom}
            >
              Leave Room
            </button>
          </div>
          <div id="layout-container">
          {isSeeker && (
              <div ref={graphicRef} style={{ width: '640px', height: '480px' }}>
                <p>1</p>
                <Graphic />
              </div>
            )}{
              !isSeeker&&( 
                <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
              )
            }
            
            {localTrack && (
              <audio ref={localVideoRef} autoPlay={true} />
              
            )}
            {remoteTracks.map((remoteTrack) =>
              remoteTrack.trackPublication.kind === "audio" ? (
                <div
                  className="audio-container"
                  key={remoteTrack.trackPublication.trackSid}
                >
                  <audio
                    ref={(el) =>
                      (remoteAudioRefs.current[
                        remoteTrack.trackPublication.trackSid
                      ] = el)
                    }
                    autoPlay={true}
                  />
                  <div className="participant-name">
                    {remoteTrack.participantIdentity}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebRTCpage;
