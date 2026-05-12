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
      <div className="hero-planet">
        <div className="planet-core" />
        <div className="planet-ring ring-1" />
        <div className="planet-ring ring-2" />
        <div className="planet-ring ring-3" />
        <div className="planet-glow" />
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
                <img src="/Hussien.png" alt="Hussien" className="profile-img" loading="eager" />
              </div>
              <div className="profile-body">
                <div><h3 className="profile-name">Hussien</h3><span className="profile-role">{t('hero.role', lang)}</span></div>
                <div className="profile-status"><span className="profile-dot" /><span>{t('hero.available', lang)}</span></div>
              </div>
              <div className="profile-stats">
                <div className="stat-item"><span className="stat-value">3</span><span className="stat-label">{t('hero.projects', lang)}</span></div>
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
        .hero-bg-layer { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 50% at 50% -15%, rgba(var(--rgb-base),0.025) 0%, transparent 70%); z-index: 0; }
        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(var(--rgb-base),0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--rgb-base),0.012) 1px, transparent 1px); background-size: 80px 80px; z-index: 0; mask-image: radial-gradient(ellipse 70% 45% at 50% 50%, #000 25%, transparent 75%); }
        .hero-orbs { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.3; }
        .orb-1 { width: 500px; height: 500px; background: rgba(var(--rgb-base),0.03); top: -20%; right: -10%; animation: orbFloat 25s ease-in-out infinite; }
        .orb-2 { width: 350px; height: 350px; background: rgba(var(--rgb-base),0.02); bottom: 5%; left: -10%; animation: orbFloat 30s ease-in-out infinite reverse; }
        .orb-3 { display: none; }
        @keyframes orbFloat { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-40px) scale(1.05); } }
        .hero-particles { display: none; }

        /* Planet */
        .hero-planet {
          position: absolute;
          width: 700px;
          height: 700px;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
          opacity: 0.6;
        }
        .planet-core {
          position: absolute;
          width: 80px;
          height: 80px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle at 40% 35%, rgba(var(--rgb-base),0.2), rgba(var(--rgb-base),0.04));
          border: 1px solid rgba(var(--rgb-base),0.12);
          box-shadow: 0 0 80px rgba(var(--rgb-base),0.08);
        }
        .planet-core::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          top: 30%;
          left: 35%;
          border-radius: 50%;
          background: rgba(var(--rgb-base),0.15);
          filter: blur(4px);
        }
        .planet-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(var(--rgb-base),0.1);
          transform: translate(-50%, -50%) rotateX(72deg);
          animation: ringRotate 30s linear infinite;
        }
        .ring-1 { width: 200px; height: 80px; border-width: 1.5px; }
        .ring-2 { width: 350px; height: 140px; animation-duration: 40s; animation-direction: reverse; border-color: rgba(var(--rgb-base),0.08); }
        .ring-3 { width: 500px; height: 200px; animation-duration: 50s; border-style: dashed; border-color: rgba(var(--rgb-base),0.06); }
        .planet-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(var(--rgb-base),0.05) 0%, transparent 50%);
          filter: blur(80px);
        }
        @keyframes ringRotate {
          from { transform: translate(-50%, -50%) rotateX(72deg) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotateX(72deg) rotate(360deg); }
        }

        @media (max-width: 768px) {
          .hero-planet { width: 400px; height: 400px; left: 50%; top: 25%; opacity: 0.25; }
          .planet-core { width: 40px; height: 40px; }
          .ring-1 { width: 120px; height: 50px; }
          .ring-2 { width: 200px; height: 80px; }
          .ring-3 { width: 280px; height: 110px; }
          .planet-glow { width: 300px; height: 300px; }
        }
        .hero-content { position: relative; z-index: 2; width: 100%; }
        .hero-main-layout { display: grid; grid-template-columns: 1.1fr 1fr; gap: 5rem; align-items: center; }
        .hero-text-content { display: flex; flex-direction: column; gap: 6px; }
        .hero-tag { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: var(--tag-bg); border: 1px solid var(--tag-border); border-radius: 980px; font-size: 0.78rem; font-weight: 500; color: var(--text-secondary); letter-spacing: 0.03em; margin-bottom: 16px; width: fit-content; }
        .hero-tag-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--success-color); animation: pulseDot 2s ease-in-out infinite; }
        @keyframes pulseDot { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .hero-title { display: flex; flex-direction: column; gap: 4px; font-size: clamp(2.8rem,7vw,4.5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.03em; margin: 0; }
        .hero-title-line { display: block; }
        .hero-title-accent { background: linear-gradient(180deg,var(--text-primary) 50%,rgba(var(--rgb-base),0.5)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-desc { margin-top: 24px; max-width: 500px; font-size: 1.05rem; color: var(--hero-desc); line-height: 1.6; }
        .hero-actions { display: flex; align-items: center; gap: 16px; margin-top: 36px; }
        .hero-link { display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; border-radius: 980px; color: var(--text-secondary); text-decoration: none; font-size: 0.85rem; font-weight: 500; transition: color 0.2s,background 0.2s; }
        .hero-link:hover { color: var(--text-primary); background: rgba(var(--rgb-base),0.03); }
        .hero-profile-side { position: relative; display: flex; justify-content: center; align-items: center; }
        .profile-card { width: 320px; background: var(--profile-card-bg); border: 1px solid var(--profile-card-border); border-radius: 24px; overflow: hidden; position: relative; }
        .profile-img-wrap { position: relative; width: 100%; aspect-ratio: 1; overflow: hidden; }
        .profile-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.2,0.8,0.2,1); }
        .profile-card:hover .profile-img { transform: scale(1.03); }
        .profile-body { padding: 24px; display: flex; flex-direction: column; gap: 12px; }
        .profile-name { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; }
        .profile-role { font-size: 0.82rem; color: var(--profile-role-color); display: block; margin-top: 2px; }
        .profile-status { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: var(--success-color); font-weight: 500; }
        .profile-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success-color); animation: pulseDot 2s ease-in-out infinite; }
        .profile-stats { display: flex; align-items: center; justify-content: space-around; padding: 20px 24px; border-top: 1px solid rgba(var(--rgb-base),0.05); }
        .stat-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .stat-value { font-size: 1rem; font-weight: 700; }
        .stat-label { font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .stat-divider { width: 1px; height: 28px; background: rgba(var(--rgb-base),0.06); }
        .anim-up { opacity: 0; }
        @media (max-width: 992px) { .hero-main-layout { grid-template-columns: 1fr; gap: 3rem; } .hero-text-content { align-items: center; text-align: center; } .hero-tag { margin: 0 auto 16px; } .hero-desc { max-width: 100%; } .hero-actions { justify-content: center; } .hero-profile-side { order: -1; } .profile-card { width: 280px; } .orb-1, .orb-2 { opacity: 0.15; } }
        [dir="rtl"] .hero-title, [dir="rtl"] .hero-tag { letter-spacing: 0; }
      `}</style>
    </section>
  );
};

export default Hero;
