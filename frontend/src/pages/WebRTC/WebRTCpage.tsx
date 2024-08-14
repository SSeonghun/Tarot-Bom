import React from 'react'
import AppWebRTC from '../../components/WebRTC/AppWebRTC'

interface RTCTest {
  token: string; // 토큰
  name: string; // 닉네임
  type: string; // 룸 타입
  position:string;
}
const WebRTCpage:React.FC<RTCTest>= ({ token, name, type, position })=> {
  console.log(token, name, type, position)
  return (
    <div>
      <div >
      <AppWebRTC token={token} name={name} type={type} position={position}/>
      </div>
    </div>
  )
}

export default WebRTCpage

