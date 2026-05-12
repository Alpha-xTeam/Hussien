import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../LanguageContext';
import { t } from '../i18n';

const STEPS = [
  { number: '01', titleKey: 'story.step1', descKey: 'story.step1Desc', accent: '#60a5fa' },
  { number: '02', titleKey: 'story.step2', descKey: 'story.step2Desc', accent: '#c084fc' },
  { number: '03', titleKey: 'story.step3', descKey: 'story.step3Desc', accent: '#4ade80' },
  { number: '04', titleKey: 'story.step4', descKey: 'story.step4Desc', accent: '#facc15' },
];

const SVG = ({ i }: { i: number }) => {
  const svgs = [
    <svg key="v0" viewBox="0 0 400 300" fill="none" className="story-svg">
      <rect x="20" y="20" width="160" height="120" rx="12" fill="rgba(var(--rgb-base),0.04)" stroke="#60a5fa33" strokeWidth="1"/>
      <rect x="36" y="36" width="60" height="8" rx="4" fill="#60a5fa99"/><rect x="36" y="52" width="80" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/><rect x="36" y="64" width="70" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/>
      <rect x="36" y="82" width="40" height="40" rx="8" fill="#60a5fa15" stroke="#60a5fa40" strokeWidth="1"/>
      <rect x="84" y="82" width="40" height="40" rx="8" fill="#60a5fa15" stroke="#60a5fa40" strokeWidth="1"/>
      <rect x="128" y="82" width="40" height="40" rx="8" fill="#60a5fa15" stroke="#60a5fa40" strokeWidth="1"/>
      <rect x="220" y="20" width="160" height="120" rx="12" fill="rgba(var(--rgb-base),0.04)" stroke="#60a5fa33" strokeWidth="1"/>
      <rect x="236" y="36" width="80" height="8" rx="4" fill="#60a5fa99"/><rect x="236" y="52" width="120" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/><rect x="236" y="62" width="100" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/><rect x="236" y="72" width="110" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/>
      <circle cx="316" cy="100" r="24" fill="#60a5fa15" stroke="#60a5fa40" strokeWidth="1"/><circle cx="316" cy="100" r="12" fill="#60a5fa20"/>
      <path d="M20 180 L380 180" stroke="rgba(var(--rgb-base),0.04)" strokeWidth="1" strokeDasharray="4 4"/>
      <rect x="20" y="200" width="170" height="80" rx="12" fill="rgba(var(--rgb-base),0.02)" stroke="#60a5fa20" strokeWidth="1"/>
      <rect x="36" y="216" width="24" height="24" rx="6" fill="#60a5fa30"/><rect x="72" y="220" width="100" height="6" rx="3" fill="rgba(var(--rgb-base),0.08)"/><rect x="72" y="232" width="80" height="4" rx="2" fill="rgba(var(--rgb-base),0.04)"/>
      <rect x="210" y="200" width="170" height="80" rx="12" fill="rgba(var(--rgb-base),0.02)" stroke="#60a5fa20" strokeWidth="1"/>
      <rect x="226" y="216" width="24" height="24" rx="6" fill="#60a5fa30"/><rect x="262" y="220" width="90" height="6" rx="3" fill="rgba(var(--rgb-base),0.08)"/><rect x="262" y="232" width="70" height="4" rx="2" fill="rgba(var(--rgb-base),0.04)"/>
    </svg>,
    <svg key="v1" viewBox="0 0 400 300" fill="none" className="story-svg">
      <rect x="40" y="10" width="320" height="210" rx="16" fill="rgba(var(--rgb-base),0.03)" stroke="#c084fc33" strokeWidth="1"/>
      <rect x="40" y="10" width="320" height="40" rx="16" fill="#c084fc10"/><circle cx="64" cy="30" r="6" fill="#c084fc40"/><circle cx="84" cy="30" r="6" fill="rgba(var(--rgb-base),0.06)"/><circle cx="104" cy="30" r="6" fill="rgba(var(--rgb-base),0.06)"/>
      <rect x="260" y="22" width="80" height="16" rx="8" fill="#c084fc40"/><rect x="60" y="66" width="120" height="12" rx="6" fill="rgba(var(--rgb-base),0.12)"/><rect x="60" y="86" width="200" height="6" rx="3" fill="rgba(var(--rgb-base),0.05)"/><rect x="60" y="98" width="180" height="6" rx="3" fill="rgba(var(--rgb-base),0.05)"/>
      <rect x="60" y="116" width="280" height="80" rx="8" fill="#c084fc08" stroke="#c084fc20" strokeWidth="1"/>
      <rect x="76" y="132" width="56" height="48" rx="6" fill="#c084fc15"/><rect x="144" y="132" width="56" height="48" rx="6" fill="#c084fc15"/><rect x="212" y="132" width="56" height="48" rx="6" fill="#c084fc15"/><rect x="280" y="132" width="44" height="48" rx="6" fill="#c084fc15"/>
      <rect x="76" y="186" width="40" height="4" rx="2" fill="rgba(var(--rgb-base),0.04)"/><rect x="144" y="186" width="40" height="4" rx="2" fill="rgba(var(--rgb-base),0.04)"/><rect x="212" y="186" width="40" height="4" rx="2" fill="rgba(var(--rgb-base),0.04)"/>
      <rect x="60" y="206" width="100" height="6" rx="3" fill="rgba(var(--rgb-base),0.04)"/>
      <rect x="40" y="230" width="320" height="60" fill="#c084fc06"/><rect x="60" y="246" width="24" height="24" rx="6" fill="#c084fc30"/>
      <rect x="96" y="250" width="100" height="6" rx="3" fill="rgba(var(--rgb-base),0.08)"/><rect x="96" y="262" width="70" height="4" rx="2" fill="rgba(var(--rgb-base),0.04)"/>
      <rect x="280" y="248" width="60" height="20" rx="6" fill="#c084fc50"/>
    </svg>,
    <svg key="v2" viewBox="0 0 400 300" fill="none" className="story-svg">
      <rect x="20" y="10" width="360" height="280" rx="12" fill="rgba(var(--rgb-base),0.03)" stroke="#4ade8033" strokeWidth="1"/>
      <rect x="20" y="10" width="360" height="36" rx="12" fill="#4ade8010"/><circle cx="44" cy="28" r="5" fill="#ef4444"/><circle cx="62" cy="28" r="5" fill="#eab308"/><circle cx="80" cy="28" r="5" fill="#4ade80"/>
      <rect x="140" y="20" width="120" height="16" rx="8" fill="#4ade8030"/><rect x="20" y="46" width="80" height="244" fill="#4ade8006"/>
      <rect x="32" y="62" width="56" height="6" rx="3" fill="#4ade8040"/><rect x="32" y="76" width="40" height="4" rx="2" fill="rgba(var(--rgb-base),0.06)"/><rect x="32" y="88" width="36" height="4" rx="2" fill="rgba(var(--rgb-base),0.06)"/>
      <rect x="32" y="108" width="56" height="6" rx="3" fill="#4ade8040"/><rect x="32" y="122" width="44" height="4" rx="2" fill="rgba(var(--rgb-base),0.06)"/><rect x="32" y="134" width="48" height="4" rx="2" fill="rgba(var(--rgb-base),0.06)"/>
      <rect x="112" y="60" width="100" height="6" rx="3" fill="#4ade8040"/><rect x="112" y="74" width="140" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/><rect x="112" y="88" width="180" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/>
      <rect x="128" y="102" width="160" height="6" rx="3" fill="#4ade8030"/><rect x="128" y="116" width="200" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/><rect x="128" y="130" width="120" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/>
      <rect x="112" y="144" width="80" height="6" rx="3" fill="#4ade8040"/><rect x="128" y="158" width="140" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/><rect x="128" y="172" width="100" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/>
      <rect x="112" y="186" width="160" height="6" rx="3" fill="#4ade8030"/><rect x="128" y="200" width="120" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/><rect x="112" y="214" width="80" height="6" rx="3" fill="#4ade8040"/>
      <rect x="128" y="228" width="200" height="6" rx="3" fill="rgba(var(--rgb-base),0.06)"/>
      <rect x="112" y="260" width="240" height="20" rx="6" fill="#4ade8010"/><rect x="120" y="268" width="80" height="4" rx="2" fill="#4ade8060"/><circle cx="216" cy="270" r="2" fill="#4ade80"/>
    </svg>,
    <svg key="v3" viewBox="0 0 400 300" fill="none" className="story-svg">
      <rect x="20" y="10" width="240" height="140" rx="12" fill="rgba(var(--rgb-base),0.03)" stroke="#facc1533" strokeWidth="1"/>
      <rect x="36" y="26" width="80" height="6" rx="3" fill="#facc1550"/><rect x="36" y="40" width="200" height="4" rx="2" fill="rgba(var(--rgb-base),0.04)"/>
      <rect x="36" y="56" width="60" height="80" rx="4" fill="#facc1508" stroke="#facc1520" strokeWidth="1"/>
      <rect x="104" y="36" width="60" height="100" rx="4" fill="#facc1508" stroke="#facc1520" strokeWidth="1"/>
      <rect x="172" y="66" width="60" height="70" rx="4" fill="#facc1508" stroke="#facc1520" strokeWidth="1"/>
      <rect x="36" y="60" width="56" height="6" rx="3" fill="#facc1530"/><rect x="104" y="40" width="56" height="6" rx="3" fill="#facc1530"/><rect x="172" y="70" width="56" height="6" rx="3" fill="#facc1530"/>
      <rect x="280" y="10" width="100" height="140" rx="12" fill="rgba(var(--rgb-base),0.03)" stroke="#facc1520" strokeWidth="1"/>
      <rect x="296" y="26" width="68" height="6" rx="3" fill="#facc1550"/><circle cx="316" cy="56" r="16" fill="#facc1508" stroke="#facc1520" strokeWidth="1"/>
      <rect x="296" y="84" width="24" height="4" rx="2" fill="rgba(var(--rgb-base),0.06)"/><rect x="296" y="94" width="40" height="4" rx="2" fill="rgba(var(--rgb-base),0.04)"/>
      <rect x="296" y="108" width="68" height="6" rx="3" fill="#facc1540"/><rect x="296" y="120" width="50" height="4" rx="2" fill="rgba(var(--rgb-base),0.04)"/>
      <rect x="20" y="166" width="360" height="50" rx="12" fill="rgba(var(--rgb-base),0.02)" stroke="#facc1515" strokeWidth="1"/>
      <rect x="36" y="178" width="80" height="6" rx="3" fill="#facc1540"/><rect x="36" y="190" width="60" height="4" rx="2" fill="rgba(var(--rgb-base),0.04)"/>
      <rect x="160" y="182" width="28" height="24" rx="6" fill="#facc1530"/><rect x="200" y="182" width="28" height="24" rx="6" fill="#facc1520"/><rect x="240" y="182" width="28" height="24" rx="6" fill="#facc1510"/><rect x="320" y="180" width="44" height="20" rx="6" fill="#facc1550"/>
      <path d="M20 240 L60 218 L100 228 L140 195 L180 205 L220 175 L260 185 L300 155 L340 165 L380 145" stroke="#facc1550" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <rect x="20" y="250" width="24" height="24" rx="6" fill="#facc1530"/><rect x="56" y="254" width="80" height="6" rx="3" fill="rgba(var(--rgb-base),0.08)"/><rect x="56" y="266" width="60" height="4" rx="2" fill="rgba(var(--rgb-base),0.04)"/>
    </svg>,
  ];
  return svgs[i] || null;
};

const ScrollStory = () => {
  const { lang } = useLang();
  const sectionRef = React.useRef<HTMLElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const stepsRef = React.useRef<(HTMLDivElement | null)[]>([]);
  const blocksRef = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const isMobile = window.innerWidth <= 900;

    if (isMobile) {
      blocksRef.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.position = 'relative';
      });
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle('active', i === 0);
      });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section, pin: true, start: 'top top', end: '+=250%', scrub: 1,
        onUpdate: self => {
          const p = self.progress;
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.min(p,1)})`;
          stepsRef.current.forEach((el, i) => {
            if (!el) return;
            const s = i / STEPS.length, e2 = (i+1) / STEPS.length;
            el.classList.toggle('active', p >= s && p < e2);
            el.classList.toggle('past', p >= e2);
          });
          blocksRef.current.forEach((el, i) => {
            if (!el) return;
            const s = i / STEPS.length, m = s + 0.6 / STEPS.length, o2 = s + 0.85 / STEPS.length, e2 = (i+1) / STEPS.length;
            let op = 0, y2 = 40;
            if (p >= s && p < m) { const t2 = (p-s)/(m-s); op = t2<0.5?2*t2*t2:-1+(4-2*t2)*t2; y2 = 40-op*40; }
            else if (p >= m && p < o2) { op = 1; y2 = 0; }
            else if (p >= o2 && p < e2) { const t2 = (p-o2)/(e2-o2); op = 1-t2; y2 = -(t2*30); }
            el.style.opacity = String(op); el.style.transform = `translateY(${y2}px)`;
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="scroll-story" ref={sectionRef}>
      <div className="story-progress-track"><div className="story-progress-fill" ref={progressRef} /></div>
      <div className="story-container">
        <div className="story-steps-col">
          {STEPS.map((step, i) => (
            <div key={step.number} className={`story-step${i===0?' active':''}`} ref={el=>{stepsRef.current[i]=el;}}>
              <div className="story-step-number">{step.number}</div>
              {i < STEPS.length-1 && <div className="story-step-line" />}
            </div>
          ))}
        </div>
        <div className="story-blocks">
          {STEPS.map((step, i) => (
            <div key={step.number} className="story-block" ref={el=>{blocksRef.current[i]=el;}} style={{opacity:i===0?1:0}}>
              <div className="story-block-visual">
                <SVG i={i} />
                <div className="story-block-glow" style={{background:`radial-gradient(circle,${step.accent}15 0%,transparent 70%)`}} />
              </div>
              <div className="story-block-info">
                <span className="story-block-tag" style={{color:step.accent,borderColor:`${step.accent}30`}}>Step {step.number}</span>
                <h2 className="story-block-title">{t(step.titleKey, lang)}</h2>
                <p className="story-block-desc">{t(step.descKey, lang)}</p>
                <div className="story-block-dots">
                  {STEPS.map((_, d) => <div key={d} className={`story-dot${d===i?' active':''}`} style={d===i?{background:step.accent}:{}} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .scroll-story { position: relative; min-height: 100vh; display: flex; align-items: center; background: var(--bg-color); overflow: hidden; }
        .story-progress-track { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--progress-track); z-index: 10; }
        .story-progress-fill { height: 100%; width: 100%; background: linear-gradient(90deg,#60a5fa,#c084fc,#4ade80,#facc15); transform-origin: left; transform: scaleX(0); }
        .story-container { width: 100%; max-width: 1100px; margin: 0 auto; padding: 60px 24px; display: grid; grid-template-columns: 60px 1fr; gap: 50px; align-items: center; }
        .story-steps-col { display: flex; flex-direction: column; align-items: center; }
        .story-step { display: flex; flex-direction: column; align-items: center; }
        .story-step-number { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--card-border); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; color: var(--text-dim); background: var(--bg-color); flex-shrink: 0; }
        .story-step.active .story-step-number { border-color: var(--text-secondary); color: var(--text-primary); box-shadow: 0 0 20px rgba(var(--rgb-base),0.05); }
        .story-step.past .story-step-number { border-color: rgba(var(--rgb-base),0.15); color: var(--text-muted); }
        .story-step-line { width: 1px; height: 50px; background: var(--border-color); }
        .story-blocks { position: relative; min-height: 400px; }
        .story-block { position: absolute; inset: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; will-change: opacity, transform; }
        .story-block-visual { position: relative; display: flex; align-items: center; justify-content: center; }
        .story-svg { width: 100%; max-width: 380px; height: auto; position: relative; z-index: 1; }
        .story-block-glow { position: absolute; width: 300px; height: 300px; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; }
        .story-block-info { display: flex; flex-direction: column; gap: 12px; }
        .story-block-tag { display: inline-flex; width: fit-content; padding: 4px 12px; border-radius: 6px; border: 1px solid; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        .story-block-title { font-size: clamp(1.5rem,3vw,2.2rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; }
        .story-block-desc { font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7; max-width: 400px; }
        .story-block-dots { display: flex; gap: 8px; margin-top: 8px; }
        .story-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(var(--rgb-base),0.1); transition: all 0.3s; }
        .story-dot.active { box-shadow: 0 0 8px currentColor; }

        @media (max-width: 900px) {
          .scroll-story { min-height: auto; padding: 60px 0; }
          .story-container { grid-template-columns: 1fr; gap: 0; padding: 0 20px; }
          .story-steps-col { display: none; }
          .story-blocks { min-height: auto; display: flex; flex-direction: column; gap: 40px; }
          .story-block { position: relative; inset: auto; display: grid; grid-template-columns: 1fr; gap: 20px; text-align: center; opacity: 1 !important; transform: none !important; }
          .story-block-visual { order: -1; }
          .story-svg { max-width: 260px; margin: 0 auto; }
          .story-block-info { align-items: center; }
          .story-block-title { font-size: 1.4rem; }
          .story-block-desc { font-size: 0.85rem; max-width: 100%; }
          .story-block-tag { margin: 0 auto; }
          .story-block-dots { justify-content: center; }
          .story-progress-track { top: 0; }
        }
        @media (max-width: 480px) { .story-blocks { gap: 30px; } .story-svg { max-width: 200px; } .story-block-title { font-size: 1.2rem; } .story-block-desc { font-size: 0.8rem; } }
      `}</style>
    </section>
  );
};

export default ScrollStory;
