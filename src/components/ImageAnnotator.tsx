import React from 'react';

/**
 * Props for the ImageAnnotator component.
 */
export interface ImageAnnotatorProps {
  /** The URL of the image to be annotated. */
  imageUrl: string;
  /** Callback function for adding a point. */
  onAdd?: (point: { x: number; y: number }) => void | Promise<void>;
  /** Callback function for updating a point. */
  onUpdate?: (point: { x: number; y: number }) => void | Promise<void>;
  /** Callback function for deleting a point. */
  onDelete?: (point: { x: number; y: number }) => void | Promise<void>;
}

/**
 * Gets the coordinates of a mouse event relative to the canvas.
 * @param event The mouse event on the canvas.
 * @returns The x and y coordinates of the point.
 */
const getPoint = (
  event: React.MouseEvent<HTMLCanvasElement>,
): { x: number; y: number } => {
  const rect = event.currentTarget.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

/**
 * A component for annotating images with points.
 * It allows adding, updating, and deleting points on an image.
 * @param props The props for the component.
 * @returns A JSX element representing the image annotator.
 */
export default function ImageAnnotator({
  imageUrl,
  onAdd,
  onUpdate,
  onDelete,
}: ImageAnnotatorProps): JSX.Element {
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
