import { Send, ArrowUpRight } from 'lucide-react';
import { useLang } from '../LanguageContext';
import { t } from '../i18n';

const year = new Date().getFullYear();

const Footer = () => {
  const { lang } = useLang();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <div className="footer-cta-glow" />
          <div className="footer-cta-content">
            <h2 className="footer-cta-title">{t('footer.title', lang)} <span className="footer-cta-accent">{t('footer.titleAccent', lang)}</span></h2>
            <p className="footer-cta-desc">{t('footer.desc', lang)}</p>
            <form className="footer-cta-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder={t('footer.placeholder', lang)} required />
              <button type="submit" className="footer-cta-btn">{t('footer.subscribe', lang)}<ArrowUpRight size={14} /></button>
            </form>
          </div>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-mark">H</span>
              <span className="footer-logo-text">Hussien</span>
              <span className="footer-logo-badge">Alpha Tech</span>
            </div>
            <p className="footer-brand-desc">{t('footer.brandDesc', lang)}</p>
          </div>
          {[
            { title: 'footer.sections', links: [
              { labelKey: 'nav.home', href: '#home' },
              { labelKey: 'nav.services', href: '#services' },
              { labelKey: 'nav.work', href: '#work' },
              { labelKey: 'nav.faq', href: '#faq' },
            ]},
            { title: 'footer.social', links: [
              { labelKey: 'Instagram', href: 'https://instagram.com/it.hussien', external: true },
              { labelKey: 'Telegram', href: 'https://t.me/hsabadi', external: true },
              { labelKey: 'TikTok', href: 'https://tiktok.com/@it.hussien0', external: true },
              { labelKey: 'GitHub', href: 'https://github.com/Alpha-xTeam', external: true },
            ]},
            { title: 'footer.support', links: [
              { labelKey: 'footer.faqs', href: '#faq' },
              { labelKey: 'footer.contact', href: 'https://t.me/hsabadi', external: true },
            ]},
            { title: 'footer.alphaTech', links: [
              { labelKey: 'footer.projects', href: 'https://github.com/Alpha-xTeam', external: true },
              { labelKey: 'footer.about', href: '#home' },
            ]},
          ].map(col => (
            <div key={col.title} className="footer-col">
              <h4 className="footer-col-title">{t(col.title, lang)}</h4>
              {col.links.map(link => (
                <a key={link.labelKey} href={link.href} target={link.external ? '_blank' : undefined} className="footer-link">{t(link.labelKey, lang)}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">{t('footer.copyright', lang).replace('{year}', String(year))}</p>
          <div className="footer-social">
            <a href="https://github.com/Alpha-xTeam" target="_blank" rel="noreferrer" aria-label="GitHub"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>
            <a href="https://instagram.com/it.hussien" target="_blank" rel="noreferrer" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
            <a href="https://t.me/hsabadi" target="_blank" rel="noreferrer" aria-label="Telegram"><Send size={16} /></a>
            <a href="https://tiktok.com/@it.hussien0" target="_blank" rel="noreferrer" aria-label="TikTok"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>
          </div>
          <div className="footer-legal">
            <a href="#">{t('footer.privacy', lang)}</a>
            <a href="#">{t('footer.terms', lang)}</a>
          </div>
        </div>
      </div>
      <style>{`
        .footer { padding: 100px 0 40px; border-top: 1px solid rgba(var(--rgb-base),0.04); background: var(--bg-color); }
        .footer-cta { position: relative; padding: 3rem; border-radius: 20px; border: 1px solid rgba(var(--rgb-base),0.06); background: rgba(var(--rgb-base),0.02); margin-bottom: 80px; overflow: hidden; text-align: center; }
        .footer-cta-glow { position: absolute; top: 50%; left: 50%; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(var(--rgb-base),0.03) 0%, transparent 70%); transform: translate(-50%,-50%); }
        .footer-cta-content { position: relative; z-index: 1; max-width: 500px; margin: 0 auto; }
        .footer-cta-title { font-size: clamp(1.5rem,3vw,2rem); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 12px; }
        .footer-cta-accent { background: linear-gradient(135deg,var(--text-primary) 40%,rgba(var(--rgb-base),0.5)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .footer-cta-desc { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 24px; }
        .footer-cta-form { display: flex; gap: 8px; max-width: 400px; margin: 0 auto; }
        .footer-cta-form input { flex: 1; padding: 10px 16px; border-radius: 8px; border: 1px solid rgba(var(--rgb-base),0.08); background: rgba(var(--rgb-base),0.03); color: var(--text-primary); font-family: inherit; font-size: 0.85rem; outline: none; }
        .footer-cta-form input::placeholder { color: rgba(var(--rgb-base),0.2); }
        .footer-cta-btn { display: flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: 8px; border: none; background: var(--btn-primary-bg); color: var(--btn-primary-color); font-weight: 600; font-size: 0.85rem; cursor: pointer; font-family: inherit; }
        .footer-cta-btn:hover { opacity: 0.9; }
        .footer-grid { display: grid; grid-template-columns: 1.8fr repeat(4,1fr); gap: 2rem; margin-bottom: 60px; }
        .footer-logo { display: flex; align-items: center; gap: 10px; }
        .footer-logo-mark { width: 28px; height: 28px; border-radius: 8px; background: var(--btn-primary-bg); color: var(--btn-primary-color); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; }
        .footer-logo-text { font-weight: 700; font-size: 0.95rem; }
        .footer-logo-badge { font-size: 0.55rem; padding: 2px 7px; border-radius: 5px; background: rgba(var(--rgb-base),0.06); color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .footer-brand-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.7; margin-top: 16px; max-width: 300px; }
        .footer-col { display: flex; flex-direction: column; gap: 12px; }
        .footer-col-title { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px; }
        .footer-link { color: var(--footer-link-color); text-decoration: none; font-size: 0.85rem; }
        .footer-link:hover { color: var(--text-primary); }
        .footer-bottom { padding-top: 32px; border-top: 1px solid rgba(var(--rgb-base),0.04); display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }
        .footer-copy { font-size: 0.75rem; color: var(--footer-copy-color); }
        .footer-social { display: flex; gap: 16px; }
        .footer-social a { color: var(--footer-copy-color); transition: color 0.2s; display: flex; }
        .footer-social a:hover { color: var(--text-secondary); }
        .footer-legal { display: flex; gap: 20px; }
        .footer-legal a { color: var(--footer-copy-color); text-decoration: none; font-size: 0.75rem; }
        .footer-legal a:hover { color: var(--text-secondary); }
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 3rem; } .footer-cta-form { flex-direction: column; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } .footer-bottom { flex-direction: column; text-align: center; } }
        [dir="rtl"] .footer-cta-title { letter-spacing: 0; }
      `}</style>
    </footer>
  );
};

export default Footer;
