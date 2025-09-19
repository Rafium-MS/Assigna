import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui';

export interface GuidedTourStep {
  ref: React.RefObject<HTMLElement>;
  title: string;
  description: string;
}

interface GuidedTourProps {
  steps: GuidedTourStep[];
  open: boolean;
  stepIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
}

interface Position {
  top: number;
  left: number;
  width: number;
  height: number;
}

const HIGHLIGHT_PADDING = 12;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const GuidedTour: React.FC<GuidedTourProps> = ({ steps, open, stepIndex, onNext, onPrevious, onClose }) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState<Position | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);

  const totalSteps = steps.length;
  const isLastStep = stepIndex >= totalSteps - 1;
  const isFirstStep = stepIndex <= 0;

  const activeStep = steps[stepIndex];

  const updatePosition = useMemo(
    () => () => {
      if (!open) {
        return;
      }

      const element = steps[stepIndex]?.ref.current;
      if (!element) {
        setPosition(null);
        setTooltipPosition(null);
        return;
      }

      const rect = element.getBoundingClientRect();
      const highlight: Position = {
        top: rect.top - HIGHLIGHT_PADDING,
        left: rect.left - HIGHLIGHT_PADDING,
        width: rect.width + HIGHLIGHT_PADDING * 2,
        height: rect.height + HIGHLIGHT_PADDING * 2,
      };
      setPosition(highlight);

      const tooltipWidth = Math.min(320, window.innerWidth - 32);
      const margin = 16;
      let top = rect.bottom + margin;
      if (top + 200 > window.innerHeight) {
        top = rect.top - margin - 200;
      }
      top = clamp(top, 16, Math.max(16, window.innerHeight - 216));
      const left = clamp(rect.left, 16, window.innerWidth - tooltipWidth - 16);
      setTooltipPosition({ top, left });
    },
    [open, stepIndex, steps],
  );

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      setTooltipPosition(null);
      return;
    }
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const element = steps[stepIndex]?.ref.current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
    updatePosition();
  }, [open, stepIndex, steps, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open || totalSteps === 0) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[1000]">
      <div className="absolute inset-0" onClick={onClose} />
      {position && (
        <div
          className="pointer-events-none fixed rounded-2xl border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] transition-all duration-150"
          style={{
            top: Math.max(position.top, 8),
            left: Math.max(position.left, 8),
            width: Math.max(position.width, 40),
            height: Math.max(position.height, 40),
          }}
        />
      )}
      <div className="fixed inset-0 flex items-start justify-center overflow-hidden pointer-events-none">
        <div
          className="relative w-full"
          style={{
            maxWidth: '100%',
            height: '100%',
          }}
        >
          {tooltipPosition && activeStep && (
            <div
              className="pointer-events-auto fixed z-[1001] max-w-[320px] rounded-2xl bg-white p-4 text-neutral-900 shadow-lg dark:bg-neutral-900 dark:text-neutral-100"
              style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
            >
              <div className="mb-2 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                {t('suggestions.tour.progress', { current: stepIndex + 1, total: totalSteps })}
              </div>
              <h3 className="text-lg font-semibold">{activeStep.title}</h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{activeStep.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={onPrevious}
                  disabled={isFirstStep}
                  className="bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t('common.previous')}
                </Button>
                <Button
                  type="button"
                  onClick={onClose}
                  className="ml-auto bg-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-300"
                >
                  {t('app.close')}
                </Button>
                <Button
                  type="button"
                  onClick={isLastStep ? onClose : onNext}
                  className="bg-black text-white dark:bg-white dark:text-black"
                >
                  {isLastStep ? t('suggestions.tour.finish') : t('common.next')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

