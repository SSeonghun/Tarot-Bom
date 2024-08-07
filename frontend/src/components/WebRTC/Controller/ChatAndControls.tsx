import React, { useState, useRef, useEffect } from "react";
import ControlsPanel from "./ControlsPanel";
import ChatComponent from "../Tools/ChatComponent";
import { Room } from "livekit-client";
interface ChatAndControlsProps {
    roomId: string;
    participantName: string; // 추가: participantName을 받습니다
    room: Room | undefined; // 추가: room을 받습니다
    handleSendChatMessage: (message: string) => void;
    onCameraChange: (deviceId: string | null) => void; // 추가
    onAudioChange: (deviceId: string | null) => void; // 추가
}
const ChatAndControls: React.FC<ChatAndControlsProps> = ({ 
    roomId, 
    participantName, 
    room, 
    handleSendChatMessage,
    onCameraChange, // 추가
    onAudioChange // 추가
 }) => {
    const [isReportVisible, setReportVisible] = useState<boolean>(false);
    const reportRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const toggleReport = () => {
        setReportVisible(!isReportVisible);
    };

    const startDrag = (e: React.MouseEvent) => {
        e.preventDefault();
        setDragging(true);
        setOffset({
            x: e.clientX - (reportRef.current?.getBoundingClientRect().left || 0),
            y: e.clientY - (reportRef.current?.getBoundingClientRect().top || 0),
        });
    };

    const onDrag = (e: MouseEvent) => {
        if (dragging && reportRef.current) {
            const x = e.clientX - offset.x;
            const y = e.clientY - offset.y;
            reportRef.current.style.left = `${x}px`;
            reportRef.current.style.top = `${y}px`;
        }
    };

    const stopDrag = () => {
        setDragging(false);
    };

    useEffect(() => {
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', stopDrag);

        return () => {
            window.removeEventListener('mousemove', onDrag);
            window.removeEventListener('mouseup', stopDrag);
        };
    }, [dragging, offset]);

    return (
        <div className="bg-gray-100 p-4 flex flex-col h-full">
            {/* 채팅창 */}
            <ChatComponent 
                roomId={roomId}
                participantName={participantName}
                room={room}
                handleSendChatMessage={handleSendChatMessage} 
            />
            <div className="relative flex-grow bg-blue-500 p-4" style={{ flex: '7 1 0' }}>
                {/* 신고 버튼 */}
                <button
                    onClick={toggleReport}
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    신고
                </button>
                
                {/* 신고 인터페이스 */}
                {isReportVisible && (
                    <div
                        ref={reportRef}
                        className="fixed bg-white border border-gray-300 shadow-lg p-4 rounded w-64"
                        style={{ 
                            top: '50%', 
                            left: '50%', 
                            // transform: 'translate(-50%, -50%)',
                            cursor: dragging ? 'grabbing' : 'grab',
                            zIndex: 1000
                        }}
                        onMouseDown={startDrag}
                    >
                        <h3 className="text-lg font-bold mb-2">신고하기</h3>
                        <form>
                            <label className="block mb-2 text-gray-700">유저 ID</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                                placeholder="유저 ID 입력"
                            />
                            <label className="block mb-2 text-gray-700">신고 사유</label>
                            <textarea
                                rows={4}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                                placeholder="신고 사유 입력"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                신고하기
                            </button>
                        </form>
                        <button
                            onClick={toggleReport}
                            className="mt-2 text-red-500 hover:text-red-600"
                        >
                            닫기
                        </button>
                    </div>
                )}
            </div>

            {/* 화면 통제 */}
            {/* <div /> */}
            <div className="bg-gray-300 flex-grow" style={{ flex: '1 1 0' }}>
            <ControlsPanel
                onCameraChange={onCameraChange}
                onAudioChange={onAudioChange}
            />
            </div>
            
        </div>
    );
};

export default ChatAndControls;
