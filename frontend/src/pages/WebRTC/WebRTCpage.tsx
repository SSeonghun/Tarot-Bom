import React from "react";
import AppWebRTC from "../../components/WebRTC/AppWebRTC";
import { useLocation } from "react-router-dom";

interface RTCTest {
  // token: string; // 토큰
  // name: string; // 닉네임
  // type: string; // 룸 타입
  // position:string;
}
const WebRTCpage: React.FC<RTCTest> = ({}) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const { readerType, payload } = location.state || {};

  //TODO: paylode 받기
  console.log(payload);

  const token = query.get("token") || "";
  const name = query.get("name") || "";
  const type = query.get("type") || "";
  const position = query.get("position") || "";
  console.log(token, name, type, position);
  return (
    <div>
      <div>
        <AppWebRTC token={token} name={name} type={type} position={position} />
      </div>
    </div>
  );
};

export default WebRTCpage;
