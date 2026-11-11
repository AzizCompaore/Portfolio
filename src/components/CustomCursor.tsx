import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"]')
      );
      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  useEffect(() => {
    let animationFrameId: number;
    const followCursor = () => {
      setTrailing((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25,
      }));
      animationFrameId = requestAnimationFrame(followCursor);
    };
    animationFrameId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Central crisp dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#141416] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovering ? 0.5 : 1})`,
        }}
      />
      {/* Trailing smooth magnetic aura */}
      <div
        className="fixed top-0 left-0 rounded-full border border-[#F9A826] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-200"
        style={{
          width: isHovering ? '44px' : '26px',
          height: isHovering ? '44px' : '26px',
          backgroundColor: isHovering ? 'rgba(249, 168, 38, 0.15)' : 'transparent',
          transform: `translate3d(${trailing.x - (isHovering ? 22 : 13)}px, ${trailing.y - (isHovering ? 22 : 13)}px, 0)`,
        }}
      />
    </div>
  );
};
