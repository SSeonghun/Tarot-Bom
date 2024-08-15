import React, { useState, useRef, useEffect } from 'react';
import muteOnIcon from '../../../assets/음소거 해제.png'; // 음소거 해제 아이콘
import muteOffIcon from '../../../assets/음소거 중.png';  // 음소거 중 아이콘
import videoOffIcon from '../../../assets/화면 꺼짐.png'; // 화면 꺼짐 아이콘
import videoOnIcon from '../../../assets/화면 켜짐.png';  // 화면 켜짐 아이콘

const ResizeComponent: React.FC<{
    videoId: string | number;
    isMaximized: boolean;
    isMinimized: boolean;
    onDoubleClick: () => void;
    children: React.ReactNode;
    onToggleMute: () => void;  // 음소거 버튼 이벤트 추가
    onToggleVideo: () => void; // 화면 끄기 버튼 이벤트 추가
    isMuted: boolean;          // 음소거 상태
    isVideoOff: boolean;       // 화면 끄기 상태
}> = ({ videoId, isMaximized, isMinimized, onDoubleClick, children, onToggleMute, onToggleVideo, isMuted, isVideoOff }) => {
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 100, y: 100 });
    const [dragging, setDragging] = useState<boolean>(false);
    const dragItem = useRef<HTMLDivElement | null>(null);
    const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (dragging && dragItem.current) {
                const newX = e.clientX - dragStart.current.x;
                const newY = e.clientY - dragStart.current.y;
                setPosition({ x: newX, y: newY });
            }
        };

        const handleMouseUp = () => {
            if (dragging) {
                setDragging(false);
                if (dragItem.current) {
                    dragItem.current.style.cursor = 'default';
                    dragItem.current = null;
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isMaximized) {
            setDragging(true);
            dragItem.current = e.currentTarget;
            dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
            e.currentTarget.style.cursor = 'move';
        }
    };

    const handleDoubleClick = () => {
        onDoubleClick();
    };
    // ResizeComponent의 크기를 VideoComponent와 비율 맞추기
    // VideoComponent의 비율: 16:9 (대부분의 비디오 비율)
    const videoAspectRatio = 16 / 9; // 비율 계산
    const resizeWidth = isMaximized ? '100vw' : isMinimized ? '50vw' : '400px';
    const resizeHeight = isMaximized ? '100vh' : isMinimized ? `${40 / videoAspectRatio}vw` : `${400 / videoAspectRatio}px`;
    return (
        <div
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
            className={`relative border border-gray-300 rounded-lg transition-all duration-300 ease-in-out ${isMinimized ? 'w-1000 h-800' : isMaximized ? 'w-screen h-screen' : 'w-[800px] h-[500px]'} m-1`} // ResizeComponent 크기 조정
            style={{
                position: isMaximized ? 'fixed' : 'absolute',
                top: isMaximized ? 0 : position.y,
                left: isMaximized ? 0 : position.x,
                width: resizeWidth,
                height: resizeHeight,
                backgroundColor: '#ccc',
                zIndex: isMaximized ? 40 : 1,
                cursor: isMinimized ? 'move' : 'default',
                overflow: 'hidden',  // 비디오 크기 조절 시 잘림 방지
            }}
        >
            {/* 음소거 및 화면 끄기 버튼 */}
            <div className="absolute bottom-0 right-0 p-2 z-50 ">
            <button
            onClick={onToggleMute}
            className={`px-4 py-2 rounded-full`}
            //  text-white rounded ${isMuted ? 'bg-red-600' : 'bg-blue-600'} hover:bg-blue-700`
            >
            <img src={isMuted ? muteOffIcon:  muteOnIcon} alt={isMuted ? 'Unmute' : 'Mute'} className="w-6 h-6"/>
            </button>
            <button
            onClick={onToggleVideo}
            className={`mt-2 px-4 py-2 text-white rounded $`}
            >
            <img src={isVideoOff ? videoOnIcon : videoOffIcon} alt={isVideoOff ? 'Turn On Video' : 'Turn Off Video'} className="w-6 h-6"/>
            </button>
        </div>
            {children}
        </div>
    );
};

export default ResizeComponent;
