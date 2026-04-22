import { useEffect, useRef, useState, type CSSProperties } from 'react'

type ExperienceItem = {
  id: string
  company: string
  role: string
  date: string
  logo: string
  bullets: string[]
  certificate: string
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'jpmorgan',
    company: 'JPMorgan Chase',
    role: 'Software Engineering Job Simulation',
    date: 'January 2026',
    logo: 'https://media.designrush.com/inspiration_images/757008/conversions/JPMorgan-Chase-Logo-SVG-desktop.jpg',
    bullets: [
      'Integrated Kafka into a Spring Boot microservice to consume and deserialize high-volume transaction messages using a configurable topic and embedded Kafka test framework.',
      'Implemented transaction validation and persistence logic with Spring Data JPA and an H2 SQL database, including entity modeling and balance updates across relational User records.',
      'Connected the service to an external REST Incentive API using RestTemplate, processing incentive responses and incorporating them into transactional workflows.',
      'Developed a REST endpoint for querying user balances, returning JSON responses through a Spring controller while maintaining clean architectural boundaries.',
      'Verified system behavior using Maven test suites and debugger-driven inspection, ensuring reliability across message ingestion, database operations, and external API interactions.',
    ],
    certificate: 'https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_68cb08cb0b0b9899833e6350_1769868873310_completion_certificate.pdf',
  },
  {
    id: 'aws',
    company: 'Amazon Web Services (AWS)',
    role: 'APAC Solutions Architecture Virtual Experience',
    date: 'February 2026',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    bullets: [
      'Designed a simple and scalable hosting architecture based on Elastic Beanstalk for a client experiencing significant growth and slow response times.',
      'Described the proposed architecture in plain language ensuring the client understood how it works and how costs are calculated.',
    ],
    certificate: 'https://www.theforage.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_68cb08cb0b0b9899833e6350_1769915156093_completion_certificate.pdf',
  },
  {
    id: 'walmart',
    company: 'Walmart Global Tech USA',
    role: 'Advanced Software Engineering Virtual Experience',
    date: 'February 2026',
    logo: 'https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/uploadedManual-65acd11ba70c8_walmart_.jpeg?d=200x200',
    bullets: [
      'Completed the Advanced Software Engineering Job Simulation solving difficult technical projects for a variety of teams at Walmart.',
      "Developed a novel version of a heap data structure in Java for Walmart's shipping department, showcasing strong problem-solving and algorithmic skills.",
      'Designed a UML class diagram for a data processor, considering different operating modes and database connections.',
      "Created an entity relationship diagram to design a new database accounting for all requirements provided by Walmart's pet department.",
    ],
    certificate: 'https://www.theforage.com/completion-certificates/prBZoAihniNijyD6d/oX6f9BbCL9kJDJzfg_prBZoAihniNijyD6d_68cb08cb0b0b9899833e6350_1770963809787_completion_certificate.pdf',
  },
  {
    id: 'datacom',
    company: 'Datacom',
    role: 'Introduction to Cloud Job Simulation',
    date: 'February 2026',
    logo: 'https://images.seeklogo.com/logo-png/50/1/datacom-group-ltd-logo-png_seeklogo-505770.png',
    bullets: [
      'Completed a simulation focused on understanding the DevOps engineering role at Datacom.',
      'Registered an application on the cloud for a hypothetical client, WCD Bank.',
      'Created a GitHub Actions workflow for automated deployment pipelines.',
    ],
    certificate: 'https://www.theforage.com/completion-certificates/gCW7Xki5Y3vNpBmnn/qsuRRyXDZ7Dj2QFx4_gCW7Xki5Y3vNpBmnn_68cb08cb0b0b9899833e6350_1770352089987_completion_certificate.pdf',
  },
  {
    id: 'ea',
    company: 'Electronic Arts',
    role: 'Product Management Job Simulation',
    date: 'February 2026',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Electronic-Arts-Logo.svg',
    bullets: [
      'Developed a solid understanding of different KPIs, and selected the most appropriate KPIs for measuring and assessing specific business problems related to a strategy RPG mobile game.',
      'Demonstrated knowledge of key performance indicators within the video game industry.',
      'Broke down tasks for creating a data-driven video game presentation.',
    ],
    certificate: 'https://www.theforage.com/completion-certificates/j43dGscQHtJJ57N54/5genWYpfo5b57G7yv_j43dGscQHtJJ57N54_68cb08cb0b0b9899833e6350_1769936642285_completion_certificate.pdf',
  },
]

export default function Experience() {
  const [loaded, setLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState<Record<number, boolean>>({})
  const [brokenLogos, setBrokenLogos] = useState<Record<string, boolean>>({})
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
        .section { max-width: 1100px; margin: 0 auto; padding: 110px 5vw; opacity: 0; transform: translateY(38px); transition: opacity .9s cubic-bezier(0.16,1,0.3,1), transform .9s cubic-bezier(0.16,1,0.3,1); }
        .section.vis { opacity: 1; transform: translateY(0); }
        .eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .24em; text-transform: uppercase; color: rgba(255,255,255,.18); margin-bottom: 22px; }
        .eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: rgba(255,255,255,.15); }
        .h2 { font-family: 'Playfair Display', serif; font-size: clamp(34px, 4.2vw, 58px); font-weight: 900; letter-spacing: -.025em; color: rgba(255,255,255,.9); line-height: 1.06; }
        .h2 em { font-style: italic; color: rgba(255,255,255,.28); font-weight: 400; }
        .section-copy { margin-top: 1.2rem; max-width: 760px; font-size: 14px; line-height: 1.95; color: rgba(255,255,255,.28); font-weight: 300; }
        .exp-list { margin-top: 3.6rem; display: grid; gap: 1.6rem; }
        .exp-card { position: relative; overflow: hidden; padding: 2rem 2.2rem; border-radius: 24px; border: 1px solid rgba(255,255,255,.07); background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.015)); opacity: 0; transform: translateY(24px); }
        .section.vis .exp-card { animation: scaleIn .7s cubic-bezier(0.16,1,0.3,1) forwards; }
        .exp-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, rgba(255,255,255,.55), transparent); opacity: 0; transition: opacity .3s; }
        .exp-card:hover::before { opacity: 1; }
        .exp-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1.5rem; margin-bottom: 1.5rem; }
        .exp-company { display: flex; align-items: center; gap: 1rem; }
        .company-logo { width: 58px; height: 58px; background: #fff; border-radius: 14px; display: grid; place-items: center; padding: 8px; flex-shrink: 0; overflow: hidden; }
        .company-logo img { width: 100%; height: 100%; object-fit: contain; }
        .company-logo-fallback { font-family: 'JetBrains Mono', monospace; font-size: .72rem; font-weight: 600; letter-spacing: .08em; color: #050505; text-transform: uppercase; }
        .exp-info h3 { font-family: 'Playfair Display', serif; font-size: 1.6rem; line-height: 1; color: rgba(255,255,255,.93); margin-bottom: .35rem; }
        .exp-role { font-size: .9rem; color: rgba(255,255,255,.32); }
        .exp-date { font-family: 'JetBrains Mono', monospace; font-size: .76rem; color: rgba(255,255,255,.5); white-space: nowrap; padding: .45rem .85rem; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09); border-radius: 999px; margin-top: .2rem; letter-spacing: .08em; text-transform: uppercase; }
        .exp-body ul { list-style: none; display: grid; gap: .7rem; }
        .exp-body li { color: rgba(255,255,255,.3); font-size: .93rem; line-height: 1.8; padding-left: 1.4rem; position: relative; }
        .exp-body li::before { content: '▹'; position: absolute; left: 0; color: rgba(255,255,255,.45); }
        .exp-footer { margin-top: 1.5rem; }
        .cert-link { display: inline-flex; align-items: center; gap: .55rem; padding: .78rem 1.2rem; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.15); border-radius: 12px; color: rgba(255,255,255,.88); text-decoration: none; font-size: .78rem; font-family: 'JetBrains Mono', monospace; letter-spacing: .08em; text-transform: uppercase; transition: all .2s; }
        .cert-link:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.28); transform: translateY(-2px); }
        .footer { padding: 26px 5vw; border-top: 1px solid rgba(255,255,255,.05); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .footer-logo { font-family: 'JetBrains Mono', monospace; font-size: .82rem; color: rgba(255,255,255,.18); }
        .footer-copy { font-size: 10px; color: rgba(255,255,255,.12); letter-spacing: .05em; }
        @media (max-width: 1080px) { .hero { grid-template-columns: 1fr; gap: 2rem; padding-top: 8.5rem; } }
        @media (max-width: 960px) { .nav-links, .nav-sep { display: none; } .hamburger { display: flex; } }
        @media (max-width: 640px) { .hero-actions { flex-direction: column; align-items: flex-start; } .exp-header { flex-direction: column; } .exp-date { align-self: flex-start; } .exp-company { align-items: flex-start; } }
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
              <li key={link.label}><a href={link.href} className={link.label === 'Experience' ? 'active' : ''}>{link.label}</a></li>
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
            <span className="status-text">Virtual experiences</span>
            <div className="status-div" />
            <span className="status-text">Forage simulations</span>
          </div>
          <h1 className="hero-title">
            <span className="title-row"><span className="title-main">Job</span></span>
            <span className="title-row"><span className="title-outline">Simulations</span></span>
            <span className="title-row"><span className="title-tag">- Hands-on proof that the learning is practical</span></span>
          </h1>
          <p className="hero-desc">
            These experiences reflect applied learning across software engineering, cloud architecture, systems thinking, and product decision making.
            They add practical context to my portfolio by showing how I have worked through real-world style tasks and scenarios.
          </p>
          <div className="hero-actions">
            <a href="#experience-list" className="btn-primary">
              View Experience
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#/projects" className="btn-ghost">See projects</a>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="panel-top">
            <span className="panel-eyebrow">Experience summary</span>
            <span className="panel-metric">05</span>
          </div>
          <div className="panel-body">
            <div className="metric-row">
              <span className="metric-no">01</span>
              <div className="metric-copy">
                <strong>Banking systems</strong>
                <span>Kafka, Spring Boot, JPA, and transaction workflows.</span>
              </div>
              <span className="metric-value">JPMC</span>
            </div>
            <div className="metric-row">
              <span className="metric-no">02</span>
              <div className="metric-copy">
                <strong>Cloud architecture</strong>
                <span>Scalable hosting and client-facing AWS design thinking.</span>
              </div>
              <span className="metric-value">AWS</span>
            </div>
            <div className="metric-row">
              <span className="metric-no">03</span>
              <div className="metric-copy">
                <strong>Engineering depth</strong>
                <span>Algorithms, UML, database design, and system structure.</span>
              </div>
              <span className="metric-value">WMT</span>
            </div>
            <div className="metric-row">
              <span className="metric-no">04</span>
              <div className="metric-copy">
                <strong>Product awareness</strong>
                <span>Cloud, deployment workflows, and product thinking.</span>
              </div>
              <span className="metric-value">PM</span>
            </div>
          </div>
        </aside>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          {[...Array(2)].map((_, repeatIndex) =>
            ['JPMorgan', 'AWS', 'Walmart', 'Datacom', 'Electronic Arts', 'Forage'].map((item, itemIndex) => (
              <span key={`${repeatIndex}-${itemIndex}`} className="ticker-item">
                {item}
                <span className="ticker-sep" />
              </span>
            )),
          )}
        </div>
      </div>

      <section id="experience-list" ref={r(0)} className={`section${visible[0] ? ' vis' : ''}`}>
        <div className="eyebrow">Hands-on learning</div>
        <h2 className="h2">Experience that turns<br /><em>theory into execution.</em></h2>
        <p className="section-copy">
          These virtual job simulations highlight applied problem solving rather than only academic study.
          They demonstrate how I approach engineering tasks, architecture choices, and communication in realistic settings.
        </p>

        <div className="exp-list">
          {EXPERIENCES.map((item, index) => (
            <article key={item.id} className="exp-card" style={{ animationDelay: `${index * 90}ms` } as CSSProperties}>
              <div className="exp-header">
                <div className="exp-company">
                  <div className="company-logo">
                    {brokenLogos[item.id] ? (
                      <span className="company-logo-fallback">
                        {item.company
                          .split(' ')
                          .map((word) => word[0])
                          .join('')
                          .slice(0, 3)}
                      </span>
                    ) : (
                      <img
                        src={item.logo}
                        alt={item.company}
                        onError={() => setBrokenLogos((current) => ({ ...current, [item.id]: true }))}
                      />
                    )}
                  </div>
                  <div className="exp-info">
                    <h3>{item.company}</h3>
                    <p className="exp-role">{item.role}</p>
                  </div>
                </div>
                <span className="exp-date">{item.date}</span>
              </div>

              <div className="exp-body">
                <ul>
                  {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </div>

              <div className="exp-footer">
                <a href={item.certificate} target="_blank" rel="noreferrer" className="cert-link">
                  View Certificate
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span className="footer-logo">&lt;SY/&gt;</span>
        <span className="footer-copy">© 2026 Sumeet Yadav · Built with passion & coffee</span>
      </footer>
    </>
  )
}
