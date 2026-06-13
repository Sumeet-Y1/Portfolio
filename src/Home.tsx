import { useEffect, useRef, useState, type CSSProperties } from 'react'

const TICKER_ITEMS = [
  'Spring Boot',
  'AWS',
  'Terraform',
  'GitHub Actions',
  'Docker',
  'Kubernetes',
  'Prometheus',
  'Grafana',
  'React',
  'TypeScript',
  'MongoDB',
  'PostgreSQL',
]

const STATS = [
  { value: '10', label: 'Featured Projects' },
  { value: '6', label: 'Job Simulations' },
  { value: '2', label: 'Focus Areas' },
  { value: '100%', label: 'Built For Delivery' },
]

const PROOF_POINTS = [
  {
    title: 'DevOps Systems',
    copy: 'Blue-green deploys, autoscaling, monitoring, and zero-downtime delivery on AWS.',
    link: '/projects',
  },
  {
    title: 'Backend Products',
    copy: 'Spring Boot APIs, auth flows, databases, and production-minded architecture.',
    link: '/projects',
  },
  {
    title: 'Polished Frontends',
    copy: 'Clean React interfaces designed to sell the work, not hide it.',
    link: '/projects',
  },
]

const STACK_ROWS = [
  { number: '01', title: 'Backend Engineering', desc: 'Spring Boot, REST APIs, JWT, database design, service boundaries.' },
  { number: '02', title: 'DevOps and Cloud', desc: 'AWS, Terraform, Docker, CI/CD, observability, and recovery-first infrastructure.' },
  { number: '03', title: 'Frontend Delivery', desc: 'React, TypeScript, responsive UI, animation, and sharp product presentation.' },
  { number: '04', title: 'Learning by Shipping', desc: 'Projects, simulations, and iterations that build real portfolio evidence.' },
]

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Skills', href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState<Record<number, boolean>>({})
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    refs.current.forEach((el, i) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((current) => ({ ...current, [i]: true }))
          }
        },
        { threshold: 0.12 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  const r = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Outfit:wght@200;300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050505; color: #fff; font-family: 'Outfit', sans-serif; overflow-x: hidden; }
        [id] { scroll-margin-top: 110px; }
        a { color: inherit; }

        @keyframes revealUp { from { clip-path: inset(100% 0 0 0); opacity: 0; } to { clip-path: inset(0% 0 0 0); opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
        @keyframes drift { 0% { transform: translate(0, 0); } 33% { transform: translate(25px, -15px); } 66% { transform: translate(-15px, 12px); } 100% { transform: translate(0, 0); } }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scaleIn { from { opacity: 0; transform: translateY(24px) scale(.985); } to { opacity: 1; transform: translateY(0) scale(1); } }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          padding: 1.45rem 5vw;
          display: flex; align-items: center; justify-content: space-between;
          background: ${scrolled ? 'rgba(5,5,5,0.88)' : 'rgba(5,5,5,0.35)'};
          backdrop-filter: blur(18px);
          border-bottom: 1px solid ${scrolled ? 'rgba(255,255,255,.06)' : 'transparent'};
          transition: background .35s, border-color .35s;
        }
        .nav-left { display: flex; align-items: center; gap: 2.25rem; }
        .nav-logo {
          font-family: 'JetBrains Mono', monospace; font-size: .85rem; letter-spacing: .1em;
          color: rgba(255,255,255,.9); text-decoration: none;
        }
        .nav-sep { width: 1px; height: 16px; background: rgba(255,255,255,.1); }
        .nav-links { display: flex; gap: 1.75rem; list-style: none; }
        .nav-links a {
          position: relative; padding-bottom: 2px;
          color: rgba(255,255,255,.25); text-decoration: none; font-size: .68rem;
          letter-spacing: .14em; text-transform: uppercase;
          transition: color .2s;
        }
        .nav-links a::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: 0;
          height: 1px; background: rgba(255,255,255,.7); transform: scaleX(0); transform-origin: left; transition: transform .25s;
        }
        .nav-links a:hover, .nav-links a.active { color: rgba(255,255,255,.92); }
        .nav-links a:hover::after, .nav-links a.active::after { transform: scaleX(1); }
        .nav-cta {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(255,255,255,.16); border-radius: 999px;
          color: rgba(255,255,255,.7); padding: 8px 18px;
          font-family: 'JetBrains Mono', monospace; font-size: .68rem; letter-spacing: .14em; text-transform: uppercase; text-decoration: none;
          transition: all .25s;
        }
        .nav-cta:hover { color: #fff; border-color: rgba(255,255,255,.42); background: rgba(255,255,255,.05); }
        .nav-cta-dot { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; animation: pulse 2s infinite; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: rgba(255,255,255,.74); transition: all .25s; }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .mobile-menu {
          position: fixed; inset: 0; z-index: 150; background: rgba(5,5,5,.98);
          backdrop-filter: blur(24px);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2rem;
          opacity: ${menuOpen ? 1 : 0}; pointer-events: ${menuOpen ? 'all' : 'none'}; transition: opacity .3s;
        }
        .mobile-menu a {
          font-family: 'Playfair Display', serif; font-size: clamp(30px, 7vw, 52px);
          font-weight: 700; text-decoration: none; color: rgba(255,255,255,.84);
        }
        .mobile-menu a:hover { color: #fff; }
        .mobile-menu-cta {
          margin-top: .5rem; display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(255,255,255,.16); border-radius: 999px;
          padding: 12px 24px; text-transform: uppercase; letter-spacing: .14em; font-family: 'JetBrains Mono', monospace; font-size: .74rem;
          text-decoration: none; color: rgba(255,255,255,.72);
        }

        .hero {
          position: relative; min-height: 100vh; overflow: hidden;
          padding: 9rem 5vw 4rem;
          display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(360px, .85fr);
          gap: 3rem; align-items: center;
        }
        .hero::before {
          content: ''; position: absolute; inset: -20% -10% auto auto; width: 48rem; height: 48rem; border-radius: 50%;
          background: radial-gradient(circle, rgba(56,189,248,.14), transparent 62%);
          filter: blur(10px); pointer-events: none;
        }
        .hero::after {
          content: ''; position: absolute; inset: auto auto -18% -10%; width: 32rem; height: 32rem; border-radius: 50%;
          background: radial-gradient(circle, rgba(251,191,36,.10), transparent 65%);
          filter: blur(18px); pointer-events: none;
        }
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-bg video {
          width: 100%; height: 100%; object-fit: cover;
          opacity: .24; filter: grayscale(100%) contrast(1.15);
          animation: drift 22s ease-in-out infinite;
        }
        .hero-bg::after {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, rgba(5,5,5,.04) 0%, rgba(5,5,5,.12) 20%, rgba(5,5,5,.84) 78%, #050505 100%),
            linear-gradient(to right, rgba(5,5,5,.68) 0%, rgba(5,5,5,.18) 48%, rgba(5,5,5,.72) 100%);
        }
        .hero-grain {
          position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: .045;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 220px;
        }
        .hero-copy, .hero-panel { position: relative; z-index: 3; }
        .hero-status {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 1.85rem;
          opacity: ${loaded ? 1 : 0}; animation: ${loaded ? 'fadeIn .55s ease both .2s' : 'none'};
        }
        .status-dot { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; animation: pulse 2.4s infinite; }
        .status-text {
          font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .22em; text-transform: uppercase;
          color: rgba(255,255,255,.22);
        }
        .status-div { width: 24px; height: 1px; background: rgba(255,255,255,.12); }
        .hero-title {
          font-family: 'Playfair Display', serif; font-weight: 900; line-height: .88; letter-spacing: -.04em; margin-bottom: 1.4rem;
        }
        .title-row { display: block; overflow: hidden; }
        .title-main {
          display: inline-block; font-size: clamp(58px, 8.8vw, 126px);
          animation: ${loaded ? 'revealUp 1s cubic-bezier(0.16,1,0.3,1) both .2s' : 'none'};
        }
        .title-outline {
          display: inline-block; font-size: clamp(58px, 8.8vw, 126px); font-style: italic;
          color: transparent; -webkit-text-stroke: 1.4px rgba(255,255,255,.24);
          animation: ${loaded ? 'revealUp 1s cubic-bezier(0.16,1,0.3,1) both .36s' : 'none'};
        }
        .title-tag {
          display: block; margin-top: .6rem;
          font-size: clamp(13px, 1.6vw, 20px); color: rgba(255,255,255,.22); font-style: italic;
          animation: ${loaded ? 'revealUp 1s cubic-bezier(0.16,1,0.3,1) both .54s' : 'none'};
        }
        .hero-desc {
          max-width: 640px; font-size: 14px; line-height: 1.95; color: rgba(255,255,255,.3); font-weight: 300;
          opacity: ${loaded ? 1 : 0}; animation: ${loaded ? 'fadeUp .8s cubic-bezier(0.16,1,0.3,1) both .82s' : 'none'};
        }
        .hero-actions {
          margin-top: 2rem; display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
          opacity: ${loaded ? 1 : 0}; animation: ${loaded ? 'fadeUp .8s cubic-bezier(0.16,1,0.3,1) both .98s' : 'none'};
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: #050505; padding: 13px 28px; border-radius: 8px;
          font-size: 11px; font-weight: 700; text-decoration: none; letter-spacing: .08em; text-transform: uppercase;
          transition: transform .22s, box-shadow .22s;
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 24px 60px rgba(255,255,255,.16); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .12em; text-transform: uppercase;
          color: rgba(255,255,255,.28); transition: color .2s;
        }
        .btn-ghost::after { content: '->'; display: inline-block; transition: transform .2s; }
        .btn-ghost:hover { color: rgba(255,255,255,.82); }
        .btn-ghost:hover::after { transform: translateX(4px); }

        .hero-panel {
          border: 1px solid rgba(255,255,255,.08);
          background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.02));
          border-radius: 28px; overflow: hidden; backdrop-filter: blur(18px);
          box-shadow: 0 30px 90px rgba(0,0,0,.36);
          opacity: ${loaded ? 1 : 0}; animation: ${loaded ? 'fadeUp .9s cubic-bezier(0.16,1,0.3,1) both 1.05s' : 'none'};
        }
        .panel-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.2rem; border-bottom: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.02);
        }
        .panel-eyebrow {
          font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.22);
        }
        .panel-metric { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-style: italic; color: rgba(255,255,255,.84); }
        .panel-body { padding: 1.2rem; display: grid; gap: .9rem; }
        .signal-card {
          padding: 1rem 1.05rem; border-radius: 18px; border: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.03);
        }
        .signal-head {
          display: flex; justify-content: space-between; gap: 1rem; align-items: center;
          font-family: 'JetBrains Mono', monospace; font-size: .64rem; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.22);
          margin-bottom: .7rem;
        }
        .signal-head strong { color: rgba(255,255,255,.78); }
        .signal-desc { font-size: .88rem; line-height: 1.75; color: rgba(255,255,255,.32); }
        .signal-bar { margin-top: .9rem; width: 100%; height: 4px; border-radius: 999px; background: rgba(255,255,255,.06); overflow: hidden; }
        .signal-fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, rgba(255,255,255,.46), rgba(255,255,255,.9)); }
        .signal-row {
          display: grid; grid-template-columns: 46px 1fr auto; gap: 1rem; align-items: center;
          padding: .92rem 1rem; border-radius: 16px; border: 1px solid rgba(255,255,255,.05); background: rgba(255,255,255,.02);
        }
        .signal-no { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: rgba(255,255,255,.22); font-style: italic; }
        .signal-copy strong { display: block; font-size: .92rem; color: rgba(255,255,255,.82); font-weight: 600; }
        .signal-copy span { display: block; margin-top: .22rem; font-size: .76rem; line-height: 1.55; color: rgba(255,255,255,.28); }
        .signal-tag { font-family: 'JetBrains Mono', monospace; font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.42); }

        .ticker {
          position: relative; z-index: 5; overflow: hidden;
          border-top: 1px solid rgba(255,255,255,.05);
          padding: 11px 0; background: rgba(5,5,5,.88); backdrop-filter: blur(16px);
        }
        .ticker-track { display: flex; white-space: nowrap; animation: ticker 32s linear infinite; }
        .ticker-item {
          display: inline-flex; align-items: center; gap: 14px; padding: 0 30px;
          font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.16);
        }
        .ticker-sep { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,.16); }

        .section {
          max-width: 1240px; margin: 0 auto; padding: 110px 5vw;
          opacity: 0; transform: translateY(38px);
          transition: opacity .9s cubic-bezier(0.16,1,0.3,1), transform .9s cubic-bezier(0.16,1,0.3,1);
        }
        .section.vis { opacity: 1; transform: translateY(0); }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .24em; text-transform: uppercase; color: rgba(255,255,255,.18); margin-bottom: 20px;
        }
        .eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: rgba(255,255,255,.15); }
        .h2 {
          font-family: 'Playfair Display', serif; font-size: clamp(34px, 4.3vw, 58px); font-weight: 900;
          letter-spacing: -.03em; color: rgba(255,255,255,.92); line-height: 1.06;
        }
        .h2 em { font-style: italic; color: rgba(255,255,255,.26); font-weight: 400; }
        .section-copy {
          margin-top: 1.1rem; max-width: 760px; font-size: 14px; line-height: 1.9; color: rgba(255,255,255,.28); font-weight: 300;
        }

        .stats-grid { margin-top: 3.5rem; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; }
        .stat {
          padding: 1.4rem; border-radius: 20px; border: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.02);
        }
        .stat strong { display: block; font-family: 'Playfair Display', serif; font-size: 2.2rem; font-style: italic; color: rgba(255,255,255,.94); line-height: 1; }
        .stat span { display: block; margin-top: .45rem; font-family: 'JetBrains Mono', monospace; font-size: .66rem; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.22); }

        .proof-grid { margin-top: 3.5rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
        .proof-card {
          position: relative; padding: 1.5rem; border-radius: 24px; overflow: hidden;
          border: 1px solid rgba(255,255,255,.06); background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.015));
          min-height: 210px; opacity: 0; transform: translateY(24px);
        }
        .section.vis .proof-card { animation: scaleIn .7s cubic-bezier(0.16,1,0.3,1) forwards; }
        .proof-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.05), transparent 44%);
          opacity: 0; transition: opacity .2s;
        }
        .proof-card:hover::before { opacity: 1; }
        .proof-card > * { position: relative; z-index: 1; }
        .proof-kicker {
          font-family: 'JetBrains Mono', monospace; font-size: .64rem; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.22);
          margin-bottom: 1rem;
        }
        .proof-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; line-height: 1; color: rgba(255,255,255,.92); }
        .proof-copy { margin-top: .95rem; font-size: .92rem; line-height: 1.8; color: rgba(255,255,255,.3); }
        .proof-link {
          margin-top: 1.2rem; display: inline-flex; align-items: center; gap: 7px;
          font-family: 'JetBrains Mono', monospace; font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; text-decoration: none; color: rgba(255,255,255,.7);
        }
        .proof-link::after { content: '->'; transition: transform .2s; }
        .proof-link:hover::after { transform: translateX(4px); }

        .split-grid { margin-top: 3.5rem; display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(280px, .9fr); gap: 1.4rem; align-items: start; }
        .story-panel {
          padding: 1.8rem; border-radius: 24px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.02);
        }
        .story-panel p { font-size: .96rem; line-height: 1.95; color: rgba(255,255,255,.31); }
        .story-panel p + p { margin-top: 1rem; }
        .stack-list { border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.015); }
        .stack-row {
          position: relative; display: grid; grid-template-columns: 56px 1fr auto; gap: 1rem; align-items: center;
          padding: 1.15rem 1.2rem; border-bottom: 1px solid rgba(255,255,255,.05);
          transition: background .22s;
        }
        .stack-row:last-child { border-bottom: none; }
        .stack-row::after {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          background: rgba(255,255,255,.7); transform: scaleY(0); transform-origin: bottom; transition: transform .35s cubic-bezier(0.16,1,0.3,1);
        }
        .stack-row:hover { background: rgba(255,255,255,.025); }
        .stack-row:hover::after { transform: scaleY(1); }
        .s-num { font-family: 'Playfair Display', serif; font-size: 1rem; color: rgba(255,255,255,.2); font-style: italic; }
        .s-title { display: block; font-size: .92rem; font-weight: 600; color: rgba(255,255,255,.82); margin-bottom: .18rem; }
        .s-desc { display: block; font-size: .76rem; line-height: 1.55; color: rgba(255,255,255,.26); }
        .s-arr { color: rgba(255,255,255,.08); transition: color .2s, transform .2s; }
        .stack-row:hover .s-arr { color: rgba(255,255,255,.42); transform: translateX(5px); }

        .contact-box {
          display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 1rem; align-items: center;
          padding: 1.8rem; border-radius: 28px; border: 1px solid rgba(255,255,255,.06);
          background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.015));
        }
        .contact-box strong { display: block; font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 3rem); line-height: 1.02; color: rgba(255,255,255,.94); }
        .contact-box p { margin-top: .75rem; font-size: .96rem; line-height: 1.8; color: rgba(255,255,255,.3); max-width: 720px; }

        .footer {
          padding: 26px 5vw; border-top: 1px solid rgba(255,255,255,.05);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .footer-logo { font-family: 'JetBrains Mono', monospace; font-size: .82rem; color: rgba(255,255,255,.18); }
        .footer-copy { font-size: 10px; color: rgba(255,255,255,.12); letter-spacing: .05em; }

        @media (max-width: 1080px) {
          .hero { grid-template-columns: 1fr; gap: 2rem; padding-top: 8.4rem; }
          .stats-grid, .proof-grid { grid-template-columns: 1fr 1fr; }
          .split-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 960px) {
          .nav-links, .nav-sep { display: none; }
          .hamburger { display: flex; }
        }
        @media (max-width: 720px) {
          .hero { padding-top: 7.8rem; }
          .stats-grid, .proof-grid { grid-template-columns: 1fr; }
          .contact-box { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .hero-actions { flex-direction: column; align-items: flex-start; }
          .stack-row { grid-template-columns: 42px 1fr; }
          .s-arr { display: none; }
        }
      `}</style>

      <div className="mobile-menu">
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="/contact" className="mobile-menu-cta" onClick={() => setMenuOpen(false)}>
          <div className="nav-cta-dot" />
          Contact Me
        </a>
      </div>

      <nav className="nav">
        <div className="nav-left">
          <a href="/" className="nav-logo">&lt;SY/&gt;</a>
          <div className="nav-sep" />
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={link.label === 'Home' ? 'active' : ''}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/contact" className="nav-cta">
            <div className="nav-cta-dot" />
            Contact Me
          </a>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-bg">
            <video autoPlay muted loop playsInline>
              <source src="/video3.webm" type="video/webm" />
            </video>
          </div>
          <div className="hero-grain" />

          <div className="hero-copy">
            <div className="hero-status">
              <div className="status-dot" />
              <span className="status-text">Available for selective roles</span>
              <div className="status-div" />
              <span className="status-text">Full stack + DevOps</span>
            </div>

            <h1 className="hero-title">
              <span className="title-row">
                <span className="title-main">Software</span>
              </span>
              <span className="title-row">
                <span className="title-outline">that earns trust.</span>
              </span>
              <span className="title-row">
                <span className="title-tag">I build products, pipelines, and cloud systems that feel calm on the surface and solid underneath.</span>
              </span>
            </h1>

            <p className="hero-desc">
              Full stack engineer focused on shipping production-grade software with Spring Boot, React, and AWS.
              The goal is not just a nice demo. It is systems that deploy cleanly, recover quickly, and look intentional when people open them.
            </p>

            <div className="hero-actions">
              <a href="/projects" className="btn-primary">
                View Projects
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="/contact" className="btn-ghost">Start a conversation</a>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="panel-top">
              <span className="panel-eyebrow">Live build board</span>
              <span className="panel-metric">10</span>
            </div>
            <div className="panel-body">
              <div className="signal-card">
                <div className="signal-head">
                  <strong>Current focus</strong>
                  <span>Production ready</span>
                </div>
                <div className="signal-desc">
                  DevOps-heavy delivery, cloud-native reliability, and clean engineering that scales beyond the first demo.
                </div>
                <div className="signal-bar">
                  <div className="signal-fill" style={{ width: '88%' }} />
                </div>
              </div>

              <div className="signal-row">
                <span className="signal-no">01</span>
                <div className="signal-copy">
                  <strong>Backend systems</strong>
                  <span>Spring Boot, APIs, auth, persistence.</span>
                </div>
                <span className="signal-tag">Build</span>
              </div>
              <div className="signal-row">
                <span className="signal-no">02</span>
                <div className="signal-copy">
                  <strong>DevOps & Cloud</strong>
                  <span>AWS, Terraform, CI/CD, observability.</span>
                </div>
                <span className="signal-tag">Ship</span>
              </div>
              <div className="signal-row">
                <span className="signal-no">03</span>
                <div className="signal-copy">
                  <strong>Frontend polish</strong>
                  <span>React interfaces that feel deliberate.</span>
                </div>
                <span className="signal-tag">Show</span>
              </div>
              <div className="signal-row">
                <span className="signal-no">04</span>
                <div className="signal-copy">
                  <strong>Proof of work</strong>
                  <span>Projects, simulations, and public repositories.</span>
                </div>
                <span className="signal-tag">Trust</span>
              </div>
            </div>
          </aside>

          <div className="ticker">
            <div className="ticker-track">
              {[...Array(2)].map((_, repeatIndex) =>
                TICKER_ITEMS.map((item, itemIndex) => (
                  <span key={`${repeatIndex}-${itemIndex}`} className="ticker-item">
                    {item}
                    <span className="ticker-sep" />
                  </span>
                )),
              )}
            </div>
          </div>
        </section>

        <section id="overview" ref={r(0)} className={`section${visible[0] ? ' vis' : ''}`}>
          <div className="eyebrow">By the numbers</div>
          <h2 className="h2">A portfolio built to <br /><em>look expensive and feel precise.</em></h2>
          <p className="section-copy">
            Every section is designed to do one job: make the work feel credible, modern, and hard to ignore.
            The page leads with proof, then lets the detail deepen the story.
          </p>

          <div className="stats-grid">
            {STATS.map((stat) => (
              <div className="stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="proof-grid">
            {PROOF_POINTS.map((point, index) => (
              <article key={point.title} className="proof-card" style={{ animationDelay: `${index * 90}ms` } as CSSProperties}>
                <div className="proof-kicker">Proof {index + 1}</div>
                <h3 className="proof-title">{point.title}</h3>
                <p className="proof-copy">{point.copy}</p>
                <a href={point.link} className="proof-link">Open projects</a>
              </article>
            ))}
          </div>
        </section>

        <section id="about" ref={r(1)} className={`section${visible[1] ? ' vis' : ''}`} style={{ paddingTop: 0 }}>
          <div className="eyebrow">Working style</div>
          <h2 className="h2">More than tools.<br /><em>An execution style.</em></h2>
          <p className="section-copy">
            The strongest version of this portfolio is one where the backend, frontend, cloud, and presentation all point to the same thing:
            someone who knows how to turn work into something people can trust.
          </p>

          <div className="split-grid">
            <div className="story-panel">
              <p>
                I like systems that are easy to reason about, resilient under load, and honest about what they do.
                That means clean APIs, good infra decisions, and interfaces that make the work feel sharper rather than noisier.
              </p>
              <p>
                This home page should do what the best portfolio intros do: show the output, hint at the depth, and make the next click feel obvious.
              </p>
            </div>

            <div className="stack-list">
              {STACK_ROWS.map((row) => (
                <div className="stack-row" key={row.number}>
                  <span className="s-num">{row.number}</span>
                  <div>
                    <span className="s-title">{row.title}</span>
                    <span className="s-desc">{row.desc}</span>
                  </div>
                  <svg className="s-arr" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={r(2)} className={`section${visible[2] ? ' vis' : ''}`} style={{ paddingTop: 0 }}>
          <div className="eyebrow">Direct path</div>
          <h2 className="h2">Want the work?<br /><em>Jump straight to the proof.</em></h2>
          <p className="section-copy">
            The portfolio is split across projects, skills, and experience so recruiters and builders can move fast.
            Each route focuses on a different kind of evidence.
          </p>

          <div className="proof-grid">
            <article className="proof-card">
              <div className="proof-kicker">Projects</div>
              <h3 className="proof-title">DevOps and product builds</h3>
              <p className="proof-copy">Look at the projects section for deployment pipelines, cloud systems, and shipped applications.</p>
              <a href="/projects" className="proof-link">Go to projects</a>
            </article>
            <article className="proof-card">
              <div className="proof-kicker">Skills</div>
              <h3 className="proof-title">Backend, cloud, and frontend stack</h3>
              <p className="proof-copy">See the technology groups behind the work and how the stack is organized.</p>
              <a href="/skills" className="proof-link">Go to skills</a>
            </article>
            <article className="proof-card">
              <div className="proof-kicker">Experience</div>
              <h3 className="proof-title">Job simulations and industry proof</h3>
              <p className="proof-copy">Review the virtual experiences and certificates that support the portfolio story.</p>
              <a href="/experience" className="proof-link">Go to experience</a>
            </article>
          </div>
        </section>

        <section ref={r(3)} className={`section${visible[3] ? ' vis' : ''}`} style={{ paddingTop: 0 }}>
          <div className="contact-box">
            <div>
              <div className="eyebrow">Contact</div>
              <strong>Ready when you are.</strong>
              <p>
                If the work feels like a fit, reach out. I am always up for building something that is cleaner, faster, and better
                than the first version people expect.
              </p>
            </div>
            <a href="/contact" className="btn-primary">
              Contact Me
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span className="footer-logo">&lt;SY/&gt;</span>
        <span className="footer-copy">© 2026 Sumeet Yadav · Built with passion & coffee</span>
      </footer>
    </>
  )
}
