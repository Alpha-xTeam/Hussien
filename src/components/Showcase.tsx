import React from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../LanguageContext';
import { t } from '../i18n';
import ProjectModal from './ProjectModal';

const PROJECTS = [
  { title: 'SafeGate', desc: 'URL safety checker that scans and analyzes links to determine if they are secure or malicious. Helps protect against phishing and harmful websites.', tags: ['Next.js', 'API', 'Security'], color: '#10b981', image: '/P4.png', live: 'https://safe-gate.netlify.app/' },
  { title: 'SortX', desc: 'Desktop utility that automatically organizes your computer files. Sorts folders by type — images, videos, music, documents, and more. Clean, fast, and efficient.', tags: ['Python', 'Electron', 'Automation'], color: '#8b5cf6', image: '/P3.png', live: '#' },
  { title: 'Filex', desc: 'AI-powered academic assistant that summarizes lectures, translates content, generates academic reports, and creates exams. Streamlines the entire study workflow.', tags: ['Next.js', 'AI', 'Python'], color: '#3b82f6', image: '/P2.png', live: 'https://filex.zone.id' },
  { title: 'E-Lecture System', desc: 'A comprehensive electronic lecture management system for universities. Features include lecture scheduling, student attendance tracking, exam management, and real-time grade analytics.', tags: ['Next.js', 'TypeScript', 'PostgreSQL'], color: '#f97316', image: '/P1.png', live: 'https://it-college.zone.id' },
];

const Showcase = () => {
  const { lang } = useLang();
  const [selected, setSelected] = React.useState<typeof PROJECTS[number] | null>(null);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.showcase-header', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } });
      gsap.from('.project-card', { y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.showcase-cta', { y: 20, opacity: 0, duration: 0.5, delay: 0.4, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="showcase section-padding" id="work" ref={sectionRef}>
      <div className="container">
        <div className="showcase-header">
          <span className="showcase-tag">{t('showcase.tag', lang)}</span>
          <h2 className="showcase-title">{t('showcase.title1', lang)} <span className="showcase-title-accent">{t('showcase.title2', lang)}</span> {t('showcase.title3', lang)}</h2>
          <p className="showcase-sub">{t('showcase.desc', lang)}</p>
        </div>
        <div className="showcase-grid">
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
          {PROJECTS.map(project => (
            <div key={project.title} className="project-card" onClick={() => setSelected(project)}>
              <div className="project-card-visual" style={{ background: `linear-gradient(135deg, ${project.color}15, transparent)` }}>
                {project.image ? (
                  <img src={project.image} alt={project.title} className="project-thumb" loading="lazy" />
                ) : (
                  <div className="project-placeholder"><div className="placeholder-grid">
                    {[...Array(9)].map((_, j) => <div key={j} className="placeholder-cell" style={{ animationDelay: `${j*0.1}s` }} />)}
                  </div></div>
                )}
              </div>
              <div className="project-card-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">{project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="showcase-cta">
          <span className="showcase-cta-dot" />
          <span>{t('showcase.available', lang)}</span>
          <a href="https://t.me/hsabadi" target="_blank" className="btn-primary" style={{ textDecoration: 'none' }}>{t('showcase.hire', lang)}<ArrowUpRight size={16} style={{ marginLeft: 6 }} /></a>
        </div>
      </div>
      <style>{`
        .showcase { position: relative; }
        .showcase-header { text-align: center; max-width: 680px; margin: 0 auto 60px; }
        .showcase-tag { display: inline-block; padding: 5px 14px; border-radius: 100px; background: var(--tag-bg); border: 1px solid var(--tag-border); font-size: 0.75rem; font-weight: 500; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 16px; }
        .showcase-title { font-size: clamp(2rem,4vw,3rem); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 16px; }
        .showcase-title-accent { background: linear-gradient(135deg,var(--text-primary) 40%,rgba(var(--rgb-base),0.5)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .showcase-sub { font-size: 1rem; color: var(--text-secondary); line-height: 1.7; max-width: 600px; margin: 0 auto; }
        .showcase-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(280px,1fr)); gap: 1.25rem; }
        .project-card { border-radius: 20px; border: 1px solid rgba(var(--rgb-base),0.06); background: var(--project-card-bg); overflow: hidden; cursor: pointer; transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        .project-card:hover { transform: translateY(-6px); }
        .project-card-visual { height: 180px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(var(--rgb-base),0.04); overflow: hidden; }
        .project-thumb { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.2,0.8,0.2,1); }
        .project-card:hover .project-thumb { transform: scale(1.05); }
        .project-placeholder { width: 80%; height: 80%; display: flex; align-items: center; justify-content: center; }
        .placeholder-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; width: 100%; height: 100%; }
        .placeholder-cell { border-radius: 6px; background: rgba(var(--rgb-base),0.04); animation: cellPulse 2s ease-in-out infinite; }
        .placeholder-cell:nth-child(1), .placeholder-cell:nth-child(5), .placeholder-cell:last-child { background: rgba(var(--rgb-base),0.06); }
        @keyframes cellPulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        .project-card-body { padding: 1.5rem; }
        .project-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.02em; }
        .project-desc { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.25rem; }
        .project-tag { padding: 3px 10px; border-radius: 6px; font-size: 0.65rem; font-weight: 500; background: var(--project-tag-bg); color: var(--text-secondary); border: 1px solid rgba(var(--rgb-base),0.06); }
        .project-links { display: flex; gap: 16px; padding-top: 1rem; border-top: 1px solid rgba(var(--rgb-base),0.04); }
        .project-link { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--project-link-color); text-decoration: none; transition: color 0.2s; }
        .project-link:hover { color: var(--text-primary); }
        .showcase-cta { margin-top: 60px; display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 0.9rem; color: var(--text-secondary); }
        .showcase-cta-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success-color); box-shadow: 0 0 6px var(--success-color); animation: pulseDot 2s ease-in-out infinite; }
        @keyframes pulseDot { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (min-width: 1025px) { .showcase-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 640px) { .showcase-grid { grid-template-columns: 1fr; } }
        [dir="rtl"] .showcase-title, [dir="rtl"] .project-title { letter-spacing: 0; }
      `}</style>
    </section>
  );
};

export default Showcase;
