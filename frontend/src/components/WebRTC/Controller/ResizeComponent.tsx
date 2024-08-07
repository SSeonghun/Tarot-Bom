import React, { useState, useRef, useEffect } from 'react';

const ResizeComponent: React.FC<{
    videoId: string | number;
    isMaximized: boolean;
    isMinimized: boolean;
    onDoubleClick: () => void;
    children: React.ReactNode;
}> = ({ videoId, isMaximized, isMinimized, onDoubleClick, children }) => {
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
            {children}
        </div>
    );
};

export default ResizeComponent;
