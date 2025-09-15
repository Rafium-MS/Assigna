import React from 'react';

export interface ImageAnnotatorProps {
  imageUrl: string;
  onAddStreet: (point: { x: number; y: number }) => void;
  onAddAddress: (point: { x: number; y: number }) => void;
}

export default function ImageAnnotator({ imageUrl, onAddStreet, onAddAddress }: ImageAnnotatorProps): JSX.Element {
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onAddStreet({ x, y });
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onAddAddress({ x, y });
  };

  return (
    <div className="relative inline-block">
      <img src={imageUrl} alt="" className="max-w-full h-auto select-none" />
      <canvas
        className="absolute top-0 left-0 w-full h-full cursor-crosshair"
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      />
    </div>
  );
}

