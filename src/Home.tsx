import { useEffect, useRef, useState } from 'react'

const TICKER_ITEMS = [
  'Spring Boot', 'React', 'AWS', 'Java', 'TypeScript',
  'Microservices', 'REST APIs', 'Docker', 'Terraform',
  'JWT Auth', 'MySQL', 'CI/CD', 'Redis', 'Kafka', 'Next.js',
]

const STATS = [
  { num: '3+',  label: 'Projects Shipped' },
  { num: '5',   label: 'Job Simulations'  },
  { num: '15+', label: 'Technologies'     },
  { num: '∞',   label: 'Cups of Coffee'  },
]

const STACK = [
  { number: '01', title: 'Backend Architecture',  desc: 'Spring Boot microservices, REST APIs, JWT auth built for scale, not demos.' },
  { number: '02', title: 'Frontend',              desc: 'React, TypeScript, Vite interfaces that are fast, clean and actually usable.' },
  { number: '03', title: 'Cloud & DevOps',        desc: 'AWS, Docker, Terraform, CI/CD ships to prod without drama.' },
  { number: '04', title: 'Security First',        desc: 'Spring Security, OAuth2, rate limiting hardened from day one.' },
]

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState<Record<number, boolean>>({})
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])



  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs: IntersectionObserver[] = []
    refs.current.forEach((el, i) => {
      if (!el) return
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setVisible(v => ({ ...v, [i]: true })) },
        { threshold: 0.08 }
      )
      o.observe(el)
      obs.push(o)
    })
    return () => obs.forEach(o => o.disconnect())
  }, [])

  const r = (i: number) => (el: HTMLElement | null) => { refs.current[i] = el }

  const NAV_LINKS = [
    { label: 'Home',       href: '#/'           },
    { label: 'Skills',     href: '#/skills'    },
    { label: 'Experience', href: '#/experience' },
    { label: 'Projects',   href: '#/projects'   },
    { label: 'About',      href: '#/about'      },
    { label: 'Contact',    href: '#/contact'    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Outfit:wght@200;300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050505; color: #fff; font-family: 'Outfit', sans-serif; overflow-x: hidden; }
        [id] { scroll-margin-top: 110px; }

        @keyframes revealUp { from{clip-path:inset(100% 0 0 0);opacity:0} to{clip-path:inset(0% 0 0 0);opacity:1} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ticker   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pulse    { 0%,100%{opacity:.35} 50%{opacity:1} }
        @keyframes drift    { 0%{transform:translate(0,0)} 33%{transform:translate(25px,-15px)} 66%{transform:translate(-15px,12px)} 100%{transform:translate(0,0)} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes termIn   { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }

        /* ── NAV ── */
        .nav {
          position:fixed; top:0; left:0; right:0; z-index:200;
          padding:1.6rem 5vw;
          display:flex; align-items:center; justify-content:space-between;
          background:${scrolled ? 'rgba(5,5,5,0.85)' : 'rgba(5,5,5,0.4)'};
          backdrop-filter: blur(12px);
          transition:background .4s;
        }
        .nav-left { display:flex; align-items:center; gap:2.5rem; }
        .nav-logo  { font-family:'JetBrains Mono',monospace; font-size:.85rem; color:rgba(255,255,255,.85); text-decoration:none; letter-spacing:.1em; }
        .nav-sep   { width:1px; height:16px; background:rgba(255,255,255,.1); }
        .nav-links { display:flex; gap:2rem; list-style:none; }
        .nav-links a { color:rgba(255,255,255,.25); text-decoration:none; font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; transition:color .2s; position:relative; padding-bottom:2px; }
        .nav-links a::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:rgba(255,255,255,.5); transform:scaleX(0); transform-origin:left; transition:transform .25s; }
        .nav-links a:hover { color:rgba(255,255,255,.75); }
        .nav-links a:hover::after { transform:scaleX(1); }
        .nav-cta { display:inline-flex; align-items:center; gap:8px; border:1px solid rgba(255,255,255,.18); color:rgba(255,255,255,.55); padding:8px 20px; border-radius:100px; font-family:'JetBrains Mono',monospace; font-size:.68rem; letter-spacing:.14em; text-transform:uppercase; text-decoration:none; transition:all .25s; }
        .nav-cta:hover { border-color:rgba(255,255,255,.5); color:#fff; background:rgba(255,255,255,.05); }
        .nav-cta-dot { width:5px; height:5px; border-radius:50%; background:#4ade80; animation:pulse 2s infinite; flex-shrink:0; }

        /* hamburger */
        .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:4px; background:none; border:none; }
        .hamburger span { display:block; width:22px; height:1.5px; background:rgba(255,255,255,.7); transition:all .3s; }
        .hamburger.open span:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }

        /* mobile overlay */
        .mobile-menu { position:fixed; inset:0; z-index:150; background:rgba(5,5,5,.97); backdrop-filter:blur(20px); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2.5rem; opacity:${menuOpen?1:0}; pointer-events:${menuOpen?'all':'none'}; transition:opacity .35s; }
        .mobile-menu a { font-family:'Playfair Display',serif; font-size:clamp(32px,8vw,52px); font-weight:700; color:rgba(255,255,255,.8); text-decoration:none; transition:color .2s; }
        .mobile-menu a:hover { color:#fff; }
        .mobile-menu-cta { margin-top:.5rem; display:inline-flex; align-items:center; gap:8px; border:1px solid rgba(255,255,255,.2); color:rgba(255,255,255,.5); padding:12px 28px; border-radius:100px; font-family:'JetBrains Mono',monospace; font-size:.75rem; letter-spacing:.14em; text-transform:uppercase; text-decoration:none; transition:all .25s; }
        .mobile-menu-cta:hover { border-color:rgba(255,255,255,.5); color:#fff; }

        /* ── HERO ── */
        .hero { position:relative; height:100vh; min-height:760px; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden; }

        .hero-bg { position:absolute; inset:0; z-index:0; }
        .hero-bg video { width:100%; height:100%; object-fit:cover; opacity:.28; filter:grayscale(100%) contrast(1.1); animation:drift 22s ease-in-out infinite; }
        .hero-bg::after { content:''; position:absolute; inset:0;
          background:
            linear-gradient(to bottom, rgba(5,5,5,.1) 0%, rgba(5,5,5,.0) 20%, rgba(5,5,5,.8) 72%, #050505 100%),
            linear-gradient(to right, rgba(5,5,5,.65) 0%, rgba(5,5,5,.1) 60%, rgba(5,5,5,.5) 100%);
        }
        .hero-grain { position:absolute; inset:0; z-index:1; pointer-events:none; opacity:.04; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:220px; }

        /* LEFT CONTENT */
        .hero-left {
          position:relative; z-index:3;
          padding:0 0 5.5rem 5vw;
          display:flex; flex-direction:column; justify-content:flex-end;
          height:100%;
        }

        .hero-status { display:inline-flex; align-items:center; gap:10px; margin-bottom:2rem; opacity:${loaded?1:0}; animation:${loaded?'fadeIn .6s ease both .3s':'none'}; }
        .status-dot  { width:5px; height:5px; border-radius:50%; background:#4ade80; animation:pulse 2.5s infinite; }
        .status-text { font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.24em; text-transform:uppercase; color:rgba(255,255,255,.25); }
        .status-div  { width:24px; height:1px; background:rgba(255,255,255,.12); }

        .hero-title  { font-family:'Playfair Display',serif; font-weight:900; line-height:.88; letter-spacing:-.03em; margin-bottom:3.5rem; }
        .title-row   { display:block; overflow:hidden; }
        .title-main  { display:inline-block; font-size:clamp(60px,9vw,138px); color:#fff; animation:${loaded?'revealUp 1.1s cubic-bezier(0.16,1,0.3,1) both .3s':'none'}; }
        .title-outline { display:inline-block; font-size:clamp(60px,9vw,138px); font-style:italic; -webkit-text-stroke:1.5px rgba(255,255,255,.3); color:transparent; animation:${loaded?'revealUp 1.1s cubic-bezier(0.16,1,0.3,1) both .48s':'none'}; }
        .title-tag   { display:block; font-size:clamp(13px,1.6vw,22px); font-style:italic; font-weight:400; color:rgba(255,255,255,.2); letter-spacing:.02em; margin-top:.6rem; animation:${loaded?'revealUp 1.1s cubic-bezier(0.16,1,0.3,1) both .62s':'none'}; overflow:hidden; }

        .hero-bottom { opacity:${loaded?1:0}; animation:${loaded?'fadeUp .9s cubic-bezier(0.16,1,0.3,1) both 1s':'none'}; }
        .hero-role   { font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.22em; text-transform:uppercase; color:rgba(255,255,255,.2); margin-bottom:.8rem; display:flex; align-items:center; gap:10px; }
        .hero-role::before { content:''; display:block; width:18px; height:1px; background:rgba(255,255,255,.18); }
        .hero-desc   { font-size:13.5px; line-height:1.9; color:rgba(255,255,255,.28); font-weight:300; max-width:420px; margin-bottom:2.2rem; }
        .hero-actions { display:flex; align-items:center; gap:16px; flex-wrap:wrap; }

        .btn-primary { display:inline-flex; align-items:center; gap:8px; background:#fff; color:#050505; padding:13px 28px; border-radius:6px; font-size:11px; font-weight:700; text-decoration:none; font-family:'Outfit',sans-serif; letter-spacing:.08em; text-transform:uppercase; transition:transform .22s, box-shadow .22s; }
        .btn-primary:hover { transform:translateY(-3px); box-shadow:0 24px 60px rgba(255,255,255,.16); }
        .btn-ghost { font-family:'JetBrains Mono',monospace; font-size:10px; color:rgba(255,255,255,.28); text-decoration:none; letter-spacing:.12em; text-transform:uppercase; transition:color .2s; display:flex; align-items:center; gap:8px; }
        .btn-ghost::after { content:'→'; transition:transform .2s; display:inline-block; }
        .btn-ghost:hover { color:rgba(255,255,255,.8); }
        .btn-ghost:hover::after { transform:translateX(4px); }



        .kali-bar {
          background: #111111;
          border-bottom: 1px solid rgba(255,255,255,.06);
          padding: .65rem 1.2rem;
          display: flex; align-items: center; gap: .5rem;
          flex-shrink: 0;
        }
        .kali-body {
          padding: 1rem 1.4rem 1.4rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: .72rem;
          line-height: 1.75;
          background: #080808;
          flex: 1;
          overflow-y: auto;
        }
          border-bottom:1px solid rgba(255,255,255,.06);
          padding:.65rem 1rem;
          display:flex; align-items:center; gap:.5rem;
        }
        .kali-dots { display:flex; gap:6px; }
        .kali-dot  { width:11px; height:11px; border-radius:50%; }
        .kali-dot.r { background:#ff5f57; }
        .kali-dot.y { background:#febc2e; }
        .kali-dot.g { background:#28c840; }
        .kali-title { font-family:'JetBrains Mono',monospace; font-size:.62rem; color:rgba(255,255,255,.22); margin-left:auto; letter-spacing:.06em; }



        .kali-line { animation:termIn .18s ease both; }

        /* prompt colors real kali style */
        .k-user { color:#7dcfff; }          /* cyan username */
        .k-at   { color:rgba(255,255,255,.35); }
        .k-host { color:#bb9af7; }          /* purple hostname */
        .k-path { color:#7dcfff; }
        .k-sym  { color:#e0af68; }          /* dollar sign yellow */
        .k-cmd  { color:#c0caf5; }          /* light blue-white command */
        .k-out  { color:rgba(255,255,255,.38); }
        .k-key  { color:#7dcfff; }          /* json key cyan */
        .k-val  { color:#9ece6a; }          /* json value green */
        .k-brace{ color:rgba(255,255,255,.28); }
        .k-green{ color:#9ece6a; }
        .k-red  { color:#f7768e; }
        .k-cursor { display:inline-block; width:7px; height:13px; background:#9ece6a; animation:blink .9s step-end infinite; vertical-align:middle; margin-left:1px; }

        /* TICKER */
        .ticker { position:absolute; bottom:0; left:0; right:0; z-index:4; border-top:1px solid rgba(255,255,255,.05); overflow:hidden; padding:11px 0; background:rgba(5,5,5,.85); backdrop-filter:blur(14px); }
        .ticker-track { display:flex; white-space:nowrap; animation:ticker 34s linear infinite; }
        .ticker-item  { display:inline-flex; align-items:center; gap:14px; padding:0 30px; font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.15); }
        .ticker-sep   { width:3px; height:3px; border-radius:50%; background:rgba(255,255,255,.15); }

        /* SECTIONS */
        .section    { padding:110px 5vw; max-width:1240px; margin:0 auto; opacity:0; transform:translateY(38px); transition:opacity .9s cubic-bezier(0.16,1,0.3,1),transform .9s cubic-bezier(0.16,1,0.3,1); }
        .section.vis{ opacity:1; transform:translateY(0); }
        .section-fw { opacity:0; transform:translateY(38px); transition:opacity .9s cubic-bezier(0.16,1,0.3,1),transform .9s cubic-bezier(0.16,1,0.3,1); }
        .section-fw.vis { opacity:1; transform:translateY(0); }

        .eyebrow { display:inline-flex; align-items:center; gap:10px; font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.24em; text-transform:uppercase; color:rgba(255,255,255,.18); margin-bottom:22px; }
        .eyebrow::before { content:''; display:block; width:20px; height:1px; background:rgba(255,255,255,.15); }
        .h2 { font-family:'Playfair Display',serif; font-size:clamp(34px,4.2vw,58px); font-weight:900; letter-spacing:-.025em; color:rgba(255,255,255,.9); line-height:1.06; }
        .h2 em { font-style:italic; color:rgba(255,255,255,.28); font-weight:400; }

        /* STATS */
        .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); margin-top:56px; border:1px solid rgba(255,255,255,.05); border-radius:14px; overflow:hidden; }
        .stat { padding:38px 28px; background:#0b0b0b; border-right:1px solid rgba(255,255,255,.05); transition:background .25s; }
        .stat:last-child { border-right:none; }
        .stat:hover { background:rgba(255,255,255,.025); }
        .stat-num   { font-family:'Playfair Display',serif; font-size:50px; font-weight:900; font-style:italic; color:rgba(255,255,255,.85); letter-spacing:-.03em; line-height:1; margin-bottom:10px; display:block; }
        .stat-label { font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.16em; text-transform:uppercase; color:rgba(255,255,255,.2); }

        /* ABOUT */
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; margin-top:64px; }
        .about-copy { font-size:14.5px; line-height:2.05; color:rgba(255,255,255,.28); font-weight:300; margin-top:26px; }
        .about-copy p+p { margin-top:1rem; }
        .about-btns { display:flex; gap:16px; margin-top:36px; flex-wrap:wrap; align-items:center; }

        .stack-list { border:1px solid rgba(255,255,255,.05); border-radius:14px; overflow:hidden; }
        .stack-row  { display:grid; grid-template-columns:48px 1fr 16px; align-items:center; gap:18px; padding:22px 26px; background:#0b0b0b; border-bottom:1px solid rgba(255,255,255,.04); transition:background .22s; cursor:default; position:relative; }
        .stack-row::after { content:''; position:absolute; left:0; top:0; bottom:0; width:2px; background:rgba(255,255,255,.7); transform:scaleY(0); transform-origin:bottom; transition:transform .35s cubic-bezier(0.16,1,0.3,1); }
        .stack-row:hover::after { transform:scaleY(1); }
        .stack-row:last-child { border-bottom:none; }
        .stack-row:hover { background:rgba(255,255,255,.025); }
        .s-num   { font-family:'Playfair Display',serif; font-size:11px; font-style:italic; color:rgba(255,255,255,.1); }
        .s-title { font-size:12.5px; font-weight:600; color:rgba(255,255,255,.62); margin-bottom:3px; transition:color .2s; }
        .stack-row:hover .s-title { color:rgba(255,255,255,.95); }
        .s-desc  { font-size:11px; line-height:1.6; color:rgba(255,255,255,.18); font-weight:300; transition:color .2s; }
        .stack-row:hover .s-desc { color:rgba(255,255,255,.4); }
        .s-arr   { color:rgba(255,255,255,.08); transition:color .2s, transform .2s; }
        .stack-row:hover .s-arr  { color:rgba(255,255,255,.4); transform:translateX(5px); }

        /* MANIFESTO */
        .manifesto { border-top:1px solid rgba(255,255,255,.05); border-bottom:1px solid rgba(255,255,255,.05); padding:110px 5vw; display:flex; align-items:flex-start; gap:5vw; }
        .manifesto-num { font-family:'Playfair Display',serif; font-size:clamp(80px,10vw,140px); font-weight:900; font-style:italic; color:rgba(255,255,255,.04); line-height:1; flex-shrink:0; letter-spacing:-.04em; margin-top:-.5rem; }
        .manifesto-q   { font-family:'Playfair Display',serif; font-size:clamp(22px,2.8vw,40px); font-weight:400; font-style:italic; color:rgba(255,255,255,.38); line-height:1.6; max-width:780px; }
        .manifesto-attr{ margin-top:28px; font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.15); display:flex; align-items:center; gap:12px; }
        .manifesto-attr::before { content:''; display:block; width:24px; height:1px; background:rgba(255,255,255,.12); }

        /* FOOTER */
        .footer { padding:26px 5vw; border-top:1px solid rgba(255,255,255,.05); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .footer-logo { font-family:'JetBrains Mono',monospace; font-size:.82rem; color:rgba(255,255,255,.18); }
        .footer-copy { font-size:10px; color:rgba(255,255,255,.12); letter-spacing:.05em; }

        /* RESPONSIVE */
        @media (max-width:960px) {
          .hero { grid-template-columns:1fr; }
          .hero-right { display:none; }
          .about-grid { grid-template-columns:1fr; gap:44px; }
          .stats-grid { grid-template-columns:repeat(2,1fr); }
          .nav-links, .nav-sep { display:none; }
          .hamburger { display:flex; }
        }
        @media (max-width:600px) {
          .hero-bottom-row { flex-direction:column; align-items:flex-start; gap:28px; }
          .stack-row { grid-template-columns:36px 1fr; }
          .s-arr { display:none; }
          .manifesto { flex-direction:column; gap:0; }
          .stats-grid { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>

      {/* MOBILE MENU */}
      <div className="mobile-menu">
        {NAV_LINKS.map(l => (
          <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <a href="#/contact" className="mobile-menu-cta" onClick={() => setMenuOpen(false)}>
          <div className="nav-cta-dot"/>
          Contact Me
        </a>
      </div>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-left">
          <a href="#" className="nav-logo">&lt;SY/&gt;</a>
          <div className="nav-sep"/>
          <ul className="nav-links">
            {NAV_LINKS.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
          </ul>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          <a href="#/contact" className="nav-cta">
            <div className="nav-cta-dot"/>
            Contact Me
          </a>
          <button className={`hamburger${menuOpen?' open':''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <video autoPlay muted loop playsInline>
            <source src="/video3.webm" type="video/webm"/>
          </video>
        </div>
        <div className="hero-grain"/>

        {/* LEFT */}
        <div className="hero-left">
          <div className="hero-status">
            <div className="status-dot"/>
            <span className="status-text">Available for work</span>
            <div className="status-div"/>
            <span className="status-text">Mumbai · India</span>
          </div>

          <h1 className="hero-title">
            <span className="title-row"><span className="title-main">Sumeet</span></span>
            <span className="title-row"><span className="title-outline">Yadav</span></span>
            <span className="title-row"><span className="title-tag">- Full Stack Engineer</span></span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-role">Full Stack Engineer</p>
            <p className="hero-desc">
              Building production-grade systems end-to-end with Spring Boot on the backend,
              React on the frontend, and AWS supporting deployment and scale.
              The focus is on software that is reliable, maintainable, and ready for real use.
            </p>
            <div className="hero-actions">
              <a href="#/projects" className="btn-primary">
                View Projects
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a href="#contact" className="btn-ghost">Get in touch</a>
            </div>
          </div>
        </div>



        {/* TICKER */}
        <div className="ticker">
          <div className="ticker-track">
            {[...Array(2)].map((_, ri) =>
              TICKER_ITEMS.map((item, i) => (
                <span key={`${ri}-${i}`} className="ticker-item">
                  {item}<span className="ticker-sep"/>
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="overview" ref={r(0)} className={`section${visible[0] ? ' vis' : ''}`}>
        <div id="skills" />
        <div className="eyebrow">By the numbers</div>
        <h2 className="h2">Shipping code,<br/><em>not excuses.</em></h2>
        <div className="stats-grid">
          {STATS.map(s => (
            <div className="stat" key={s.label}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={r(1)} className={`section${visible[1] ? ' vis' : ''}`} style={{ paddingTop:0 }}>
        <div className="about-grid">
          <div>
            <div className="eyebrow">Who I Am</div>
            <h2 className="h2">Full stack developer focused on<br/><em>delivery and quality.</em></h2>
            <div className="about-copy">
              <p>Self-driven full stack engineer based in Mumbai building scalable APIs, cloud-native backends, and clean React frontends. I care about the full picture: architecture, security, performance, UX.</p>
              <p>Focused on microservices, AWS, and continuous growth as an engineer. I value clear architecture, dependable systems, and thoughtful user experience.</p>
            </div>
            <div className="about-btns">
                <a href="#/projects" className="btn-primary" style={{ fontSize:10, padding:'10px 22px' }}>
                My Work
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a href="#about" className="btn-ghost">More about me</a>
            </div>
          </div>
          <div className="stack-list">
            {STACK.map(h => (
              <div className="stack-row" key={h.number}>
                <span className="s-num">{h.number}</span>
                <div>
                  <div className="s-title">{h.title}</div>
                  <div className="s-desc">{h.desc}</div>
                </div>
                <svg className="s-arr" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="experience" ref={r(2)} className={`section-fw${visible[2] ? ' vis' : ''}`}>
        <div className="manifesto">
          <span className="manifesto-num">02</span>
          <div>
            <p className="manifesto-q">"Good software should feel dependable, scale with confidence, and solve problems without friction."</p>
            <p className="manifesto-attr">Sumeet Yadav · Full Stack Engineer · Mumbai</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="footer">
        <span className="footer-logo">&lt;SY/&gt;</span>
        <span className="footer-copy">© 2026 Sumeet Yadav · Built with passion & ☕</span>
      </footer>
    </>
  )
}
