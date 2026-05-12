import React from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => { setVisible(window.scrollY > 500); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <button className={`back-to-top${visible ? ' visible' : ''}`} onClick={scrollToTop} aria-label="Back to top">
        <ArrowUp size={18} />
      </button>
      <style>{`
        .back-to-top {
          position: fixed; bottom: 32px; right: 32px; width: 44px; height: 44px;
          border-radius: 12px; background: rgba(var(--rgb-base), 0.06);
          border: 1px solid rgba(var(--rgb-base), 0.08); color: var(--text-secondary);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          z-index: 999; opacity: 0; transform: translateY(16px) scale(0.9);
          pointer-events: none; transition: all 0.3s cubic-bezier(0.2,0.8,0.2,1);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        }
        .back-to-top.visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .back-to-top:hover {
          background: rgba(var(--rgb-base), 0.1); color: var(--text-primary);
          border-color: var(--text-dim); transform: translateY(-2px) scale(1);
        }
        .back-to-top:active { transform: translateY(0) scale(0.95); }
        @media (max-width: 768px) { .back-to-top { bottom: 20px; right: 20px; width: 40px; height: 40px; } }
      `}</style>
    </>
  );
};

export default BackToTop;
