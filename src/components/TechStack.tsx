import React from 'react';
import gsap from 'gsap';
import { useLang } from '../LanguageContext';
import { t } from '../i18n';

const TECH = [
  { name: 'React', active: true, svg: '<svg viewBox="-11.5 -10.232 23 20.463" width="22" height="22" fill="currentColor"><circle r="2.05" fill="currentColor"/><g stroke="currentColor" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>' },
  { name: 'Next.js', svg: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727z"/><path d="M20.4 7.2h-1.6v9.6h1.6V7.2z"/></svg>' },
  { name: 'TypeScript', svg: '<svg viewBox="0 0 24 24" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6"/><path fill="#FFF" d="M13.5 11.5h-3V9H19v2.5h-3v9h-2.5z"/><path fill="#FFF" d="M5.25 9.5h3.5v1.75h-1.25V19H6.5v-7.75H5.25V9.5z"/></svg>' },
  { name: 'JavaScript', svg: '<svg viewBox="0 0 24 24" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E"/><path d="M15.5 17.5c.3.5.8.9 1.7.9.7 0 1.2-.4 1.2-.9 0-.6-.5-.8-1.3-1.2l-.4-.2c-1.2-.5-2-1.1-2-2.4 0-1.2.9-2.1 2.4-2.1 1 0 1.8.4 2.3 1.3l-1.3.8c-.3-.5-.6-.7-1.1-.7-.5 0-.8.3-.8.7 0 .5.3.7 1.1 1l.4.2c1.4.6 2.1 1.2 2.1 2.5 0 1.4-1.1 2.2-2.7 2.2-1.5 0-2.5-.7-3-1.7l1.4-.8zM9.5 9.5h2.5v6.8c0 1.4-.8 2.1-2.1 2.1-.7 0-1.3-.2-1.7-.4l.3-1.3c.3.2.7.3 1.1.3.5 0 .8-.3.8-1V9.5z"/></svg>' },
  { name: 'Tailwind', svg: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 6C9.3 6 7.4 7.5 6.2 10.5c1.2-1.5 2.6-2.1 4.2-1.7.9.2 1.6.9 2.3 1.6 1.2 1.2 2.6 2.6 5.3 2.6 2.7 0 4.6-1.5 5.8-4.5-1.2 1.5-2.6 2.1-4.2 1.7-.9-.2-1.6-.9-2.3-1.6C14.1 6.9 12.7 5.5 10 5.5c-2.7 0-4.6 1.5-5.8 4.5 1.2-1.5 2.6-2.1 4.2-1.7.9.2 1.6.9 2.3 1.6 1.2 1.2 2.6 2.6 5.3 2.6 2.7 0 4.6-1.5 5.8-4.5-1.2 1.5-2.6 2.1-4.2 1.7-.9-.2-1.6-.9-2.3-1.6C16.1 6.9 14.7 5.5 12 5.5z" fill="#38BDF8"/></svg>' },
  { name: 'Node.js', svg: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M11.998 24c-.473 0-.95-.122-1.374-.367l-4.33-2.556c-.667-.372-.34-.504-.121-.58.867-.302 1.043-.37 1.966-.897.09-.05.205-.032.297.022l3.327 1.973c.113.064.27.064.373 0l8.722-5.033c.112-.064.182-.188.182-.317V7.755c0-.128-.07-.253-.182-.317L13.13 2.405c-.112-.064-.26-.064-.373 0L4.024 7.438c-.113.064-.182.188-.182.317v10.066c0 .128.07.253.182.317l2.394 1.382c1.3.65 2.096-.116 2.096-.885V8.548c0-.187.15-.34.336-.34h1.138c.184 0 .336.153.336.34v10.092c0 1.735-.946 2.73-2.594 2.73-.506 0-.906 0-2.046-.557l-2.332-1.346c-.578-.331-.947-.97-.947-1.64V7.755c0-.67.37-1.31.947-1.64l8.722-5.034c.57-.33 1.332-.33 1.902 0l8.722 5.034c.578.33.947.97.947 1.64v10.066c0 .67-.37 1.31-.947 1.64l-8.722 5.033c-.404.23-.863.352-1.327.352z" fill="#68A063"/><path d="M14.025 16.78c-2.798 0-3.394-1.035-3.394-1.902 0-.186.152-.337.34-.337h1.16c.168 0 .306.118.335.283.16.83.647 1.244 1.559 1.244.72 0 1.187-.33 1.187-.882 0-.587-.383-.83-1.208-1.035l-.837-.208c-1.128-.278-2.003-.86-2.003-2.145 0-1.273.986-2.14 2.494-2.14 1.86 0 2.606.876 2.687 1.73.04.18-.115.347-.297.347h-1.17c-.148 0-.278-.1-.32-.24-.19-.718-.67-.962-1.3-.962-.683 0-1.047.33-1.047.79 0 .512.34.716 1.058.892l.72.177c1.213.294 2.115.83 2.115 2.192 0 1.372-1.093 2.205-2.822 2.205z" fill="#68A063"/></svg>' },
  { name: 'Git', svg: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.38-.07 1.89.44.514.515.658 1.258.436 1.903l2.66 2.66c.643-.224 1.387-.08 1.9.436.72.72.72 1.883 0 2.604-.72.72-1.883.72-2.603 0-.54-.54-.674-1.328-.408-1.978l-2.48-2.48v6.527c.625.36 1.035 1.03 1.035 1.78 0 1.128-.914 2.044-2.044 2.044s-2.045-.916-2.045-2.044c0-.746.408-1.41 1.035-1.777V8.63c-.626-.37-1.034-1.03-1.034-1.78 0-.22.04-.43.11-.627L7.555 5.33v9.808c.627.37 1.035 1.03 1.035 1.78 0 1.13-.915 2.045-2.046 2.045s-2.044-.916-2.044-2.045c0-.745.407-1.408 1.03-1.776V5.244c-.604-.36-1.01-1.02-1.01-1.76 0-1.13.914-2.045 2.045-2.045.618 0 1.164.276 1.532.706l2.69-2.69c.602-.604.602-1.583 0-2.186L9.88.452 9.875.447 23.545 14.12c.603.6.603 1.582 0 2.186L13.066 26.79c-.602.602-1.58.602-2.185 0L.452 16.215c-.6-.602-.6-1.58 0-2.185l3.063-3.063c.002 0-.953 1.546 0 0L7.44 7.052" fill="#DE4C36"/></svg>' },
  { name: 'Figma', svg: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 8.462h-4.588c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98z" fill="#0ACF83"/><path d="M12.735 7.51V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49h-4.588z" fill="#A259FF" opacity=".6"/><path d="M8.147 15.972a4.49 4.49 0 1 1 8.98 0 4.49 4.49 0 0 1-8.98 0z" fill="#F24E1E"/><path d="M3.656 24a4.49 4.49 0 0 1 0-8.98H8.15v4.49a4.49 4.49 0 0 1-4.49 4.49H3.657z" fill="#FF7262"/><path d="M3.656 15.02a4.49 4.49 0 0 0 0 8.98 4.49 4.49 0 0 0 0-8.98z" fill="#0ACF83"/></svg>' },
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
        .tech-track { display: flex; gap: 12px; width: fit-content; animation: marqueeScroll 25s linear infinite; }
        @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-400px); } }
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
