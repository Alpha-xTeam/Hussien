import React from 'react';
import gsap from 'gsap';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { useLang } from '../LanguageContext';
import { t } from '../i18n';

const FAQS = [
  { qKey: 'faq.q1', aKey: 'faq.a1' },
  { qKey: 'faq.q2', aKey: 'faq.a2' },
  { qKey: 'faq.q3', aKey: 'faq.a3' },
  { qKey: 'faq.q4', aKey: 'faq.a4' },
];

const FAQ = () => {
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const contentRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.faq-left, .faq-right', { y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = (i: number) => {
    const isOpen = openIndex === i;
    setOpenIndex(isOpen ? null : i);
    const content = contentRefs.current[i];
    if (content) {
      if (isOpen) gsap.to(content, { height: 0, opacity: 0, duration: 0.25, ease: 'easeInOut' });
      else gsap.fromTo(content, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.25, ease: 'easeInOut' });
    }
  };

  return (
    <section className="faq section-padding" id="faq" ref={sectionRef}>
      <div className="container">
        <div className="faq-grid">
          <div className="faq-left">
            <span className="faq-tag">{t('faq.tag', lang)}</span>
            <h2 className="faq-title">{t('faq.title1', lang)} <span className="faq-title-accent">{t('faq.title2', lang)}</span></h2>
            <p className="faq-desc">{t('faq.desc', lang)}</p>
            <a href="https://t.me/hsabadi" target="_blank" className="faq-cta"><MessageCircle size={16} />{t('faq.cta', lang)}</a>
          </div>
          <div className="faq-right">
            <div className="faq-list">
              {FAQS.map((faq, i) => (
                <div key={i} className={`faq-item${openIndex === i ? ' open' : ''}`}>
                  <button className="faq-trigger" onClick={() => toggle(i)} aria-expanded={openIndex === i}>
                    <span>{t(faq.qKey, lang)}</span>
                    <div className="faq-chevron" style={{ transform: `rotate(${openIndex === i ? 180 : 0}deg)` }}><ChevronDown size={16} /></div>
                  </button>
                  <div ref={el => { contentRefs.current[i] = el; }} className="faq-content" style={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0, overflow: 'hidden' }}>
                    <p>{t(faq.aKey, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .faq { position: relative; }
        .faq-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 5rem; align-items: flex-start; }
        .faq-tag { display: inline-block; padding: 5px 14px; border-radius: 100px; background: var(--tag-bg); border: 1px solid var(--tag-border); font-size: 0.75rem; font-weight: 500; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 16px; }
        .faq-title { font-size: clamp(1.8rem,3.5vw,2.8rem); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 16px; }
        .faq-title-accent { background: linear-gradient(135deg,var(--text-primary) 40%,rgba(var(--rgb-base),0.5)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .faq-desc { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; max-width: 400px; }
        .faq-cta { display: inline-flex; align-items: center; gap: 8px; margin-top: 24px; padding: 10px 22px; border-radius: 8px; background: var(--btn-primary-bg); color: var(--btn-primary-color); font-size: 0.85rem; font-weight: 600; text-decoration: none; transition: opacity 0.2s,transform 0.2s; }
        .faq-cta:hover { opacity: 0.9; transform: translateY(-1px); }
        .faq-list { display: flex; flex-direction: column; }
        .faq-item { border-bottom: 1px solid rgba(var(--rgb-base),0.04); }
        .faq-trigger { width: 100%; padding: 24px 0; background: none; border: none; display: flex; justify-content: space-between; align-items: center; gap: 16px; color: var(--faq-trigger-color); font-size: 1rem; font-weight: 600; cursor: pointer; text-align: left; font-family: 'Clash Display', sans-serif; transition: color 0.2s; }
        .faq-trigger:hover { color: var(--text-primary); }
        .faq-item.open .faq-trigger { color: var(--text-primary); }
        .faq-chevron { width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--chevron-border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.3s ease, border-color 0.3s, background 0.3s; }
        .faq-item.open .faq-chevron { background: var(--btn-primary-bg); color: var(--btn-primary-color); border-color: var(--btn-primary-bg); }
        .faq-content { overflow: hidden; transition: height 0.25s ease, opacity 0.25s ease; }
        .faq-content p { color: var(--text-secondary); line-height: 1.8; font-size: 0.9rem; padding-bottom: 24px; }
        @media (max-width: 1024px) { .faq-grid { grid-template-columns: 1fr; gap: 3rem; } }
        [dir="rtl"] .faq-title { letter-spacing: 0; }
        [dir="rtl"] .faq-trigger { text-align: right; font-family: var(--font-arabic); }
      `}</style>
    </section>
  );
};

export default FAQ;
