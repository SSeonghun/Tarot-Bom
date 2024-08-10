import React, { useState, useRef, useEffect } from "react";
import ControlsPanel from "./ControlsPanel";
import ChatComponent from "../Tools/ChatComponent";
import { Room } from "livekit-client";
import axios from "axios";
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

    const [reportUserId, setReportUserId] = useState<string>(''); // 유저 ID 상태
    const [reportReason, setReportReason] = useState<string>(''); // 신고 사유 상태
    const toggleReport = () => {
        setReportVisible(!isReportVisible);
    };

    const startDrag = (e: React.MouseEvent) => {
        // 드래그 이벤트가 발생한 요소가 인풋 필드나 텍스트 영역인 경우 드래그를 시작하지 않음
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
            return;
        }

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
    const handleReportSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 백엔드로 POST 요청 보내기
            const response = await axios.post('/api/report', {
                userId: reportUserId,
                reason: reportReason,
                roomId: roomId, // 추가: roomId도 함께 전송
            });
            console.log('신고 제출 성공:', response.data);
            
            // 초기화
            setReportUserId('');
            setReportReason('');
            setReportVisible(false);
        } catch (error) {
            console.error('신고 제출 실패:', error);
            setReportVisible(false);
        }
    };
    return (
        <div className="bg-gray-100 p-4 flex flex-col h-full">
            
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
                        className="fixed bg-white border border-gray-300 shadow-lg p-4 rounded w-64 z-50"
                        style={{ 
                            top: '50%', 
                            left: '50%', 
                            cursor: dragging ? 'grabbing' : 'grab',
                            zIndex: 2000 // z-index를 더 높게 설정
                        }}
                        onMouseDown={startDrag}
                    >
                        <h3 className="text-lg font-bold mb-2">신고하기</h3>
                        <form onSubmit={handleReportSubmit} className="space-y-4">
                            <label className="block mb-2 text-gray-700">유저 ID</label>
                            <input
                                type="text"
                                value={reportUserId}
                                onChange={(e) => setReportUserId(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-4 pointer-events-auto"
                                placeholder="유저 ID 입력"
                            />
                            <textarea
                                rows={4}
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-4 pointer-events-auto"
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
                {/* 채팅창 */}
            <div className="flex flex-col bg-gray-800 rounded-lg shadow-md p-4 mb-4 h-3/4">
            <ChatComponent 
                roomId={roomId}
                participantName={participantName}
                room={room}
                handleSendChatMessage={handleSendChatMessage} 
            />
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
