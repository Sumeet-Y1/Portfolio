import { useEffect, useState } from 'react'

const CONTACT_CARDS = [
  {
    label: 'Email',
    main: 'sumeety202@gmail.com',
    href: 'mailto:sumeety202@gmail.com',
    sub: 'Primary channel for professional inquiries.',
    icon: 'EM',
  },
  {
    label: 'LinkedIn',
    main: 'sumeet-backenddev',
    href: 'https://linkedin.com/in/sumeet-backenddev',
    sub: 'Connect for professional networking.',
    icon: 'IN',
  },
  {
    label: 'GitHub',
    main: 'Sumeet-Y1',
    href: 'https://github.com/Sumeet-Y1',
    sub: 'Browse my projects and open source work.',
    icon: 'GH',
  },
  {
    label: 'Location',
    main: 'Mumbai, India',
    href: '',
    sub: 'Maharashtra · Open to remote roles worldwide.',
    icon: 'LOC',
  },
]

const SOCIALS = [
  { label: 'LinkedIn', value: '/ sumeet-backenddev', href: 'https://linkedin.com/in/sumeet-backenddev' },
  { label: 'GitHub', value: '/ Sumeet-Y1', href: 'https://github.com/Sumeet-Y1' },
  { label: 'X (Twitter)', value: '@hustlehard_qt', href: 'https://x.com/hustlehard_qt' },
  { label: 'Email', value: 'sumeety202@gmail.com', href: 'mailto:sumeety202@gmail.com' },
]

export default function Contact() {
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(timer)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#/' },
    { label: 'Skills', href: '#/skills' },
    { label: 'Experience', href: '#/experience' },
    { label: 'Projects', href: '#/projects' },
    { label: 'About', href: '#/about' },
    { label: 'Contact', href: '#/contact' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Outfit:wght@200;300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050505; color: #fff; font-family: 'Outfit', sans-serif; overflow-x: hidden; }
        a { color: inherit; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; padding: 1.6rem 5vw; display: flex; align-items: center; justify-content: space-between; background: rgba(5,5,5,.74); backdrop-filter: blur(12px); }
        .nav-left { display: flex; align-items: center; gap: 2.5rem; }
        .nav-logo { font-family: 'JetBrains Mono', monospace; font-size: .85rem; color: rgba(255,255,255,.85); text-decoration: none; letter-spacing: .1em; }
        .nav-sep { width: 1px; height: 16px; background: rgba(255,255,255,.1); }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a { color: rgba(255,255,255,.25); text-decoration: none; font-size: .7rem; letter-spacing: .14em; text-transform: uppercase; transition: color .2s; position: relative; padding-bottom: 2px; }
        .nav-links a::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: rgba(255,255,255,.5); transform: scaleX(0); transform-origin: left; transition: transform .25s; }
        .nav-links a:hover, .nav-links a.active { color: rgba(255,255,255,.85); }
        .nav-links a:hover::after, .nav-links a.active::after { transform: scaleX(1); }
        .nav-cta { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(255,255,255,.18); color: rgba(255,255,255,.55); padding: 8px 20px; border-radius: 100px; font-family: 'JetBrains Mono', monospace; font-size: .68rem; letter-spacing: .14em; text-transform: uppercase; text-decoration: none; transition: all .25s; }
        .nav-cta:hover { border-color: rgba(255,255,255,.5); color: #fff; background: rgba(255,255,255,.05); }
        .nav-cta-dot { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; animation: pulse 2s infinite; flex-shrink: 0; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: rgba(255,255,255,.7); transition: all .3s; }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
        .mobile-menu { position: fixed; inset: 0; z-index: 150; background: rgba(5,5,5,.97); backdrop-filter: blur(20px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem; opacity: ${menuOpen ? 1 : 0}; pointer-events: ${menuOpen ? 'all' : 'none'}; transition: opacity .35s; }
        .mobile-menu a { font-family: 'Playfair Display', serif; font-size: clamp(32px, 8vw, 52px); font-weight: 700; color: rgba(255,255,255,.8); text-decoration: none; transition: color .2s; }
        .mobile-menu a:hover { color: #fff; }
        .page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 7rem 2rem 3rem; position: relative; overflow: hidden; }
        .page::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 18% 22%, rgba(255,255,255,.08), transparent 24%), radial-gradient(circle at 80% 18%, rgba(255,255,255,.05), transparent 20%), linear-gradient(to bottom, rgba(5,5,5,.92), rgba(5,5,5,.98)); }
        .grid-frame { position: relative; z-index: 2; width: 100%; max-width: 1300px; display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid rgba(255,255,255,.18); background: rgba(255,255,255,.12); gap: 1px; animation: ${loaded ? 'fadeUp .6s cubic-bezier(0.16,1,0.3,1) both' : 'none'}; }
        .cell { background: #060606; padding: 1.5rem; position: relative; overflow: hidden; }
        .cell-topbar { grid-column: span 4; padding: .95rem 1.5rem; display: flex; justify-content: space-between; align-items: center; min-height: 56px; }
        .back-btn { display: inline-flex; align-items: center; gap: .55rem; color: rgba(255,255,255,.6); text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: .75rem; letter-spacing: .05em; transition: color .2s; }
        .back-btn:hover { color: #fff; }
        .avail-pill { display: flex; align-items: center; gap: .5rem; font-family: 'JetBrains Mono', monospace; font-size: .7rem; color: rgba(255,255,255,.5); letter-spacing: .05em; text-transform: uppercase; }
        .avail-dot { width: 7px; height: 7px; background: #28ca42; border-radius: 50%; box-shadow: 0 0 8px rgba(40,202,66,.7); }
        .cell-title { grid-column: span 4; padding: 2rem 1.5rem; display: flex; align-items: center; justify-content: center; min-height: 160px; }
        .big-title { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 10vw, 8rem); text-transform: uppercase; letter-spacing: -.04em; line-height: .95; text-align: center; color: #fff; }
        .cell-contact { grid-column: span 1; min-height: 210px; display: flex; flex-direction: column; justify-content: space-between; transition: background .2s; }
        .cell-contact:hover { background: rgba(255,255,255,.03); }
        .cell-label-row { display: flex; justify-content: space-between; align-items: center; font-family: 'JetBrains Mono', monospace; font-size: .68rem; text-transform: uppercase; letter-spacing: .08em; color: rgba(255,255,255,.4); margin-bottom: 1.5rem; }
        .cell-icon { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 12px; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.04); font-family: 'JetBrains Mono', monospace; font-size: .78rem; color: rgba(255,255,255,.78); margin-bottom: .9rem; }
        .cell-main { font-size: 1rem; font-weight: 600; color: #fff; text-decoration: none; display: block; transition: opacity .2s; word-break: break-all; }
        .cell-main:hover { opacity: .75; }
        .cell-sub { font-size: .68rem; color: rgba(255,255,255,.3); line-height: 1.6; margin-top: auto; padding-top: 1rem; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .06em; }
        .cell-socials { grid-column: span 2; min-height: 220px; display: flex; flex-direction: column; justify-content: space-between; }
        .cell-tagline { grid-column: span 2; min-height: 220px; display: flex; flex-direction: column; justify-content: space-between; }
        .cell-section-label, .tagline-top { font-family: 'JetBrains Mono', monospace; font-size: .68rem; text-transform: uppercase; letter-spacing: .1em; color: rgba(255,255,255,.35); margin-bottom: 1.5rem; display: block; }
        .social-list { display: flex; flex-direction: column; gap: .65rem; }
        .social-link { font-size: .95rem; font-weight: 500; color: #fff; text-decoration: none; display: flex; align-items: center; gap: .5rem; transition: opacity .2s, transform .2s; }
        .social-link:hover { opacity: .6; transform: translateX(4px); }
        .social-link span { color: rgba(255,255,255,.35); font-weight: 400; }
        .tagline-main { font-family: 'Playfair Display', serif; font-size: clamp(1.6rem, 3vw, 2.6rem); line-height: 1.05; color: #fff; letter-spacing: -.02em; }
        .tagline-footer { display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; font-family: 'JetBrains Mono', monospace; font-size: .6rem; color: rgba(255,255,255,.25); text-transform: uppercase; letter-spacing: .08em; }
        @media (max-width: 960px) { .nav-links, .nav-sep { display: none; } .hamburger { display: flex; } .grid-frame { grid-template-columns: repeat(2, 1fr); } .cell-topbar, .cell-title { grid-column: span 2; } .cell-socials, .cell-tagline { grid-column: span 2; } }
        @media (max-width: 640px) { .page { padding: 6rem 1rem 2rem; } .grid-frame { grid-template-columns: 1fr; } .cell-topbar, .cell-title, .cell-contact, .cell-socials, .cell-tagline { grid-column: span 1; } .cell-topbar, .tagline-footer { flex-direction: column; align-items: flex-start; } .big-title { font-size: 16vw; } }
      `}</style>

      <div className="mobile-menu">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
        ))}
      </div>

      <nav className="nav">
        <div className="nav-left">
          <a href="#/" className="nav-logo">&lt;SY/&gt;</a>
          <div className="nav-sep" />
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.label}><a href={link.href} className={link.label === 'Contact' ? 'active' : ''}>{link.label}</a></li>
            ))}
          </ul>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#/contact" className="nav-cta"><div className="nav-cta-dot" />Available</a>
          <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen((open) => !open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <section className="page">
        <div className="grid-frame">
          <div className="cell cell-topbar">
            <a href="#/" className="back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              BACK
            </a>
            <div className="avail-pill">
              <div className="avail-dot" />
              Available for opportunities
            </div>
          </div>

          <div className="cell cell-title">
            <h1 className="big-title">Let&apos;s Connect</h1>
          </div>

          {CONTACT_CARDS.map((card) => (
            <div key={card.label} className="cell cell-contact">
              <div className="cell-label-row">
                <span>{card.label}</span>
                <span>→</span>
              </div>
              <div className="cell-icon">{card.icon}</div>
              {card.href ? (
                <a href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel={card.href.startsWith('http') ? 'noreferrer' : undefined} className="cell-main">
                  {card.main}
                </a>
              ) : (
                <p className="cell-main" style={{ cursor: 'default' }}>{card.main}</p>
              )}
              <p className="cell-sub">{card.sub}</p>
            </div>
          ))}

          <div className="cell cell-socials">
            <span className="cell-section-label">Socials</span>
            <div className="social-list">
              {SOCIALS.map((social) => (
                <a key={social.label} href={social.href} target={social.href.startsWith('http') ? '_blank' : undefined} rel={social.href.startsWith('http') ? 'noreferrer' : undefined} className="social-link">
                  {social.label.toUpperCase()} <span>{social.value}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="cell cell-tagline">
            <div className="tagline-top">2026 · Backend Developer</div>
            <div className="tagline-main">
              Building systems<br />
              that actually<br />
              ship.
            </div>
            <div className="tagline-footer">
              <span>Mumbai · India</span>
              <span>Spring Boot · AWS · Docker</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
