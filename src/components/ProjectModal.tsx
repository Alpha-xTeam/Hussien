import React from 'react';
import { X, ExternalLink, Calendar, Tag } from 'lucide-react';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  color: string;
  image?: string;
  live: string;
}

const ProjectModal = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  React.useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  React.useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {project.image && (
          <div className="modal-image-section">
            <img src={project.image} alt={project.title} className="modal-image" />
            <div className="modal-image-gradient" />
          </div>
        )}

        <div className="modal-body">
          <div className="modal-tags">
            {project.tags.map(tag => (
              <span key={tag} className="modal-tag">{tag}</span>
            ))}
          </div>

          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-desc">{project.desc}</p>

          <div className="modal-meta">
            <div className="modal-meta-item">
              <Calendar size={14} />
              <span>2025</span>
            </div>
            <div className="modal-meta-item">
              <Tag size={14} />
              <span>{project.tags[0]}</span>
            </div>
          </div>

          <a href={project.live} target="_blank" className="modal-cta">
            <ExternalLink size={16} />
            Visit Live Project
          </a>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(30px) saturate(1.2);
          -webkit-backdrop-filter: blur(30px) saturate(1.2);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-content {
          position: relative;
          width: 100%;
          max-width: 820px;
          max-height: 88vh;
          background: var(--bg-color);
          border: 1px solid rgba(var(--rgb-base),0.06);
          border-radius: 28px;
          overflow: hidden;
          overflow-y: auto;
          animation: scaleIn 0.35s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 40px 120px rgba(0,0,0,0.3);
        }
        @keyframes scaleIn {
          from { transform: scale(0.92) translateY(10px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }

        .modal-close {
          position: absolute; top: 16px; right: 16px; z-index: 5;
          width: 38px; height: 38px; border-radius: 12px;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          backdrop-filter: blur(10px);
        }
        .modal-close:hover { background: rgba(0,0,0,0.7); }

        .modal-image-section {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: rgba(var(--rgb-base),0.02);
          display: flex; align-items: center; justify-content: center;
        }
        .modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .modal-content:hover .modal-image { transform: scale(1.02); }
        .modal-image-gradient {
          position: absolute; bottom: 0; left: 0; right: 0; height: 50%;
          background: linear-gradient(to top, var(--bg-color), transparent);
          pointer-events: none;
        }

        .modal-body {
          padding: 36px 40px 40px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .modal-tag {
          padding: 4px 12px; border-radius: 8px;
          background: rgba(var(--rgb-base),0.04);
          border: 1px solid rgba(var(--rgb-base),0.06);
          font-size: 0.7rem; font-weight: 500;
          color: var(--text-secondary);
          transition: background 0.2s;
        }
        .modal-tag:hover { background: rgba(var(--rgb-base),0.08); }

        .modal-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .modal-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .modal-meta {
          display: flex;
          gap: 24px;
          padding: 16px 0;
          border-top: 1px solid rgba(var(--rgb-base),0.04);
          border-bottom: 1px solid rgba(var(--rgb-base),0.04);
        }
        .modal-meta-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.8rem; color: var(--text-secondary);
        }
        .modal-meta-item svg { opacity: 0.4; }

        .modal-cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px; border-radius: 980px;
          background: var(--btn-primary-bg); color: var(--btn-primary-color);
          font-weight: 600; font-size: 0.9rem; text-decoration: none;
          width: fit-content; transition: all 0.2s;
          align-self: flex-start;
          margin-top: 4px;
        }
        .modal-cta:hover { opacity: 0.88; transform: translateY(-1px); }

        @media (max-width: 768px) {
          .modal-overlay { padding: 12px; align-items: flex-end; }
          .modal-content { max-height: 90vh; border-radius: 20px; }
          .modal-image-section { aspect-ratio: 4/3; }
          .modal-body { padding: 24px 20px 28px; }
          .modal-title { font-size: 1.3rem; }
          .modal-desc { font-size: 0.85rem; }
          .modal-cta { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
