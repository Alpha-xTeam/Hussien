import React from 'react';
import gsap from 'gsap';
import { useLang } from '../LanguageContext';
import { t } from '../i18n';

const TECH = [
  { name: 'React', active: true, svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><circle cx="12" cy="12" r="2.5"/><g stroke="currentColor" stroke-width="1.2" fill="none"><ellipse cx="12" cy="12" rx="10.5" ry="4"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60,12,12)"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120,12,12)"/></g></svg>' },
  { name: 'Next.js', svg: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" stroke-width="0.5" fill="none"/><text x="12" y="16" text-anchor="middle" font-size="14" font-weight="800" font-family="sans-serif">N</text></svg>' },
  { name: 'TypeScript', svg: '<svg viewBox="0 0 24 24" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6"/><text x="12" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="sans-serif">TS</text></svg>' },
  { name: 'JavaScript', svg: '<svg viewBox="0 0 24 24" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E"/><text x="12" y="16" text-anchor="middle" font-size="12" font-weight="800" fill="#000" font-family="sans-serif">JS</text></svg>' },
  { name: 'Tailwind', svg: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 4c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.6 2.6 5.3 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C15.2 5.6 13.8 4 12 4zM6 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.6 2.6 5.3 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C9.2 13.6 7.8 12 6 12z" fill="#38BDF8"/></svg>' },
  { name: 'Node.js', svg: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.5l7 3.5v7l-7 3.5-7-3.5v-7l7-3.5z" fill="#68A063"/><path d="M12 5l5 2.5v5L12 15l-5-2.5v-5L12 5z" fill="#fff" opacity="0.2"/></svg>' },
  { name: 'Git', svg: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-.06 17.5c-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5 7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z" fill="#DE4C36"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#DE4C36"/></svg>' },
  { name: 'Figma', svg: '<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="7.5" r="4.5" fill="#0ACF83"/><circle cx="12" cy="16.5" r="4.5" fill="#FF7262"/><rect x="7.5" y="7.5" width="9" height="9" rx="4.5" fill="#F24E1E"/><circle cx="16.5" cy="7.5" r="4.5" fill="#A259FF"/><rect x="12" y="7.5" width="4.5" height="4.5" rx="2.25" fill="#0ACF83"/></svg>' },
];

const TechStack = () => {
  const { lang } = useLang();
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.tech-header', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="tech-section" ref={sectionRef}>
      <div className="container">
        <div className="tech-header">
          <div className="tech-tag">
            <span className="tech-tag-line" />
            {t('tech.tag', lang)}
            <span className="tech-tag-line" />
          </div>
          <h2 className="tech-heading">
            {t('tech.title', lang)}{' '}
            <span className="tech-heading-accent">{t('tech.titleAccent', lang)}</span>
          </h2>
        </div>
        <div className="tech-marquee">
          <div className="tech-track" style={{ display: 'flex', gap: '12px', width: 'fit-content' }}>
            {[...TECH, ...TECH].map((item, i) => (
              <div key={i} className={`tech-chip${item.active ? ' active' : ''}`}>
                <span className="tech-chip-icon" dangerouslySetInnerHTML={{ __html: item.svg }} />
                <span className="tech-chip-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .tech-section { padding: 80px 0 100px; position: relative; }
        .tech-header { text-align: center; margin-bottom: 48px; }
        .tech-tag { display: inline-flex; align-items: center; gap: 12px; font-size: 0.75rem; font-weight: 500; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
        .tech-tag-line { width: 24px; height: 1px; background: rgba(var(--rgb-base), 0.15); }
        .tech-heading { font-size: clamp(1.5rem,3.5vw,2.5rem); font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary); }
        .tech-heading-accent { background: linear-gradient(135deg, var(--text-primary) 40%,rgba(var(--rgb-base), 0.5)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .tech-marquee { overflow: hidden; mask-image: linear-gradient(to right,transparent 0%,#000 5%,#000 95%,transparent 100%); }
        .tech-track { display: flex; gap: 12px; width: fit-content; animation: marqueeScroll 30s linear infinite; }
        @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .tech-chip { display: flex; align-items: center; gap: 10px; padding: 10px 20px; border-radius: 12px; background: rgba(var(--rgb-base), 0.02); border: 1px solid rgba(var(--rgb-base), 0.06); transition: all 0.3s ease; white-space: nowrap; }
        .tech-chip:hover { background: rgba(var(--rgb-base), 0.04); border-color: rgba(var(--rgb-base), 0.12); transform: translateY(-2px); }
        .tech-chip.active { background: var(--btn-primary-bg); border-color: var(--btn-primary-bg); color: var(--btn-primary-color); }
        .tech-chip-icon { display: flex; align-items: center; }
        .tech-chip-icon svg { display: block; }
        .tech-chip.active .tech-chip-icon { color: #000; }
        .tech-chip-name { font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .tech-chip.active .tech-chip-name { color: #000; }
        @media (max-width: 768px) { .tech-section { padding: 40px 0 60px; } .tech-heading { font-size: 1.3rem; letter-spacing: 0; } .tech-chip { padding: 8px 14px; } .tech-chip-name { font-size: 0.7rem; } }
        [dir="rtl"] .tech-heading { letter-spacing: 0; }
      `}</style>
    </section>
  );
};

export default TechStack;
