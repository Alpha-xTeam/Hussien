import React from 'react';
import gsap from 'gsap';
import { useLang } from '../LanguageContext';
import { t } from '../i18n';

const STATS = [
  { value: 3, suffix: '', key: 'hero.projects' },
  { value: 12, suffix: '', key: 'showcase.statHappy' },
  { value: 10, suffix: '+', key: 'bento.techs' },
  { value: 4, suffix: '+', key: 'hero.years' },
];

const StatsCounter = () => {
  const { lang } = useLang();
  const sectionRef = React.useRef<HTMLElement>(null);
  const numsRef = React.useRef<(HTMLSpanElement | null)[]>([]);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el = numsRef.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + stat.suffix;
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div key={stat.key} className="stat-box">
              <span className="stat-number" ref={el => { numsRef.current[i] = el; }}>
                0{stat.suffix}
              </span>
              <span className="stat-label">{t(stat.key, lang)}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-section {
          padding: 80px 0;
          border-top: 1px solid rgba(var(--rgb-base), 0.04);
          border-bottom: 1px solid rgba(var(--rgb-base), 0.04);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
        }
        .stat-number {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          background: linear-gradient(180deg, var(--text-primary) 40%, rgba(var(--rgb-base), 0.5));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        }
      `}</style>
    </section>
  );
};

export default StatsCounter;
