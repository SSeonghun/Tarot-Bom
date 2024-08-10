import React, { useState, useRef, useEffect } from 'react';

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

    return (
        <div
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
            className={`relative border border-gray-300 rounded-lg transition-all duration-300 ease-in-out ${isMinimized ? 'w-24 h-18' : isMaximized ? 'w-screen h-screen' : 'w-52 h-40'} m-1`} 
            style={{
                position: isMaximized ? 'fixed' : 'absolute',
                top: isMaximized ? 0 : position.y,
                left: isMaximized ? 0 : position.x,
                width: isMaximized ? '100vw' : isMinimized ? '200px' : '400px',
                height: isMaximized ? '100vh' : isMinimized ? '100px' : '300px',
                backgroundColor: '#ccc',
                zIndex: isMaximized ? 1000 : 1,
                cursor: isMinimized ? 'move' : 'default',
            }}
        >
            {/* 음소거 및 화면 끄기 버튼 */}
            <div className="absolute top-0 right-0 p-2 z-50">
            <button
            onClick={onToggleMute}
            className={`px-4 py-2 text-white rounded ${isMuted ? 'bg-red-600' : 'bg-blue-600'} hover:bg-blue-700`}
            >
            {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button
            onClick={onToggleVideo}
            className={`mt-2 px-4 py-2 text-white rounded ${isVideoOff ? 'bg-yellow-600' : 'bg-green-600'} hover:bg-green-700`}
            >
            {isVideoOff ? 'Turn On Video' : 'Turn Off Video'}
            </button>
        </div>
            {children}
        </div>
    );
};

export default ResizeComponent;
