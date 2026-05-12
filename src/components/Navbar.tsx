import React from 'react';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { useLang } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import { t } from '../i18n';

const NAV_LINKS = [
  { href: '#home', key: 'nav.home' },
  { href: '#services', key: 'nav.services' },
  { href: '#work', key: 'nav.work' },
  { href: '#faq', key: 'nav.faq' },
];

const Navbar = () => {
  const { lang, setLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('home');
  const [scrolled, setScrolled] = React.useState(false);
  const indicatorRef = React.useRef<HTMLDivElement>(null);
  const navRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const activeLink = navRef.current?.querySelector('.nav-link.active') as HTMLElement | null;
    if (activeLink && indicatorRef.current) {
      const parentRect = activeLink.parentElement!.getBoundingClientRect();
      const elRect = activeLink.getBoundingClientRect();
      const left = elRect.left - parentRect.left + elRect.width / 2 - 8;
      indicatorRef.current.style.left = `${left}px`;
      indicatorRef.current.style.transform = 'none';
    }
  }, [activeSection]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest('.navbar')) setIsOpen(false); };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} ref={navRef}>
      <div className="nav-inner">
        <a href="#home" className="nav-logo">
          <span className="logo-mark">H</span>
          <span className="logo-divider" />
          <span className="logo-text">Hussien</span>
          <span className="logo-badge">Dev</span>
        </a>
        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className={`nav-link${activeSection === link.href.slice(1) ? ' active' : ''}`}>{t(link.key, lang)}</a>
          ))}
          <div className="nav-indicator" ref={indicatorRef} />
        </div>
        <div className="nav-actions">
          <button className="nav-theme" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}</button>
          <button className="nav-lang" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label="Toggle language"><Globe size={14} /><span>{lang === 'en' ? 'AR' : 'EN'}</span></button>
          <a href="https://t.me/hsabadi" target="_blank" className="nav-cta">{t('nav.contact', lang)}</a>
          <button className="nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">{isOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      <div className={`nav-mobile${isOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(link => (
          <a key={link.href} href={link.href} className={`nav-mobile-link${activeSection === link.href.slice(1) ? ' active' : ''}`} onClick={() => setIsOpen(false)}>{t(link.key, lang)}</a>
        ))}
        <button className="nav-mobile-lang" onClick={() => { toggleTheme(); setIsOpen(false); }}>{theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</button>
        <button className="nav-mobile-lang" onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setIsOpen(false); }}><Globe size={14} />{lang === 'en' ? 'العربية' : 'English'}</button>
        <a href="https://t.me/hsabadi" target="_blank" className="nav-mobile-cta" onClick={() => setIsOpen(false)}>{t('nav.contact', lang)}</a>
      </div>
      <style>{`
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; flex-direction: column; align-items: center; padding: 16px 24px 0; pointer-events: none; }
        .nav-inner { pointer-events: auto; display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1100px; padding: 0 20px; height: 56px; border-radius: 16px; background: var(--nav-inner-bg); border: 1px solid var(--nav-inner-border); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); transition: all 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        .navbar.scrolled .nav-inner { background: var(--mobile-menu-bg); border-color: var(--card-border); box-shadow: 0 8px 40px rgba(0,0,0,0.15); }
        .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--text-primary); }
        .logo-mark { width: 28px; height: 28px; border-radius: 8px; background: var(--btn-primary-bg); color: var(--btn-primary-color); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; }
        .logo-divider { width: 1px; height: 20px; background: rgba(var(--rgb-base),0.1); }
        .logo-text { font-weight: 700; font-size: 0.95rem; letter-spacing: -0.02em; }
        .logo-badge { font-size: 0.6rem; padding: 2px 8px; border-radius: 6px; background: rgba(var(--rgb-base),0.08); color: var(--text-secondary); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
        .nav-links { position: relative; display: flex; align-items: center; gap: 4px; }
        .nav-link { position: relative; z-index: 1; color: var(--nav-link-color); text-decoration: none; font-size: 0.82rem; font-weight: 500; padding: 8px 14px; border-radius: 8px; transition: color 0.25s ease, background 0.25s ease; }
        .nav-link:hover { color: var(--nav-link-hover); background: rgba(var(--rgb-base),0.04); }
        .nav-link.active { color: var(--text-primary); }
        .nav-indicator { position: absolute; bottom: 2px; height: 3px; border-radius: 2px; background: var(--text-primary); pointer-events: none; width: 16px; transition: left 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        .nav-actions { display: flex; align-items: center; gap: 8px; }
        .nav-theme, .nav-lang { display: flex; align-items: center; gap: 5px; padding: 6px 10px; border-radius: 8px; border: 1px solid rgba(var(--rgb-base),0.06); background: rgba(var(--rgb-base),0.03); color: var(--text-secondary); font-size: 0.7rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s; }
        .nav-theme:hover, .nav-lang:hover { background: rgba(var(--rgb-base),0.06); color: var(--text-primary); border-color: rgba(var(--rgb-base),0.12); }
        .nav-cta { padding: 7px 18px; border-radius: 8px; background: var(--btn-primary-bg); color: var(--btn-primary-color); font-size: 0.8rem; font-weight: 600; text-decoration: none; transition: opacity 0.2s, transform 0.2s; }
        .nav-cta:hover { opacity: 0.9; transform: translateY(-1px); }
        .nav-mobile-toggle { display: none; background: rgba(var(--rgb-base),0.06); border: 1px solid rgba(var(--rgb-base),0.08); color: var(--text-primary); cursor: pointer; width: 36px; height: 36px; border-radius: 8px; align-items: center; justify-content: center; padding: 0; flex-shrink: 0; }
        .nav-mobile { pointer-events: auto; margin-top: 8px; width: 100%; max-width: 1100px; background: var(--mobile-menu-bg); border: 1px solid rgba(var(--rgb-base),0.08); border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 4px; opacity: 0; transform: translateY(-12px); visibility: hidden; transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s; }
        .nav-mobile.open { opacity: 1; transform: translateY(0); visibility: visible; }
        .nav-mobile-link { padding: 12px 16px; border-radius: 8px; color: var(--text-secondary); text-decoration: none; font-size: 0.95rem; font-weight: 500; transition: background 0.2s, color 0.2s; }
        .nav-mobile-link:hover, .nav-mobile-link.active { background: rgba(var(--rgb-base),0.05); color: var(--text-primary); }
        .nav-mobile-lang { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border-radius: 8px; border: 1px solid rgba(var(--rgb-base),0.06); background: transparent; color: var(--text-secondary); font-size: 0.9rem; font-weight: 500; cursor: pointer; font-family: inherit; transition: background 0.2s, color 0.2s; }
        .nav-mobile-lang:hover { background: rgba(var(--rgb-base),0.05); color: var(--text-primary); }
        .nav-mobile-cta { margin-top: 8px; padding: 12px; border-radius: 8px; background: var(--btn-primary-bg); color: var(--btn-primary-color); text-align: center; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
        @media (max-width: 900px) { .navbar { padding: 12px 16px 0; } .nav-inner { padding: 0 12px; height: 50px; border-radius: 12px; } .nav-links { display: none; } .nav-cta { display: none; } .nav-mobile-toggle { display: flex; width: 34px; height: 34px; } .logo-badge { display: none; } .logo-text { font-size: 0.85rem; } .logo-mark { width: 26px; height: 26px; font-size: 0.7rem; } }
      `}</style>
    </nav>
  );
};

export default Navbar;
