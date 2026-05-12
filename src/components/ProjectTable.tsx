import React from 'react';
import gsap from 'gsap';
import { FolderOpen, ArrowUpRight } from 'lucide-react';
import { useLang } from '../LanguageContext';
import { t } from '../i18n';

const PROJECTS = [
  { name: 'E-Lecture System', stack: 'Next.js, TypeScript, PostgreSQL', year: '2025', type: 'Full Stack' },
  { name: 'E-Commerce Platform', stack: 'Next.js, Stripe, Tailwind', year: '2025', type: 'Full Stack' },
  { name: 'Real-Time Chat App', stack: 'React, Socket.io, Node.js', year: '2025', type: 'Web App' },
  { name: 'Agency Landing Page', stack: 'Next.js, Framer Motion', year: '2024', type: 'Frontend' },
  { name: 'Dashboard Analytics', stack: 'React, D3.js, TypeScript', year: '2024', type: 'Frontend' },
  { name: 'API Service Layer', stack: 'Node.js, PostgreSQL, Redis', year: '2024', type: 'Backend' },
];

const ProjectTable = () => {
  const { lang } = useLang();
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.ptable-content', { x: -30, opacity: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } });
      gsap.from('.ptable-card', { x: 30, opacity: 0, duration: 0.6, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } });
      gsap.from('.ptable-table tbody tr', { y: 15, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ptable section-padding" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="ptable-grid">
          <div className="ptable-content">
            <span className="ptable-tag">{t('ptable.tag', lang)}</span>
            <h2 className="ptable-title">{t('ptable.title', lang)} <span className="ptable-title-accent">{t('ptable.titleAccent', lang)}</span></h2>
            <p className="ptable-desc">{t('ptable.desc', lang)}</p>
            <div className="ptable-stats">
              <div className="ptable-stat"><span className="ptable-stat-value">15+</span><span className="ptable-stat-label">{t('showcase.statProjects', lang)}</span></div>
              <div className="ptable-stat"><span className="ptable-stat-value">12</span><span className="ptable-stat-label">{t('showcase.statHappy', lang)}</span></div>
            </div>
            <a href="https://github.com/Alpha-xTeam" target="_blank" className="ptable-cta">{t('ptable.cta', lang)}<ArrowUpRight size={14} /></a>
          </div>
          <div className="ptable-card">
            <div className="ptable-card-header"><FolderOpen size={14} /><span>{t('ptable.header', lang)}</span><span className="ptable-card-badge">{t('ptable.live', lang)}</span></div>
            <table className="ptable-table">
              <thead><tr><th>{t('ptable.colProject', lang)}</th><th>{t('ptable.colStack', lang)}</th><th>{t('ptable.colYear', lang)}</th><th>{t('ptable.colType', lang)}</th></tr></thead>
              <tbody>{PROJECTS.map(item => (
                <tr key={item.name}>
                  <td><div className="ptable-pool"><div className="ptable-dot" />{item.name}</div></td>
                  <td className="ptable-stack">{item.stack}</td><td>{item.year}</td>
                  <td><span className="ptable-type">{item.type}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
      <style>{`
        .ptable { position: relative; }
        .ptable-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem; align-items: center; }
        .ptable-tag { display: inline-block; padding: 5px 14px; border-radius: 100px; background: var(--tag-bg); border: 1px solid var(--tag-border); font-size: 0.75rem; font-weight: 500; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 16px; }
        .ptable-title { font-size: clamp(1.8rem,3.5vw,2.8rem); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 16px; }
        .ptable-title-accent { background: linear-gradient(135deg,var(--text-primary) 40%,rgba(var(--rgb-base),0.5)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ptable-desc { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; max-width: 480px; }
        .ptable-stats { display: flex; gap: 32px; margin-top: 28px; }
        .ptable-stat { display: flex; flex-direction: column; gap: 2px; }
        .ptable-stat-value { font-size: 1.3rem; font-weight: 700; letter-spacing: -0.02em; }
        .ptable-stat-label { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .ptable-cta { display: inline-flex; align-items: center; gap: 8px; margin-top: 28px; padding: 10px 22px; border-radius: 8px; background: var(--btn-primary-bg); color: var(--btn-primary-color); font-size: 0.85rem; font-weight: 600; text-decoration: none; transition: opacity 0.2s,transform 0.2s; }
        .ptable-cta:hover { opacity: 0.9; transform: translateY(-1px); }
        .ptable-card { padding: 1.5rem; border-radius: 20px; border: 1px solid rgba(var(--rgb-base),0.06); background: var(--project-card-bg); }
        .ptable-card-header { display: flex; align-items: center; gap: 8px; font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(var(--rgb-base),0.04); }
        .ptable-card-badge { margin-left: auto; padding: 2px 8px; border-radius: 4px; background: rgba(var(--success-color),0.1); color: var(--success-color); font-size: 0.65rem; font-weight: 600; }
        .ptable-table { width: 100%; border-collapse: collapse; }
        .ptable-table th { padding: 0 0 12px 0; font-size: 0.7rem; font-weight: 500; color: var(--table-header); text-transform: uppercase; letter-spacing: 0.05em; text-align: left; }
        .ptable-table td { padding: 14px 0; border-bottom: 1px solid rgba(var(--rgb-base),0.03); font-size: 0.85rem; font-weight: 500; }
        .ptable-table tbody tr:last-child td { border-bottom: none; }
        .ptable-pool { display: flex; align-items: center; gap: 10px; }
        .ptable-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(var(--rgb-base),0.2); flex-shrink: 0; }
        .ptable-stack { color: var(--text-secondary); font-size: 0.8rem; }
        .ptable-type { padding: 2px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 600; background: rgba(var(--rgb-base),0.04); color: var(--text-secondary); }
        @media (max-width: 968px) { .ptable-grid { grid-template-columns: 1fr; gap: 3rem; } .ptable-content { order: 1; } }
        [dir="rtl"] .ptable-title { letter-spacing: 0; }
        [dir="rtl"] .ptable-table th { text-align: right; }
      `}</style>
    </section>
  );
};

export default ProjectTable;
