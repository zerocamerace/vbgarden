import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

interface PaintCanvasProps {
    tool: 'none' | 'pen' | 'eraser';
    brushColor: string;
    brushSize: number;
}

export interface PaintCanvasHandle {
    clearCanvas: () => void;
}

const PaintCanvas = forwardRef<PaintCanvasHandle, PaintCanvasProps>(({ tool, brushColor, brushSize }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    // Expose clear functionality
    useImperativeHandle(ref, () => ({
        clearCanvas: () => {
            const canvas = canvasRef.current;
            const context = contextRef.current;
            if (canvas && context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }));

    // Initialize canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const context = canvas.getContext('2d');
            if (context) {
                context.lineCap = 'round';
                context.lineJoin = 'round';
                contextRef.current = context;

                if (tool === 'eraser') {
                    context.globalCompositeOperation = 'destination-out';
                    context.lineWidth = 20;
                } else {
                    context.globalCompositeOperation = 'source-over';
                    context.strokeStyle = brushColor;
                    context.lineWidth = brushSize;
                }
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    // Update context settings when tool changes
    useEffect(() => {
        if (!contextRef.current) return;

        if (tool === 'eraser') {
            contextRef.current.globalCompositeOperation = 'destination-out';
            contextRef.current.lineWidth = 20;
        } else {
            contextRef.current.globalCompositeOperation = 'source-over';
            contextRef.current.strokeStyle = brushColor;
            contextRef.current.lineWidth = brushSize;
        }
    }, [tool, brushColor, brushSize]);

    const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
        if (tool === 'none') return;
        const { offsetX, offsetY } = getCoordinates(nativeEvent);
        contextRef.current?.beginPath();
        contextRef.current?.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || tool === 'none') return;
        const { offsetX, offsetY } = getCoordinates(nativeEvent);
        contextRef.current?.lineTo(offsetX, offsetY);
        contextRef.current?.stroke();
    };

    const stopDrawing = () => {
        contextRef.current?.closePath();
        setIsDrawing(false);
    };

    const getCoordinates = (nativeEvent: MouseEvent | TouchEvent | any) => {
        if (nativeEvent.touches && nativeEvent.touches.length > 0) {
            const touch = nativeEvent.touches[0];
            const canvas = canvasRef.current;
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                return {
                    offsetX: touch.clientX - rect.left,
                    offsetY: touch.clientY - rect.top
                };
            }
        }
        return { offsetX: nativeEvent.offsetX, offsetY: nativeEvent.offsetY };
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className={`fixed inset-0 z-0 ${tool !== 'none' ? 'pointer-events-auto touch-none cursor-crosshair' : 'pointer-events-none'}`}
        />
    );
});

export default PaintCanvas;
