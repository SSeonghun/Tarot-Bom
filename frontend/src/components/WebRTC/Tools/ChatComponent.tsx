import React, { useState, useEffect } from 'react';
import { Room, RoomEvent } from 'livekit-client';
import useChatStore from '../../../stores/ChatStore'; // Zustand 스토어 임포트

interface ChatComponentProps {
    roomId: string;
    room: Room | undefined; // WebRTC 방 객체
    participantName: string; // 참가자 이름
    handleSendChatMessage: (message: string) => void; // 채팅 메시지 전송 핸들러
}

const ChatComponent: React.FC<ChatComponentProps> = ({ room, participantName, handleSendChatMessage }) => {
    const [message, setMessage] = useState(''); // 입력란 상태
    const { logs, addLog, sendLogsToBackend } = useChatStore((state) => ({
        logs: state.logs, // Zustand에서 현재 로그 상태 가져오기
        addLog: state.addLog, // Zustand에서 로그 추가 메서드 가져오기
        sendLogsToBackend: state.sendLogsToBackend, // Zustand에서 로그 전송 메서드 가져오기
    }));

    // 채팅 메시지 수신
    useEffect(() => {
        if (!room) return;

        const handleDataReceived = (data: Uint8Array) => {
            const jsonString = new TextDecoder().decode(data);
            try {
                const jsonData = JSON.parse(jsonString);
                if (jsonData.type === 'text') {
                    // 상태에 중복되지 않도록 확인 후 추가
                if (!logs.some(log => log.timestamp === jsonData.timestamp && log.userId === jsonData.userId && log.message === jsonData.content)) {
                    addLog({
                        userId: jsonData.userId,
                        message: jsonData.content,
                        //timestamp: new Date().toISOString(),
                         timestamp: jsonData.timestamp,
                    });
                }
            }
            } catch (error) {
                console.error('Error parsing JSON data:', error);
            }
        };

        room.on(RoomEvent.DataReceived, handleDataReceived);

        // 컴포넌트 언마운트 시 이벤트 리스너 정리
        return () => {
            room.off(RoomEvent.DataReceived, handleDataReceived);
        };
    }, [room, addLog]);

    // 채팅 메시지 전송
    const handleSend = async () => {
        if (message.trim() === '') return; // 빈 메시지 전송 방지

        const chatMessage = JSON.stringify({
            type: 'text',
            userId: participantName,
            content: message,
            timestamp: new Date().toISOString(),
            //timestamp: new Date().toISOString(), // 타임스탬프 추가
        });
        //console.log(message)
        const uint8ArrayData = new TextEncoder().encode(chatMessage);

        try {
            await room?.localParticipant.publishData(uint8ArrayData); // WebRTC를 통해 메시지 전송
            // 메시지를 Zustand에 추가하여 채팅창에 반영
            addLog({
                userId: participantName,
                message: message,
                timestamp: new Date().toISOString(),
            });
            await sendLogsToBackend();
            setMessage(''); // 입력란 초기화
            //handleSendChatMessage(message); // 부모 컴포넌트에 메시지 전송 알림
        } catch (error) {
            console.error('Error sending chat message:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-log">
                {logs.map((log, index) => (
                    <div key={index} className="chat-message">
                        <strong>{log.userId}</strong> {log.message} <em>{log.timestamp}</em>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    className="w-full p-2 border rounded"
                />
                <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded ml-2">
                    전송
                </button>
            </div>
        </div>
    );
};

export default ChatComponent;
