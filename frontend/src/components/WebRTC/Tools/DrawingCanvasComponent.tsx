import React, { useImperativeHandle, useRef, forwardRef, useEffect, ForwardedRef, useState } from 'react';
import * as fabric from 'fabric';

interface DrawingCanvasProps {
    onUpdate: (message: any) => void;
    color: string; // 부모 컴포넌트로부터 받은 색깔 속성
}

export type DrawingCanvasHandle = {
    getCanvas: () => fabric.Canvas | null;
    clearCanvas: () => void;
    saveDrawing: () => void;
    loadDrawing: (json: any) => void;
};

const DrawingCanvasComponent = forwardRef<DrawingCanvasHandle, DrawingCanvasProps>(
    ({ onUpdate, color }, ref: ForwardedRef<DrawingCanvasHandle>) => {
        const canvasRef = useRef<fabric.Canvas | null>(null);
        const [loading, setLoading] = useState<boolean>(false);

        useImperativeHandle(ref, () => ({
            getCanvas: () => canvasRef.current,
            clearCanvas: () => {
                if (canvasRef.current) {
                    canvasRef.current.clear();
                    console.log("Canvas cleared");
                }
            },
            saveDrawing: async () => {
                if (canvasRef.current) {
                    const jsonData = canvasRef.current.toJSON();
                    const message = {
                        type: 'drawing', // Set type to 'drawing'
                        data: jsonData,
                    };
                    console.log("Saving drawing with JSON:", message);
                    onUpdate(message);
                    //onUpdate(jsonData)
                }
            },
            loadDrawing: async (json: any) => {
                if (canvasRef.current) {
                    setLoading(true);
                    console.log("Loading drawing with JSON:", json);
                    try {
                        console.log("Current canvas state before load:", canvasRef.current.toJSON());

                        await new Promise<void>((resolve, reject) => {
                            if (canvasRef.current) {
                                canvasRef.current.loadFromJSON(json, () => {
                                    canvasRef.current?.renderAll();
                                    resolve();
                                });
                            } else {
                                reject("Canvas not initialized");
                            }
                        });
                        
                        // Wait a bit and then click the canvas to force renderAll
                        setTimeout(() => {
                            const canvasElement = document.getElementById('drawingCanvas');
                            if (canvasElement) {
                                const event = new MouseEvent('click', {
                                    view: window,
                                    bubbles: true,
                                    cancelable: true
                                });
                                canvasElement.dispatchEvent(event);
                                console.log("Canvas clicked programmatically.");
                            }
                        }, 100); // Adjust the timeout if needed

                        console.log("Canvas state after load:", canvasRef.current.toJSON());
                        console.log("Canvas loaded and rendered with JSON:", json);
                    } catch (error) {
                        console.error("Error loading drawing:", error);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    console.error("Canvas is not initialized for loading");
                }
            }
        }));

        useEffect(() => {
            // if (canvasRef.current) {
            //     console.log("Canvas already initialized:", canvasRef.current);
            //     canvasRef.current.isDrawingMode = true; // Ensure drawing mode is enabled
            //     return;
            // }

            console.log("Initializing canvas...");
            const canvas = new fabric.Canvas('drawingCanvas', {
                isDrawingMode: true,
                backgroundColor: 'transparent',
                width: window.innerWidth, // 캔버스의 물리적 크기 설정
                height: window.innerHeight, // 캔버스의 물리적 크기 설정
            });
            canvasRef.current = canvas;
            console.log("Canvas initialized:", canvas);

            const pencilBrush = new fabric.PencilBrush(canvas);
            pencilBrush.color = color;
            pencilBrush.width = 20;
            canvas.freeDrawingBrush = pencilBrush;
            console.log("Pencil brush configured:", pencilBrush);

            canvas.on('path:created', () => {
                if (canvasRef.current) {
                    // lastDrawingRef.current = canvasRef.current.toJSON();
                }
            });

            // Add click event to force renderAll
            const handleCanvasClick = () => {
                if (canvasRef.current) {
                    canvasRef.current.renderAll();
                    console.log("Canvas rendered after click.");
                }
            };

            const canvasElement = document.getElementById('drawingCanvas');
            if (canvasElement) {
                canvasElement.addEventListener('click', handleCanvasClick);
            }

            return () => {
                console.log("Disposing canvas...");
                if (canvasRef.current) {
                    canvasRef.current.dispose();
                }
            };

        }, []);
        // 색깔이 변경될 때마다 brush 색깔 업데이트
        useEffect(() => {
            if (canvasRef.current && canvasRef.current.freeDrawingBrush) {
                canvasRef.current.freeDrawingBrush.color = color;
                console.log("Pencil brush color updated:", color);
            }
        }, [color]);
        return (
            <div className="fixed top-0 left-0 w-screen h-screen z-50">
                <canvas
                    id="drawingCanvas"
                    className="fixed top-0 left-0 w-screen h-screen z-50 border-none"
                    style={{
                        opacity: loading ? 0 : 1,
                        transition: 'opacity 0s',
                    }}
                />
                {/* {loading && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'red',
                            opacity: 0.5,
                            zIndex: 2,
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}>
                            로딩 중...
                        </div>
                    </div>
                )} */}
            </div>
        );
    }
);

export default DrawingCanvasComponent;
