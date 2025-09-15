import React from 'react';

export interface ImageAnnotatorProps {
  imageUrl: string;
  onAdd?: (point: { x: number; y: number }) => void | Promise<void>;
  onUpdate?: (point: { x: number; y: number }) => void | Promise<void>;
  onDelete?: (point: { x: number; y: number }) => void | Promise<void>;
}

const getPoint = (event: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number } => {
  const rect = event.currentTarget.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};

export default function ImageAnnotator({ imageUrl, onAdd, onUpdate, onDelete }: ImageAnnotatorProps): JSX.Element {
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getPoint(event);
    void onAdd?.(point);
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const point = getPoint(event);
    void onUpdate?.(point);
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getPoint(event);
    void onDelete?.(point);
  };

  return (
    <div className="relative inline-block">
      <img src={imageUrl} alt="" className="max-w-full h-auto select-none" />
      <canvas
        className="absolute top-0 left-0 w-full h-full cursor-crosshair"
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onDoubleClick={handleDoubleClick}
      />
    </div>
  );
}

