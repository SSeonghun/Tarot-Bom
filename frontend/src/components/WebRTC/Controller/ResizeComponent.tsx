import React, { useState, useRef } from "react";

const ResizeComponent: React.FC = () => {
    const [isMaximized, setIsMaximized] = useState<boolean>(false);
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 100, y: 100 });

    const dragItem = useRef<any>(null);
    const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleMaximize = () => {
        setIsMaximized(true);
        setIsMinimized(false);
    };

    const handleMinimize = () => {
        setIsMinimized(true);
        setIsMaximized(false);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        dragItem.current = e.currentTarget;
        dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (dragItem.current) {
            const newX = e.clientX - dragStart.current.x;
            const newY = e.clientY - dragStart.current.y;
            setPosition({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        dragItem.current = null;
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
                position: isMaximized ? "fixed" : "absolute",
                top: isMaximized ? 0 : position.y,
                left: isMaximized ? 0 : position.x,
                width: isMaximized ? "100vw" : isMinimized ? "200px" : "400px",
                height: isMaximized ? "100vh" : isMinimized ? "100px" : "300px",
                backgroundColor: "#ccc",
                zIndex: 1000,
                cursor: isMinimized ? "move" : "default",
            }}
            onMouseDown={handleMouseDown}
        >
            <div className="flex justify-between bg-gray-400 p-2">
                <button onClick={handleMaximize} disabled={isMaximized}>
                    최대화
                </button>
                <button onClick={handleMinimize} disabled={isMinimized}>
                    최소화
                </button>
            </div>
            {!isMinimized && <div className="p-4">여기에 콘텐츠를 넣으세요.</div>}
        </div>
    );
};

export default ResizeComponent;
