import { act } from 'react';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRoot } from 'react-dom/client';
import ImageAnnotator from './ImageAnnotator';

// Inform React that the environment supports `act`
// See https://react.dev/reference/test-utils/act#setting-up-your-test-environment
// Vitest + jsdom does not set this flag automatically.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderAnnotator = (
  props: Partial<Omit<ComponentProps<typeof ImageAnnotator>, 'imageUrl'>> = {},
) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(<ImageAnnotator imageUrl="/test.png" {...props} />);
  });

  const canvas = container.querySelector('canvas');
  if (!canvas) throw new Error('Canvas element not found');

  const cleanup = (): void => {
    act(() => {
      root.unmount();
    });
    container.remove();
  };

  return { canvas, cleanup };
};

describe('ImageAnnotator', () => {
  it('calls onAdd and onUpdate with the correct coordinates', () => {
    const onAdd = vi.fn();
    const onUpdate = vi.fn();

    const { canvas, cleanup } = renderAnnotator({ onAdd, onUpdate });

    const rectSpy = vi
      .spyOn(canvas, 'getBoundingClientRect')
      .mockReturnValue(new DOMRect(10, 20, 200, 100));

    act(() => {
      canvas.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          clientX: 30,
          clientY: 70,
          button: 0,
        }),
      );
    });

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith({ x: 20, y: 50 });

    act(() => {
      canvas.dispatchEvent(
        new MouseEvent('contextmenu', {
          bubbles: true,
          clientX: 60,
          clientY: 90,
          button: 2,
        }),
      );
    });

    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledWith({ x: 50, y: 70 });

    rectSpy.mockRestore();
    cleanup();
  });

  it('calls onDelete on double click', () => {
    const onDelete = vi.fn();

    const { canvas, cleanup } = renderAnnotator({ onDelete });

    const rectSpy = vi
      .spyOn(canvas, 'getBoundingClientRect')
      .mockReturnValue(new DOMRect(5, 5, 100, 100));

    act(() => {
      canvas.dispatchEvent(
        new MouseEvent('dblclick', {
          bubbles: true,
          clientX: 25,
          clientY: 45,
          detail: 2,
        }),
      );
    });

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith({ x: 20, y: 40 });

    rectSpy.mockRestore();
    cleanup();
  });
});
