import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reducedMotion.matches) return;

    document.body.classList.add('has-custom-cursor');
    setIsEnabled(true);

    let pointerX = -100;
    let pointerY = -100;
    let ringX = pointerX;
    let ringY = pointerY;
    let animationFrameId: number | null = null;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;

      pointerX = event.clientX;
      pointerY = event.clientY;
      setIsVisible(true);
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(followPointer);
      }

      const target = event.target;
      const interactive =
        target instanceof Element &&
        Boolean(target.closest('a, button, input, textarea, select, [role="button"], [class~="cursor-pointer"]'));
      setIsHovering(interactive);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' || event.pointerType === 'pen') setIsPressed(true);
    };
    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' || event.pointerType === 'pen') setIsPressed(false);
    };
    const handlePointerLeave = () => {
      setIsVisible(false);
      setIsPressed(false);
    };

    const followPointer = () => {
      animationFrameId = null;
      const ring = ringRef.current;
      const dot = dotRef.current;
      const deltaX = pointerX - ringX;
      const deltaY = pointerY - ringY;

      if (ring && dot) {
        ringX += deltaX * 0.65;
        ringY += deltaY * 0.65;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
        animationFrameId = window.requestAnimationFrame(followPointer);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        className={`custom-cursor-ring${isHovering ? ' is-hovering' : ''}${isPressed ? ' is-pressed' : ''}${isVisible ? '' : ' is-hidden'}`}
        style={{
          width: isPressed ? 30 : isHovering ? 52 : 36,
          height: isPressed ? 30 : isHovering ? 52 : 36,
          borderColor: isHovering ? '#F9A826' : 'rgba(20, 20, 22, 0.48)',
          backgroundColor: isHovering ? 'rgba(249, 168, 38, 0.12)' : 'rgba(255, 248, 241, 0.12)',
          boxShadow: isHovering
            ? '0 0 0 5px rgba(249, 168, 38, 0.08), 0 5px 18px rgba(20, 20, 22, 0.1)'
            : '0 3px 12px rgba(20, 20, 22, 0.08)',
        }}
      >
        <span className="custom-cursor-tick" />
      </div>
      <div
        ref={dotRef}
        className={`custom-cursor-dot${isPressed ? ' is-pressed' : ''}${isVisible ? '' : ' is-hidden'}`}
      />
    </div>
  );
};
