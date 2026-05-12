import React from 'react';

const ScrollFollower = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / maxScroll, 1);

      const yMove = progress * 80;
      const xDrift = Math.sin(progress * Math.PI * 3) * 20;
      const rotate = progress * 720;

      el.style.transform = `translate(${xDrift}px, calc(-50% + ${yMove}px)) rotate(${rotate}deg)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-follower" ref={ref}>
      <svg viewBox="0 0 100 100" fill="none" className="follower-shape">
        <path d="M50 5 L85 25 L85 75 L50 95 L15 75 L15 25 Z" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
        <path d="M15 25 L50 45 L85 25" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <path d="M50 45 L50 95" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <path d="M30 35 L50 45 L70 35" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
        <path d="M30 35 L30 65 L50 75 L70 65 L70 35" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
        <line x1="30" y1="65" x2="50" y2="75" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
        <line x1="50" y1="75" x2="70" y2="65" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
        <circle cx="50" cy="5" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="85" cy="25" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="85" cy="75" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="50" cy="95" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="15" cy="75" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="15" cy="25" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="50" cy="45" r="1" fill="currentColor" opacity="0.3" />
      </svg>

      <style>{`
        .scroll-follower {
          position: fixed;
          top: 50%;
          right: 20px;
          width: 70px;
          height: 70px;
          z-index: 990;
          pointer-events: none;
          color: var(--text-primary);
          opacity: 0.25;
          will-change: transform;
          transition: opacity 0.8s ease;
        }
        .follower-shape {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 30px rgba(var(--rgb-base), 0.06));
        }
        @media (max-width: 768px) {
          .scroll-follower {
            width: 40px;
            height: 40px;
            right: 10px;
            opacity: 0.15;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-follower { display: none; }
        }
      `}</style>
    </div>
  );
};

export default ScrollFollower;
