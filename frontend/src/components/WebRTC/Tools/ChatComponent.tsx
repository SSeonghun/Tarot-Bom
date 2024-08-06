import React, { useState } from 'react';
import useChatStore from '../../../stores/ChatStore';
import axios from 'axios';

interface ChatComponentProps {
    roomId: string;  // 방마다 고유한 예약 번호 PK로 string 타입으로 변경
}

const ChatComponent: React.FC<ChatComponentProps> = ({ roomId }) => {
    const [message, setMessage] = useState('');
    const { logs, addLog } = useChatStore();

    const handleSend = async () => {
        if (message.trim() === '') return;

        const newLog = {
            userId: '현재_유저_ID',  // 실제로는 인증된 유저 ID를 가져와야 합니다.
            message,
            timestamp: new Date().toISOString(),
        };

        // Zustand를 통해 로컬 상태 업데이트
        addLog(newLog);

        // 백엔드로 로그 전송
        try {
            await axios.post('/api/chat/log', {
                roomId,
                ...newLog,
            });
        } catch (error) {
            console.error('Failed to send chat log to server', error);
        }

        // 입력란 초기화
        setMessage('');
    };

    return (
        <div className="chat-container">
            <div className="chat-log">
                {logs.map((log, index) => (
                    <div key={index} className="chat-message">
                        <strong>{log.userId}</strong>: {log.message} <em>{log.timestamp}</em>
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
