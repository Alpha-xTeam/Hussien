import React from 'react';
import gsap from 'gsap';
import { Palette, Code, Server, Zap, ArrowUpRight } from 'lucide-react';
import { useLang } from '../LanguageContext';
import { t } from '../i18n';

const CARDS = [
  { icon: Palette, titleKey: 'bento.uiux', descKey: 'bento.uiuxDesc', statValue: '20+', statKey: 'bento.projects', color: '#c084fc' },
  { icon: Code, titleKey: 'bento.frontend', descKey: 'bento.frontendDesc', statValue: '99.9%', statKey: 'bento.uptime', color: '#60a5fa' },
  { icon: Server, titleKey: 'bento.backend', descKey: 'bento.backendDesc', statValue: '10+', statKey: 'bento.techs', color: '#4ade80' },
  { icon: Zap, titleKey: 'bento.performance', descKey: 'bento.performanceDesc', statValue: '100%', statKey: 'bento.satisfaction', color: '#facc15' },
];

const BentoGrid = () => {
  const { lang } = useLang();
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.bento-header', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } });
      gsap.from('.bento-card', { y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bento section-padding" id="services" ref={sectionRef}>
      <div className="container">
        <div className="bento-header">
          <span className="bento-tag">{t('bento.tag', lang)}</span>
          <h2 className="bento-title">{t('bento.title1', lang)} <span className="bento-title-accent">{t('bento.title2', lang)}</span> {t('bento.title3', lang)}</h2>
          <p className="bento-sub">{t('bento.desc', lang)}</p>
        </div>
        <div className="bento-cards">
          {CARDS.map((card) => (
            <div key={card.titleKey} className="bento-card">
              <div className="bento-card-glow" style={{ background: `linear-gradient(135deg, ${card.color}08, transparent)` }} />
              <div className="bento-card-border" />
              <div className="bento-card-top">
                <div className="bento-icon-wrap" style={{ background: card.color, color: '#000' }}><card.icon size={18} /></div>
                <ArrowUpRight size={14} className="bento-card-arrow" />
              </div>
              <h3 className="bento-card-title">{t(card.titleKey, lang)}</h3>
              <p className="bento-card-desc">{t(card.descKey, lang)}</p>
              <div className="bento-card-stat">
                <span className="bento-stat-value">{card.statValue}</span>
                <span className="bento-stat-label">{t(card.statKey, lang)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .bento { position: relative; }
        .bento-header { text-align: center; max-width: 700px; margin: 0 auto 60px; }
        .bento-tag { display: inline-block; padding: 5px 14px; border-radius: 100px; background: rgba(var(--rgb-base), 0.04); border: 1px solid rgba(var(--rgb-base), 0.08); font-size: 0.75rem; font-weight: 500; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 16px; }
        .bento-title { font-size: clamp(2rem,4vw,3rem); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 16px; }
        .bento-title-accent { background: linear-gradient(135deg, var(--text-primary) 40%,rgba(var(--rgb-base), 0.5)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .bento-sub { font-size: 1rem; color: var(--text-secondary); line-height: 1.7; }
        .bento-cards { display: grid; grid-template-columns: repeat(2,1fr); gap: 1.25rem; }
        .bento-card { position: relative; padding: 2rem; border-radius: 20px; background: rgba(var(--rgb-base), 0.02); overflow: hidden; cursor: default; transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        .bento-card:hover { transform: translateY(-4px); }
        .bento-card-glow { position: absolute; inset: 0; opacity: 0; transition: opacity 0.4s ease; }
        .bento-card:hover .bento-card-glow { opacity: 1; }
        .bento-card-border { position: absolute; inset: 0; border-radius: 20px; border: 1px solid rgba(var(--rgb-base), 0.06); pointer-events: none; transition: border-color 0.4s ease; }
        .bento-card:hover .bento-card-border { border-color: rgba(var(--rgb-base), 0.12); }
        .bento-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; position: relative; z-index: 1; }
        .bento-icon-wrap { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .bento-card-arrow { color: var(--text-dim); transition: color 0.3s,transform 0.3s; }
        .bento-card:hover .bento-card-arrow { color: var(--text-primary); transform: translate(2px,-2px); }
        .bento-card-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; position: relative; z-index: 1; }
        .bento-card-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; position: relative; z-index: 1; }
        .bento-card-stat { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(var(--rgb-base), 0.04); display: flex; align-items: baseline; gap: 8px; position: relative; z-index: 1; }
        .bento-stat-value { font-size: 1.3rem; font-weight: 700; letter-spacing: -0.02em; }
        .bento-stat-label { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        @media (max-width: 768px) { .bento-cards { grid-template-columns: 1fr; } }
        [dir="rtl"] .bento-title { letter-spacing: 0; }
        [dir="rtl"] .bento-card:hover .bento-card-arrow { transform: translate(-2px,-2px); }
      `}</style>
    </section>
  );
};

export default BentoGrid;
