import { useEffect, useRef, useState, type CSSProperties } from 'react'

type Game = {
  name: string
  platform: string
  badge: string
  logo: string
  background?: string
  padding?: string
}

type Mindset = {
  number: string
  title: string
  desc: string
}

type SpotifyState = {
  status: 'playing' | 'recent' | 'offline' | 'misconfigured' | 'error'
  title?: string
  artist?: string
  album?: string
  albumArt?: string
  songUrl?: string
  playedAt?: string
  message?: string
  source?: 'lastfm'
}

const GAMES: Game[] = [
  {
    name: 'Clash of Clans',
    platform: 'Mobile',
    badge: 'OG since day 1',
    logo: 'https://tse3.mm.bing.net/th/id/OIP.xLZUPyz7oMtmfLc_fR09zgHaHa?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    name: 'Valorant',
    platform: 'PC',
    badge: 'Tactical FPS',
    logo: 'https://th.bing.com/th/id/OIP.HRmJ30646Uq5_w74SRBbNgHaHa?o=7&cb=defcachec2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    background: '#ff4655',
    padding: '6px',
  },
  {
    name: 'Counter-Strike 2',
    platform: 'PC',
    badge: 'The classic',
    logo: 'https://th.bing.com/th/id/OIP.beLc4wCZZWBZs11o0-QqDwHaHa?o=7&cb=defcachec2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    background: '#1b2838',
    padding: '4px',
  },
  {
    name: 'Red Dead Redemption 2',
    platform: 'PC',
    badge: 'Masterpiece',
    logo: 'https://pngimg.com/uploads/red_dead_redemption/red_dead_redemption_PNG20.png',
    background: '#1a0800',
  },
]

const MINDSET: Mindset[] = [
  { number: '01', title: 'Architecture First', desc: 'I think about how systems scale before writing code. Bad architecture always sends the bill later.' },
  { number: '02', title: 'Security Matters', desc: 'JWT, Spring Security, rate limiting, and hardening are requirements, not optional polish.' },
  { number: '03', title: 'Ship It', desc: 'I build, deploy, learn, and iterate. Real usage teaches more than perfect local demos.' },
  { number: '04', title: 'Late-Night Focus', desc: 'Coffee, dark themes, and long focused sessions are where a lot of my best work happens.' },
  { number: '05', title: 'Always Learning', desc: 'Every project, bug, and simulation is fuel for leveling up how I build.' },
  { number: '06', title: 'Horizon Chaser', desc: 'There is always a next system, next challenge, and next standard to grow toward.' },
]

const VIBES = ['Ambient Focus', 'Instrumental Mixes', 'Deep Work Sessions', 'Evening Builds', 'Coffee and Code']

export default function About() {
  const [loaded, setLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState<Record<number, boolean>>({})
  const [spotify, setSpotify] = useState<SpotifyState | null>(null)
  const [spotifyLoading, setSpotifyLoading] = useState(true)
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

  useEffect(() => {
    let active = true

    const loadSpotify = async () => {
      try {
        const response = await fetch('/api/spotify')
        if (!response.ok) {
          throw new Error('Failed to load Spotify state')
        }

        const payload = (await response.json()) as SpotifyState
        if (active) {
          setSpotify(payload)
        }
      } catch {
        if (active) {
          setSpotify({ status: 'offline' })
        }
      } finally {
        if (active) {
          setSpotifyLoading(false)
        }
      }
    }

    loadSpotify()
    const interval = window.setInterval(loadSpotify, 60000)

    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [])

  const r = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el
  }

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
        @keyframes revealUp { from { clip-path: inset(100% 0 0 0); opacity: 0; } to { clip-path: inset(0% 0 0 0); opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
        @keyframes drift { 0% { transform: translate(0,0); } 33% { transform: translate(25px,-15px); } 66% { transform: translate(-15px,12px); } 100% { transform: translate(0,0); } }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scaleIn { from { opacity: 0; transform: translateY(28px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes barDance { from { transform: scaleY(.3); } to { transform: scaleY(1); } }

        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; padding: 1.6rem 5vw; display: flex; align-items: center; justify-content: space-between; background: ${scrolled ? 'rgba(5,5,5,0.85)' : 'rgba(5,5,5,0.4)'}; backdrop-filter: blur(12px); transition: background .4s; }
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

        .hero { position: relative; min-height: 100vh; overflow: hidden; padding: 10rem 5vw 8rem; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(320px, .95fr); gap: 4rem; align-items: end; }
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-bg video { width: 100%; height: 100%; object-fit: cover; opacity: .28; filter: grayscale(100%) contrast(1.1); animation: drift 22s ease-in-out infinite; }
        .hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(5,5,5,.1) 0%, rgba(5,5,5,.0) 20%, rgba(5,5,5,.8) 72%, #050505 100%), linear-gradient(to right, rgba(5,5,5,.65) 0%, rgba(5,5,5,.1) 60%, rgba(5,5,5,.5) 100%); }
        .hero-grain { position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: .04; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 220px; }
        .hero-copy, .hero-panel { position: relative; z-index: 3; }
        .hero-status { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 2rem; opacity: ${loaded ? 1 : 0}; animation: ${loaded ? 'fadeIn .6s ease both .25s' : 'none'}; }
        .status-dot { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; animation: pulse 2.5s infinite; }
        .status-text { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .24em; text-transform: uppercase; color: rgba(255,255,255,.25); }
        .status-div { width: 24px; height: 1px; background: rgba(255,255,255,.12); }
        .hero-title { font-family: 'Playfair Display', serif; font-weight: 900; line-height: .88; letter-spacing: -.03em; margin-bottom: 2.2rem; }
        .title-row { display: block; overflow: hidden; }
        .title-main { display: inline-block; font-size: clamp(58px, 9vw, 132px); color: #fff; animation: ${loaded ? 'revealUp 1.1s cubic-bezier(0.16,1,0.3,1) both .25s' : 'none'}; }
        .title-outline { display: inline-block; font-size: clamp(58px, 9vw, 132px); font-style: italic; -webkit-text-stroke: 1.5px rgba(255,255,255,.3); color: transparent; animation: ${loaded ? 'revealUp 1.1s cubic-bezier(0.16,1,0.3,1) both .42s' : 'none'}; }
        .title-tag { display: block; font-size: clamp(13px, 1.6vw, 22px); font-style: italic; font-weight: 400; color: rgba(255,255,255,.2); letter-spacing: .02em; margin-top: .7rem; animation: ${loaded ? 'revealUp 1.1s cubic-bezier(0.16,1,0.3,1) both .58s' : 'none'}; }
        .hero-desc { max-width: 560px; font-size: 14px; line-height: 1.95; color: rgba(255,255,255,.3); font-weight: 300; opacity: ${loaded ? 1 : 0}; animation: ${loaded ? 'fadeUp .9s cubic-bezier(0.16,1,0.3,1) both .9s' : 'none'}; }
        .hero-actions { margin-top: 2.4rem; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; opacity: ${loaded ? 1 : 0}; animation: ${loaded ? 'fadeUp .9s cubic-bezier(0.16,1,0.3,1) both 1.05s' : 'none'}; }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #050505; padding: 13px 28px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; font-family: 'Outfit', sans-serif; letter-spacing: .08em; text-transform: uppercase; transition: transform .22s, box-shadow .22s; }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 24px 60px rgba(255,255,255,.16); }
        .btn-ghost { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: rgba(255,255,255,.28); text-decoration: none; letter-spacing: .12em; text-transform: uppercase; transition: color .2s; display: flex; align-items: center; gap: 8px; }
        .btn-ghost::after { content: '->'; transition: transform .2s; display: inline-block; }
        .btn-ghost:hover { color: rgba(255,255,255,.8); }
        .btn-ghost:hover::after { transform: translateX(4px); }
        .hero-panel { border: 1px solid rgba(255,255,255,.08); background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02)); border-radius: 24px; overflow: hidden; backdrop-filter: blur(14px); opacity: ${loaded ? 1 : 0}; animation: ${loaded ? 'fadeUp .9s cubic-bezier(0.16,1,0.3,1) both 1.15s' : 'none'}; box-shadow: 0 30px 80px rgba(0,0,0,.35); }
        .panel-top { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.2rem; border-bottom: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.02); }
        .panel-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.22); }
        .panel-metric { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-style: italic; color: rgba(255,255,255,.82); }
        .panel-body { padding: 1.4rem 1.2rem 1.5rem; display: grid; gap: 1rem; }
        .metric-row { display: grid; grid-template-columns: 54px 1fr auto; gap: 1rem; align-items: center; padding: .95rem 1rem; background: rgba(255,255,255,.02); border: 1px solid rgba(255,255,255,.05); border-radius: 16px; }
        .metric-no { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: rgba(255,255,255,.22); font-style: italic; }
        .metric-copy strong { display: block; font-size: .9rem; color: rgba(255,255,255,.8); font-weight: 600; }
        .metric-copy span { display: block; margin-top: .25rem; font-size: .75rem; line-height: 1.6; color: rgba(255,255,255,.28); }
        .metric-value { font-family: 'JetBrains Mono', monospace; font-size: .72rem; letter-spacing: .12em; color: rgba(255,255,255,.42); }
        .ticker { position: relative; z-index: 5; border-top: 1px solid rgba(255,255,255,.05); overflow: hidden; padding: 11px 0; background: rgba(5,5,5,.85); backdrop-filter: blur(14px); }
        .ticker-track { display: flex; white-space: nowrap; animation: ticker 34s linear infinite; }
        .ticker-item { display: inline-flex; align-items: center; gap: 14px; padding: 0 30px; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.15); }
        .ticker-sep { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,.15); }
        .section { max-width: 1200px; margin: 0 auto; padding: 110px 5vw; opacity: 0; transform: translateY(38px); transition: opacity .9s cubic-bezier(0.16,1,0.3,1), transform .9s cubic-bezier(0.16,1,0.3,1); }
        .section.vis { opacity: 1; transform: translateY(0); }
        .eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .24em; text-transform: uppercase; color: rgba(255,255,255,.18); margin-bottom: 22px; }
        .eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: rgba(255,255,255,.15); }
        .h2 { font-family: 'Playfair Display', serif; font-size: clamp(34px, 4.2vw, 58px); font-weight: 900; letter-spacing: -.025em; color: rgba(255,255,255,.9); line-height: 1.06; }
        .h2 em { font-style: italic; color: rgba(255,255,255,.28); font-weight: 400; }
        .section-copy { margin-top: 1.2rem; max-width: 760px; font-size: 14px; line-height: 1.95; color: rgba(255,255,255,.28); font-weight: 300; }
        .quote-card { margin-top: 3.5rem; padding: 2.6rem; border-radius: 24px; border: 1px solid rgba(255,255,255,.07); background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.015)); position: relative; overflow: hidden; }
        .quote-card::before { content: '"'; position: absolute; top: -.9rem; left: 1rem; font-family: 'Playfair Display', serif; font-size: 9rem; line-height: 1; color: rgba(255,255,255,.05); }
        .quote-card strong { position: relative; display: block; font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3rem); text-align: center; color: rgba(255,255,255,.92); }
        .two-col { margin-top: 2rem; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; }
        .big-card, .mindset-card, .cta-card { border-radius: 24px; border: 1px solid rgba(255,255,255,.07); background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.015)); padding: 1.8rem; opacity: 0; transform: translateY(24px); }
        .section.vis .big-card, .section.vis .mindset-card, .section.vis .cta-card { animation: scaleIn .7s cubic-bezier(0.16,1,0.3,1) forwards; }
        .card-head { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.2rem; }
        .card-icon { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.05); font-family: 'JetBrains Mono', monospace; font-size: .8rem; color: rgba(255,255,255,.72); }
        .card-head h3 { font-family: 'Playfair Display', serif; font-size: 1.8rem; line-height: 1; color: rgba(255,255,255,.9); }
        .card-copy { font-size: .95rem; line-height: 1.85; color: rgba(255,255,255,.29); margin-bottom: 1.4rem; }
        .game-list { display: grid; gap: .8rem; }
        .game-item { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .85rem 1rem; border-radius: 16px; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03); transition: transform .2s, background .2s, border-color .2s; }
        .game-item:hover { transform: translateX(4px); background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.14); }
        .game-left { display: flex; align-items: center; gap: .85rem; }
        .game-logo-wrap { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; flex-shrink: 0; display: grid; place-items: center; }
        .game-logo-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .game-name { font-size: .92rem; font-weight: 600; color: rgba(255,255,255,.88); }
        .game-platform { margin-top: .18rem; font-family: 'JetBrains Mono', monospace; font-size: .65rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.25); }
        .game-badge { font-family: 'JetBrains Mono', monospace; font-size: .64rem; padding: .25rem .6rem; border: 1px solid rgba(255,255,255,.1); border-radius: 999px; color: rgba(255,255,255,.45); white-space: nowrap; }
        .now-playing { display: flex; align-items: center; gap: .7rem; padding: .7rem .9rem; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; margin-bottom: .95rem; }
        .np-dot { width: 8px; height: 8px; background: #ff2020; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 10px rgba(255,32,32,.7); }
        .np-bars { display: flex; align-items: flex-end; gap: 2px; height: 15px; }
        .np-bar { width: 3px; background: rgba(255,255,255,.55); border-radius: 2px; animation: barDance .8s ease-in-out infinite alternate; }
        .np-bar:nth-child(1) { height: 55%; animation-delay: 0s; }
        .np-bar:nth-child(2) { height: 100%; animation-delay: .15s; }
        .np-bar:nth-child(3) { height: 40%; animation-delay: .3s; }
        .np-bar:nth-child(4) { height: 75%; animation-delay: .08s; }
        .np-text { font-size: .8rem; color: rgba(255,255,255,.45); }
        .np-text strong { color: rgba(255,255,255,.9); }
        .spotify-card { margin-bottom: 1rem; padding: 1rem; border-radius: 18px; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03); }
        .spotify-head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: .95rem; }
        .spotify-badge { display: inline-flex; align-items: center; gap: .45rem; padding: .38rem .7rem; border-radius: 999px; border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.04); font-family: 'JetBrains Mono', monospace; font-size: .64rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.6); }
        .spotify-badge.live { color: #7df7b3; }
        .spotify-layout { display: grid; grid-template-columns: 88px 1fr; gap: 1rem; align-items: center; }
        .spotify-art { width: 88px; height: 88px; border-radius: 16px; overflow: hidden; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); display: grid; place-items: center; }
        .spotify-art img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .spotify-art-fallback { font-family: 'JetBrains Mono', monospace; font-size: .75rem; letter-spacing: .14em; color: rgba(255,255,255,.45); }
        .spotify-title { font-size: 1rem; font-weight: 600; color: rgba(255,255,255,.92); }
        .spotify-meta { margin-top: .3rem; font-size: .82rem; line-height: 1.7; color: rgba(255,255,255,.35); }
        .spotify-link { display: inline-flex; align-items: center; gap: .45rem; margin-top: .85rem; color: rgba(255,255,255,.72); text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; }
        .spotify-link:hover { color: #fff; }
        .spotify-progress-meta { margin-top: .45rem; font-family: 'JetBrains Mono', monospace; font-size: .64rem; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.3); }
        .spotify-empty { padding: 1rem; border-radius: 18px; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.02); font-size: .85rem; line-height: 1.8; color: rgba(255,255,255,.34); margin-bottom: 1rem; }
        .vibe-tags { display: flex; flex-wrap: wrap; gap: .55rem; }
        .vibe-tag { padding: .4rem .75rem; border-radius: 999px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); font-size: .75rem; color: rgba(255,255,255,.48); }
        .mindset-grid { margin-top: 1.6rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
        .mindset-item { padding: 1.2rem; border-radius: 18px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.025); }
        .mindset-number { display: inline-block; font-family: 'Playfair Display', serif; font-size: 1.5rem; font-style: italic; color: rgba(255,255,255,.2); margin-bottom: .6rem; }
        .mindset-item h4 { font-size: .94rem; font-weight: 600; color: rgba(255,255,255,.85); margin-bottom: .35rem; }
        .mindset-item p { font-size: .8rem; line-height: 1.65; color: rgba(255,255,255,.28); }
        .cta-card { margin-top: 2rem; text-align: center; }
        .cta-card h3 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3rem); color: rgba(255,255,255,.94); }
        .cta-card p { margin: 1rem auto 1.7rem; max-width: 760px; font-size: 1rem; line-height: 1.9; color: rgba(255,255,255,.3); }
        .cta-actions { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        .footer { padding: 26px 5vw; border-top: 1px solid rgba(255,255,255,.05); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .footer-logo { font-family: 'JetBrains Mono', monospace; font-size: .82rem; color: rgba(255,255,255,.18); }
        .footer-copy { font-size: 10px; color: rgba(255,255,255,.12); letter-spacing: .05em; }
        @media (max-width: 1080px) { .hero { grid-template-columns: 1fr; gap: 2rem; padding-top: 8.5rem; } .two-col, .mindset-grid { grid-template-columns: 1fr; } }
        @media (max-width: 960px) { .nav-links, .nav-sep { display: none; } .hamburger { display: flex; } }
        @media (max-width: 640px) { .hero-actions, .cta-actions { flex-direction: column; align-items: stretch; } .game-item { align-items: flex-start; flex-direction: column; } .game-badge { white-space: normal; } }
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
              <li key={link.label}><a href={link.href} className={link.label === 'About' ? 'active' : ''}>{link.label}</a></li>
            ))}
          </ul>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#/contact" className="nav-cta"><div className="nav-cta-dot" />Get in touch</a>
          <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen((open) => !open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

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
            <span className="status-text">The human behind the code</span>
            <div className="status-div" />
            <span className="status-text">Mumbai Â· India</span>
          </div>
          <h1 className="hero-title">
            <span className="title-row"><span className="title-main">About</span></span>
            <span className="title-row"><span className="title-outline">Me</span></span>
            <span className="title-row"><span className="title-tag">- Engineer, strategist, and builder</span></span>
          </h1>
          <p className="hero-desc">
            I am a full stack engineer who enjoys building reliable systems, learning through real projects, and improving how software performs in practical use.
            This page highlights the mindset, interests, and habits that shape how I approach my work.
          </p>
          <div className="hero-actions">
            <a href="#about-content" className="btn-primary">
              Explore More
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#/projects" className="btn-ghost">See projects</a>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="panel-top">
            <span className="panel-eyebrow">Quick profile</span>
            <span className="panel-metric">06</span>
          </div>
          <div className="panel-body">
            {MINDSET.slice(0, 4).map((item) => (
              <div key={item.number} className="metric-row">
                <span className="metric-no">{item.number}</span>
                <div className="metric-copy">
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
                <span className="metric-value">Mindset</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          {[...Array(2)].map((_, repeatIndex) =>
            ['Gaming', 'Music', 'Architecture', 'Security', 'Focused Execution', 'Continuous Learning'].map((item, itemIndex) => (
              <span key={`${repeatIndex}-${itemIndex}`} className="ticker-item">
                {item}
                <span className="ticker-sep" />
              </span>
            )),
          )}
        </div>
      </div>

      <section id="about-content" ref={r(0)} className={`section${visible[0] ? ' vis' : ''}`}>
        <div className="eyebrow">Beyond code</div>
        <h2 className="h2">Beyond development.<br /><em>The mindset behind the work.</em></h2>
        <p className="section-copy">
          My work is shaped by curiosity, consistency, and a strong interest in how good systems are designed.
          These interests outside daily coding help me stay thoughtful, focused, and adaptable on technical work.
        </p>

        <div className="quote-card">
          <strong>Chasing the Horizon</strong>
        </div>

        <div className="two-col">
          <article className="big-card" style={{ animationDelay: '80ms' } as CSSProperties}>
            <div className="card-head">
              <div className="card-icon">GM</div>
              <h3>Gaming</h3>
            </div>
            <p className="card-copy">
              Outside software, gaming has strengthened my strategic thinking, patience, and ability to stay calm under pressure.
              It is one of the ways I continue sharpening focus, decision making, and problem solving.
            </p>
            <div className="game-list">
              {GAMES.map((game) => (
                <div key={game.name} className="game-item">
                  <div className="game-left">
                    <div className="game-logo-wrap" style={{ background: game.background ?? 'transparent', padding: game.padding ?? '0' }}>
                      <img src={game.logo} alt={game.name} />
                    </div>
                    <div>
                      <div className="game-name">{game.name}</div>
                      <div className="game-platform">{game.platform}</div>
                    </div>
                  </div>
                  <span className="game-badge">{game.badge}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="big-card" style={{ animationDelay: '160ms' } as CSSProperties}>
            <div className="card-head">
              <div className="card-icon">MU</div>
              <h3>Music</h3>
            </div>
            <p className="card-copy">
              Instrumental and ambient music help me stay focused during deep work sessions.
              This feed shows what I am listening to right now, or the last track I played through my Last.fm activity.
            </p>
            <div className="now-playing">
              <div className="np-dot" />
              <div className="np-bars">
                <div className="np-bar" /><div className="np-bar" /><div className="np-bar" /><div className="np-bar" />
              </div>
              <div className="np-text"><strong>Music activity</strong> · live from Last.fm</div>
            </div>
            {spotifyLoading ? (
              <div className="spotify-empty">Loading your latest music activity...</div>
            ) : spotify && (spotify.status === 'playing' || spotify.status === 'recent') ? (
              <div className="spotify-card">
                <div className="spotify-head">
                  <span className={`spotify-badge${spotify.status === 'playing' ? ' live' : ''}`}>
                    {spotify.status === 'playing' ? 'Now playing' : 'Last played'}
                  </span>
                  <span className="spotify-badge">Last.fm</span>
                </div>
                <div className="spotify-layout">
                  <div className="spotify-art">
                    {spotify.albumArt ? (
                      <img src={spotify.albumArt} alt={spotify.album ?? 'Album artwork'} />
                    ) : (
                      <span className="spotify-art-fallback">SP</span>
                    )}
                  </div>
                  <div>
                    <div className="spotify-title">{spotify.title}</div>
                    <div className="spotify-meta">
                      {spotify.artist}
                      {spotify.album ? ` · ${spotify.album}` : ''}
                    </div>
                    {spotify.songUrl ? (
                      <a href={spotify.songUrl} target="_blank" rel="noreferrer" className="spotify-link">
                        Open track
                      </a>
                    ) : null}
                    {spotify.status === 'playing' ? (
                      <div className="spotify-progress-meta">Listening right now</div>
                    ) : spotify.playedAt ? (
                      <div className="spotify-progress-meta">Last played: {new Date(spotify.playedAt).toLocaleString()}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="spotify-empty">
                {spotify?.message ?? 'Music activity will appear here after you connect Last.fm and add LASTFM_API_KEY and LASTFM_USERNAME in Cloudflare Pages.'}
              </div>
            )}
            <div className="vibe-tags">
              {VIBES.map((tag) => <span key={tag} className="vibe-tag">{tag}</span>)}
            </div>
          </article>
        </div>
      </section>

      <section ref={r(1)} className={`section${visible[1] ? ' vis' : ''}`} style={{ paddingTop: 0 }}>
        <div className="eyebrow">How I think</div>
        <h2 className="h2">How I work when<br /><em>things get real.</em></h2>
        <div className="mindset-card">
          <div className="mindset-grid">
            {MINDSET.map((item) => (
              <div key={item.number} className="mindset-item">
                <span className="mindset-number">{item.number}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-card">
          <h3>Let&apos;s Build Something</h3>
          <p>
            I care about thoughtful engineering, practical delivery, and steady improvement over time.
            If you are looking for someone who values both technical depth and execution, this portfolio reflects that approach.
          </p>
          <div className="cta-actions">
            <a href="#/contact" className="btn-primary">
              Get In Touch
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#/projects" className="btn-ghost">See my work</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span className="footer-logo">&lt;SY/&gt;</span>
        <span className="footer-copy">Â© 2026 Sumeet Yadav Â· Built with passion & coffee</span>
      </footer>
    </>
  )
}


