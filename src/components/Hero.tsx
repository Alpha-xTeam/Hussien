import React from 'react';
import gsap from 'gsap';
import { useLang } from '../LanguageContext';
import { t } from '../i18n';

const Hero = () => {
  const { lang } = useLang();
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('.anim-up');
    gsap.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' });
    gsap.fromTo(el.querySelector('.profile-card'), { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.25, ease: 'power3.out' });
  }, []);

  return (
    <section className="hero" id="home" ref={rootRef}>
      <div className="hero-bg-layer" />
      <div className="hero-grid" />
      <div className="hero-orbs">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>
      <div className="hero-particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, width: `${2+Math.random()*4}px`, height: `${2+Math.random()*4}px`, animationDelay: `${Math.random()*6}s`, animationDuration: `${6+Math.random()*8}s` }} />
        ))}
      </div>
      <div className="container hero-content">
        <div className="hero-main-layout">
          <div className="hero-text-content">
            <div><span className="hero-tag anim-up"><span className="hero-tag-dot" />{t('hero.tag', lang)}</span></div>
            <h1 className="hero-title anim-up">
              <span className="hero-title-line">{t('hero.title1', lang)}</span>
              <span className="hero-title-line hero-title-accent">{t('hero.title2', lang)}</span>
              <span className="hero-title-line">{t('hero.title3', lang)}</span>
            </h1>
            <p className="hero-desc anim-up">{t('hero.desc', lang)}</p>
            <div className="hero-actions anim-up">
              <a href="#services" className="btn-primary">{t('hero.cta', lang)}</a>
              <a href="https://github.com/Alpha-xTeam" target="_blank" className="hero-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                {t('hero.view', lang)}
              </a>
            </div>
          </div>
          <div className="hero-profile-side">
            <div className="profile-card">
              <div className="profile-img-wrap">
                <div className="profile-img-border" />
                <img src="/Hussien.png" alt="Hussien" className="profile-img" loading="eager" />
              </div>
              <div className="profile-body">
                <div><h3 className="profile-name">Hussien</h3><span className="profile-role">{t('hero.role', lang)}</span></div>
                <div className="profile-status"><span className="profile-dot" /><span>{t('hero.available', lang)}</span></div>
              </div>
              <div className="profile-stats">
                <div className="stat-item"><span className="stat-value">15+</span><span className="stat-label">{t('hero.projects', lang)}</span></div>
                <div className="stat-divider" />
                <div className="stat-item"><span className="stat-value">3+</span><span className="stat-label">{t('hero.years', lang)}</span></div>
                <div className="stat-divider" />
                <div className="stat-item"><span className="stat-value">24/7</span><span className="stat-label">{t('hero.support', lang)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .hero { position: relative; display: flex; align-items: center; min-height: 100vh; padding-top: 120px; padding-bottom: 0; overflow: hidden; background: var(--hero-bg); }
        .hero-bg-layer { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% -20%, rgba(var(--rgb-base),0.03) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(var(--rgb-base),0.02) 0%, transparent 60%); z-index: 0; }
        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(var(--rgb-base),0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--rgb-base),0.015) 1px, transparent 1px); background-size: 60px 60px; z-index: 0; mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, #000 30%, transparent 70%); }
        .hero-orbs { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4; }
        .orb-1 { width: 400px; height: 400px; background: rgba(var(--rgb-base),0.04); top: -10%; right: -5%; animation: orbFloat 20s ease-in-out infinite; }
        .orb-2 { width: 300px; height: 300px; background: rgba(var(--rgb-base),0.03); bottom: 10%; left: -5%; animation: orbFloat 25s ease-in-out infinite reverse; }
        .orb-3 { width: 200px; height: 200px; background: rgba(var(--rgb-base),0.03); top: 40%; left: 50%; animation: orbFloat 18s ease-in-out infinite 2s; }
        @keyframes orbFloat { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-30px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.9); } }
        .hero-particles { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .particle { position: absolute; border-radius: 50%; background: var(--star-color); animation: particleFloat linear infinite; }
        @keyframes particleFloat { 0% { transform: translateY(0) scale(1); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(-120px) scale(0); opacity: 0; } }
        .hero-content { position: relative; z-index: 2; width: 100%; }
        .hero-main-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: center; }
        .hero-text-content { display: flex; flex-direction: column; gap: 8px; }
        .hero-tag { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: var(--tag-bg); border: 1px solid var(--tag-border); border-radius: 100px; font-size: 0.78rem; font-weight: 500; color: var(--text-secondary); letter-spacing: 0.03em; margin-bottom: 12px; width: fit-content; }
        .hero-tag-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--success-color); box-shadow: 0 0 8px var(--success-color); animation: pulseDot 2s ease-in-out infinite; }
        @keyframes pulseDot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        .hero-title { display: flex; flex-direction: column; gap: 2px; font-size: clamp(2.8rem,7vw,4.5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.03em; margin: 0; }
        .hero-title-line { display: block; }
        .hero-title-accent { background: linear-gradient(135deg,var(--text-primary) 40%,rgba(var(--rgb-base),0.5) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-desc { margin-top: 20px; max-width: 540px; font-size: 1.05rem; color: var(--hero-desc); line-height: 1.7; }
        .hero-actions { display: flex; align-items: center; gap: 16px; margin-top: 32px; }
        .hero-link { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 8px; color: var(--text-secondary); text-decoration: none; font-size: 0.85rem; font-weight: 500; transition: color 0.2s,background 0.2s; }
        .hero-link:hover { color: var(--text-primary); background: rgba(var(--rgb-base),0.04); }
        .hero-profile-side { position: relative; display: flex; justify-content: center; align-items: center; }
        .profile-card { width: 320px; background: var(--profile-card-bg); border: 1px solid var(--profile-card-border); border-radius: 20px; overflow: hidden; position: relative; }
        .profile-card::before { content: ''; position: absolute; inset: 0; border-radius: 20px; padding: 1px; background: linear-gradient(135deg,rgba(var(--rgb-base),0.1),transparent 40%,transparent 60%,rgba(var(--rgb-base),0.05)); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; }
        .profile-img-wrap { position: relative; width: 100%; aspect-ratio: 1; overflow: hidden; }
        .profile-img-border { position: absolute; inset: 0; background: linear-gradient(135deg,rgba(var(--rgb-base),0.05) 0%,transparent 50%); z-index: 1; }
        .profile-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.2,0.8,0.2,1); }
        .profile-card:hover .profile-img { transform: scale(1.05); }
        .profile-body { padding: 20px 24px; display: flex; flex-direction: column; gap: 12px; }
        .profile-name { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; }
        .profile-role { font-size: 0.82rem; color: var(--profile-role-color); display: block; margin-top: 2px; }
        .profile-status { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: var(--success-color); font-weight: 500; }
        .profile-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success-color); box-shadow: 0 0 6px var(--success-color); animation: pulseDot 2s ease-in-out infinite; }
        .profile-stats { display: flex; align-items: center; justify-content: space-around; padding: 16px 24px; border-top: 1px solid rgba(var(--rgb-base),0.05); }
        .stat-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .stat-value { font-size: 0.95rem; font-weight: 700; }
        .stat-label { font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .stat-divider { width: 1px; height: 30px; background: rgba(var(--rgb-base),0.06); }
        .anim-up { opacity: 0; }
        @media (max-width: 992px) { .hero-main-layout { grid-template-columns: 1fr; gap: 3rem; } .hero-text-content { align-items: center; text-align: center; } .hero-tag { margin: 0 auto 12px; } .hero-desc { max-width: 100%; } .hero-actions { justify-content: center; } .hero-profile-side { order: -1; } .profile-card { width: 280px; } }
        [dir="rtl"] .hero-title { letter-spacing: 0; }
        [dir="rtl"] .hero-tag { letter-spacing: 0; }
      `}</style>
    </section>
  );
};

export default Hero;
