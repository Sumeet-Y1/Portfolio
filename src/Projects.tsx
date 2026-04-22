import { useEffect, useRef, useState, type CSSProperties } from 'react'

type ProjectTech = {
  label: string
  logo?: string
}

type ProjectLink = {
  label: string
  href: string
  variant?: 'primary' | 'outline'
}

type Project = {
  id: string
  title: string
  date: string
  icon: string
  summary: string
  tech: ProjectTech[]
  links: ProjectLink[]
  status?: {
    label: string
    progress: number
    note: string
  }
}

const PROJECTS: Project[] = [
  {
    id: 'pipelineforge',
    title: 'PipelineForge',
    date: 'Active Development · 2026',
    icon: 'CFG',
    summary:
      'Enterprise-grade async task processing platform with microservices architecture, CI/CD automation, and AWS infrastructure provisioned via Terraform. Built around distributed job processing, containerized deployment, and observability from day one.',
    tech: [
      { label: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { label: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { label: 'GitHub Actions', logo: 'https://icon.icepanel.io/Technology/svg/GitHub-Actions.svg' },
      { label: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { label: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
      { label: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { label: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
    links: [
      { label: 'View Code', href: 'https://github.com/Sumeet-Y1/PipeLine-Forage' },
      { label: 'Documentation', href: 'https://documentation-underconstruction.netlify.app/', variant: 'outline' },
    ],
    status: {
      label: 'Building in Progress',
      progress: 70,
      note: 'Expected launch: Q2 2026 · Live demo coming soon',
    },
  },
  {
    id: 'prodpulse',
    title: 'ProdPulse.AI',
    date: 'January 2026',
    icon: 'AI',
    summary:
      "AI-powered backend service that analyzes production error logs using Groq's LLaMA 3.3-70B model. Includes IP-based rate limiting, MySQL-backed history tracking, severity classification, and fast REST delivery.",
    tech: [
      { label: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { label: 'Spring AI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { label: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { label: 'Groq API' },
      { label: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { label: 'Rate Limiting' },
    ],
    links: [
      { label: 'Live Demo', href: 'https://prodpulse.pages.dev/login' },
      { label: 'About', href: 'https://prodpulseai.pages.dev/docs', variant: 'outline' },
    ],
  },
  {
    id: 'aureumpicks',
    title: 'AureumPicks',
    date: 'November 2025',
    icon: 'EC',
    summary:
      'Premium e-commerce platform featuring JWT authentication, email OTP verification via Brevo API, complete cart flows, and secure checkout patterns built with modern backend security in mind.',
    tech: [
      { label: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { label: 'Spring Security', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { label: 'JWT' },
      { label: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { label: 'Brevo API' },
    ],
    links: [
      { label: 'Live Demo', href: 'https://aureumpicks.onrender.com/' },
      { label: 'View Code', href: 'https://github.com/Sumeet-Y1/ecommerce--fullstack', variant: 'outline' },
    ],
  },
  {
    id: 'edapt',
    title: 'Edapt',
    date: 'October 2025',
    icon: 'API',
    summary:
      'RESTful API for student data management with full CRUD support and a layered architecture focused on maintainability, readability, and straightforward scaling.',
    tech: [
      { label: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { label: 'Spring Data JPA', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { label: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { label: 'Maven', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg' },
    ],
    links: [
      { label: 'Live Demo', href: 'https://student-api-springboot-algk.onrender.com/' },
      { label: 'View Code', href: 'https://github.com/Sumeet-Y1/student-api-springboot', variant: 'outline' },
    ],
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    date: 'December 2025',
    icon: 'WEB',
    summary:
      'Modern personal portfolio with a dark cinematic visual system, animated page transitions, and a cleaner presentation for projects, skills, and professional identity.',
    tech: [
      { label: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { label: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { label: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    ],
    links: [
      { label: 'View Code', href: 'https://github.com/Sumeet-Y1/Portfolio' },
    ],
  },
]

const PROJECT_MARQUEE = ['Production Apps', 'Spring Boot', 'React', 'AWS', 'Cloud Infra', 'Modern UI', 'APIs', 'Microservices']

export default function Projects() {
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
        @keyframes drift { 0% { transform: translate(0, 0); } 33% { transform: translate(25px, -15px); } 66% { transform: translate(-15px, 12px); } 100% { transform: translate(0, 0); } }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scaleIn { from { opacity: 0; transform: translateY(28px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          padding: 1.6rem 5vw;
          display: flex; align-items: center; justify-content: space-between;
          background: ${scrolled ? 'rgba(5,5,5,0.85)' : 'rgba(5,5,5,0.4)'};
          backdrop-filter: blur(12px);
          transition: background .4s;
        }
        .nav-left { display: flex; align-items: center; gap: 2.5rem; }
        .nav-logo { font-family: 'JetBrains Mono', monospace; font-size: .85rem; color: rgba(255,255,255,.85); text-decoration: none; letter-spacing: .1em; }
        .nav-sep { width: 1px; height: 16px; background: rgba(255,255,255,.1); }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a {
          color: rgba(255,255,255,.25); text-decoration: none; font-size: .7rem;
          letter-spacing: .14em; text-transform: uppercase; transition: color .2s;
          position: relative; padding-bottom: 2px;
        }
        .nav-links a::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: rgba(255,255,255,.5); transform: scaleX(0); transform-origin: left; transition: transform .25s;
        }
        .nav-links a:hover,
        .nav-links a.active { color: rgba(255,255,255,.85); }
        .nav-links a:hover::after,
        .nav-links a.active::after { transform: scaleX(1); }
        .nav-cta {
          display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(255,255,255,.18);
          color: rgba(255,255,255,.55); padding: 8px 20px; border-radius: 100px;
          font-family: 'JetBrains Mono', monospace; font-size: .68rem; letter-spacing: .14em;
          text-transform: uppercase; text-decoration: none; transition: all .25s;
        }
        .nav-cta:hover { border-color: rgba(255,255,255,.5); color: #fff; background: rgba(255,255,255,.05); }
        .nav-cta-dot { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; animation: pulse 2s infinite; flex-shrink: 0; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: rgba(255,255,255,.7); transition: all .3s; }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
        .mobile-menu {
          position: fixed; inset: 0; z-index: 150; background: rgba(5,5,5,.97);
          backdrop-filter: blur(20px); display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 2.5rem; opacity: ${menuOpen ? 1 : 0}; pointer-events: ${menuOpen ? 'all' : 'none'}; transition: opacity .35s;
        }
        .mobile-menu a {
          font-family: 'Playfair Display', serif; font-size: clamp(32px, 8vw, 52px);
          font-weight: 700; color: rgba(255,255,255,.8); text-decoration: none; transition: color .2s;
        }
        .mobile-menu a:hover { color: #fff; }

        .hero {
          position: relative; min-height: 100vh; overflow: hidden;
          padding: 10rem 5vw 8rem;
          display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(320px, .92fr);
          gap: 4rem; align-items: end;
        }
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-bg video { width: 100%; height: 100%; object-fit: cover; opacity: .28; filter: grayscale(100%) contrast(1.1); animation: drift 22s ease-in-out infinite; }
        .hero-bg::after {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, rgba(5,5,5,.1) 0%, rgba(5,5,5,.0) 20%, rgba(5,5,5,.8) 72%, #050505 100%),
            linear-gradient(to right, rgba(5,5,5,.65) 0%, rgba(5,5,5,.1) 60%, rgba(5,5,5,.5) 100%);
        }
        .hero-grain {
          position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: .04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 220px;
        }
        .hero-copy, .hero-panel { position: relative; z-index: 3; }
        .hero-status {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 2rem;
          opacity: ${loaded ? 1 : 0}; animation: ${loaded ? 'fadeIn .6s ease both .25s' : 'none'};
        }
        .status-dot { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; animation: pulse 2.5s infinite; }
        .status-text { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .24em; text-transform: uppercase; color: rgba(255,255,255,.25); }
        .status-div { width: 24px; height: 1px; background: rgba(255,255,255,.12); }
        .hero-title { font-family: 'Playfair Display', serif; font-weight: 900; line-height: .88; letter-spacing: -.03em; margin-bottom: 2.2rem; }
        .title-row { display: block; overflow: hidden; }
        .title-main { display: inline-block; font-size: clamp(58px, 9vw, 132px); color: #fff; animation: ${loaded ? 'revealUp 1.1s cubic-bezier(0.16,1,0.3,1) both .25s' : 'none'}; }
        .title-outline {
          display: inline-block; font-size: clamp(58px, 9vw, 132px); font-style: italic;
          -webkit-text-stroke: 1.5px rgba(255,255,255,.3); color: transparent;
          animation: ${loaded ? 'revealUp 1.1s cubic-bezier(0.16,1,0.3,1) both .42s' : 'none'};
        }
        .title-tag {
          display: block; font-size: clamp(13px, 1.6vw, 22px); font-style: italic; font-weight: 400;
          color: rgba(255,255,255,.2); letter-spacing: .02em; margin-top: .7rem;
          animation: ${loaded ? 'revealUp 1.1s cubic-bezier(0.16,1,0.3,1) both .58s' : 'none'};
        }
        .hero-desc {
          max-width: 560px; font-size: 14px; line-height: 1.95; color: rgba(255,255,255,.3); font-weight: 300;
          opacity: ${loaded ? 1 : 0}; animation: ${loaded ? 'fadeUp .9s cubic-bezier(0.16,1,0.3,1) both .9s' : 'none'};
        }
        .hero-actions {
          margin-top: 2.4rem; display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
          opacity: ${loaded ? 1 : 0}; animation: ${loaded ? 'fadeUp .9s cubic-bezier(0.16,1,0.3,1) both 1.05s' : 'none'};
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #050505; padding: 13px 28px;
          border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; font-family: 'Outfit', sans-serif;
          letter-spacing: .08em; text-transform: uppercase; transition: transform .22s, box-shadow .22s;
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 24px 60px rgba(255,255,255,.16); }
        .btn-ghost {
          font-family: 'JetBrains Mono', monospace; font-size: 10px; color: rgba(255,255,255,.28); text-decoration: none;
          letter-spacing: .12em; text-transform: uppercase; transition: color .2s; display: flex; align-items: center; gap: 8px;
        }
        .btn-ghost::after { content: '->'; transition: transform .2s; display: inline-block; }
        .btn-ghost:hover { color: rgba(255,255,255,.8); }
        .btn-ghost:hover::after { transform: translateX(4px); }
        .hero-panel {
          border: 1px solid rgba(255,255,255,.08);
          background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
          border-radius: 24px; overflow: hidden; backdrop-filter: blur(14px);
          opacity: ${loaded ? 1 : 0}; animation: ${loaded ? 'fadeUp .9s cubic-bezier(0.16,1,0.3,1) both 1.15s' : 'none'};
          box-shadow: 0 30px 80px rgba(0,0,0,.35);
        }
        .panel-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.2rem; border-bottom: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.02);
        }
        .panel-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.22); }
        .panel-metric { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-style: italic; color: rgba(255,255,255,.82); }
        .panel-body { padding: 1.4rem 1.2rem 1.5rem; display: grid; gap: 1rem; }
        .metric-row {
          display: grid; grid-template-columns: 54px 1fr auto; gap: 1rem; align-items: center;
          padding: .95rem 1rem; background: rgba(255,255,255,.02); border: 1px solid rgba(255,255,255,.05); border-radius: 16px;
        }
        .metric-no { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: rgba(255,255,255,.22); font-style: italic; }
        .metric-copy strong { display: block; font-size: .9rem; color: rgba(255,255,255,.8); font-weight: 600; }
        .metric-copy span { display: block; margin-top: .25rem; font-size: .75rem; line-height: 1.6; color: rgba(255,255,255,.28); }
        .metric-value { font-family: 'JetBrains Mono', monospace; font-size: .72rem; letter-spacing: .12em; color: rgba(255,255,255,.42); }
        .ticker {
          position: relative; z-index: 5; border-top: 1px solid rgba(255,255,255,.05); overflow: hidden;
          padding: 11px 0; background: rgba(5,5,5,.85); backdrop-filter: blur(14px);
        }
        .ticker-track { display: flex; white-space: nowrap; animation: ticker 34s linear infinite; }
        .ticker-item {
          display: inline-flex; align-items: center; gap: 14px; padding: 0 30px;
          font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .2em;
          text-transform: uppercase; color: rgba(255,255,255,.15);
        }
        .ticker-sep { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,.15); }
        .section {
          max-width: 1180px; margin: 0 auto; padding: 110px 5vw;
          opacity: 0; transform: translateY(38px);
          transition: opacity .9s cubic-bezier(0.16,1,0.3,1), transform .9s cubic-bezier(0.16,1,0.3,1);
        }
        .section.vis { opacity: 1; transform: translateY(0); }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 10px; font-family: 'JetBrains Mono', monospace; font-size: 9px;
          letter-spacing: .24em; text-transform: uppercase; color: rgba(255,255,255,.18); margin-bottom: 22px;
        }
        .eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: rgba(255,255,255,.15); }
        .h2 {
          font-family: 'Playfair Display', serif; font-size: clamp(34px, 4.2vw, 58px); font-weight: 900;
          letter-spacing: -.025em; color: rgba(255,255,255,.9); line-height: 1.06;
        }
        .h2 em { font-style: italic; color: rgba(255,255,255,.28); font-weight: 400; }
        .section-copy {
          margin-top: 1.2rem; max-width: 760px; font-size: 14px; line-height: 1.95; color: rgba(255,255,255,.28); font-weight: 300;
        }
        .project-list { margin-top: 4rem; display: grid; gap: 1.7rem; }
        .project-card {
          position: relative; padding: 2rem; border-radius: 24px;
          border: 1px solid rgba(255,255,255,.07);
          background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.015));
          overflow: hidden; opacity: 0; transform: translateY(24px);
        }
        .section.vis .project-card { animation: scaleIn .7s cubic-bezier(0.16,1,0.3,1) forwards; }
        .project-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.04), transparent 45%);
          opacity: 0; transition: opacity .25s;
        }
        .project-card:hover::before { opacity: 1; }
        .project-card.uc::after {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.015) 20px, rgba(255,255,255,.015) 40px);
          animation: drift 24s linear infinite;
          pointer-events: none;
        }
        .project-card > * { position: relative; z-index: 1; }
        .status-badge {
          display: inline-flex; align-items: center; gap: .45rem; padding: .4rem .85rem; margin-bottom: 1rem;
          border-radius: 999px; border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.06);
          font-family: 'JetBrains Mono', monospace; font-size: .67rem; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.78);
        }
        .project-head { display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start; margin-bottom: 1rem; }
        .project-title { font-family: 'Playfair Display', serif; font-size: clamp(30px, 3vw, 42px); line-height: .95; color: rgba(255,255,255,.92); }
        .project-date { margin-top: .45rem; font-family: 'JetBrains Mono', monospace; font-size: .7rem; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.22); }
        .project-icon {
          width: 64px; height: 64px; border-radius: 18px; flex-shrink: 0; display: grid; place-items: center;
          border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.05);
          font-family: 'JetBrains Mono', monospace; font-size: .9rem; letter-spacing: .14em; color: rgba(255,255,255,.74);
        }
        .project-desc { font-size: .95rem; line-height: 1.9; color: rgba(255,255,255,.3); margin-bottom: 1.4rem; max-width: 920px; }
        .progress-wrap { margin: 1rem 0 1.1rem; }
        .progress-bar { width: 100%; height: 4px; background: rgba(255,255,255,.07); border-radius: 999px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, rgba(255,255,255,.5), rgba(255,255,255,.9)); border-radius: inherit; position: relative; }
        .progress-fill::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent);
          animation: shimmer 2.5s infinite;
        }
        .progress-info {
          display: flex; justify-content: space-between; gap: 1rem; margin-top: .55rem;
          font-family: 'JetBrains Mono', monospace; font-size: .66rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.25);
        }
        .progress-pct { color: rgba(255,255,255,.75); }
        .launch-note { margin-bottom: 1.4rem; font-size: .82rem; line-height: 1.8; color: rgba(255,255,255,.24); font-style: italic; }
        .tech-list { display: flex; flex-wrap: wrap; gap: .7rem; }
        .tech-tag {
          display: inline-flex; align-items: center; gap: .5rem; padding: .68rem .9rem; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03);
          font-family: 'JetBrains Mono', monospace; font-size: .67rem; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.55);
        }
        .tech-logo { width: 16px; height: 16px; object-fit: contain; flex-shrink: 0; }
        .tech-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,.35); }
        .link-row { margin-top: 1.5rem; display: flex; gap: .8rem; flex-wrap: wrap; }
        .project-link {
          display: inline-flex; align-items: center; gap: .5rem; padding: .78rem 1.25rem; border-radius: 12px;
          text-decoration: none; font-size: .82rem; letter-spacing: .08em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,.18); transition: transform .2s, background .2s, border-color .2s;
          font-family: 'JetBrains Mono', monospace;
        }
        .project-link.primary { background: #fff; color: #050505; border-color: #fff; }
        .project-link.outline { background: transparent; color: rgba(255,255,255,.76); }
        .project-link:hover { transform: translateY(-2px); }
        .project-link.outline:hover { border-color: rgba(255,255,255,.48); background: rgba(255,255,255,.05); color: #fff; }
        .summary-grid { margin-top: 4rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
        .summary-card {
          padding: 1.5rem; border-radius: 20px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.02);
        }
        .summary-card strong { display: block; font-family: 'Playfair Display', serif; font-size: 2.1rem; color: rgba(255,255,255,.9); }
        .summary-card span { display: block; margin-top: .45rem; font-family: 'JetBrains Mono', monospace; font-size: .66rem; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.22); }
        .footer {
          padding: 26px 5vw; border-top: 1px solid rgba(255,255,255,.05);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .footer-logo { font-family: 'JetBrains Mono', monospace; font-size: .82rem; color: rgba(255,255,255,.18); }
        .footer-copy { font-size: 10px; color: rgba(255,255,255,.12); letter-spacing: .05em; }
        @media (max-width: 1080px) {
          .hero { grid-template-columns: 1fr; gap: 2rem; padding-top: 8.5rem; }
          .summary-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 960px) {
          .nav-links, .nav-sep { display: none; }
          .hamburger { display: flex; }
        }
        @media (max-width: 720px) {
          .project-head { flex-direction: column; }
          .project-icon { display: none; }
        }
        @media (max-width: 640px) {
          .hero-actions { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="mobile-menu">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>

      <nav className="nav">
        <div className="nav-left">
          <a href="#/" className="nav-logo">&lt;SY/&gt;</a>
          <div className="nav-sep" />
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={link.label === 'Projects' ? 'active' : ''}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#/contact" className="nav-cta">
            <div className="nav-cta-dot" />
            Hire Me
          </a>
          <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen((open) => !open)} aria-label="Menu">
            <span />
            <span />
            <span />
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
            <span className="status-text">Portfolio</span>
            <div className="status-div" />
            <span className="status-text">Featured builds</span>
          </div>

          <h1 className="hero-title">
            <span className="title-row"><span className="title-main">Featured</span></span>
            <span className="title-row"><span className="title-outline">Projects</span></span>
            <span className="title-row"><span className="title-tag">- Selected work focused on delivery and architecture</span></span>
          </h1>

          <p className="hero-desc">
            This section presents projects that reflect my strengths in backend systems, cloud-aware development, and practical product delivery.
            Each project highlights real technical decisions, deployment thinking, and implementation depth.
          </p>

          <div className="hero-actions">
            <a href="#project-list" className="btn-primary">
              View Projects
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#/" className="btn-ghost">Back to home</a>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="panel-top">
            <span className="panel-eyebrow">Project stack</span>
            <span className="panel-metric">05</span>
          </div>
          <div className="panel-body">
            <div className="metric-row">
              <span className="metric-no">01</span>
              <div className="metric-copy">
                <strong>Backend heavy</strong>
                <span>Spring Boot, APIs, auth, and data-first systems.</span>
              </div>
              <span className="metric-value">Java</span>
            </div>
            <div className="metric-row">
              <span className="metric-no">02</span>
              <div className="metric-copy">
                <strong>Cloud aware</strong>
                <span>Docker, Terraform, AWS, and delivery pipelines.</span>
              </div>
              <span className="metric-value">Infra</span>
            </div>
            <div className="metric-row">
              <span className="metric-no">03</span>
              <div className="metric-copy">
                <strong>Live deployments</strong>
                <span>Demos, code links, and public proof of work.</span>
              </div>
              <span className="metric-value">Launch</span>
            </div>
            <div className="metric-row">
              <span className="metric-no">04</span>
              <div className="metric-copy">
                <strong>Modern polish</strong>
                <span>Cleaner presentation without losing technical detail.</span>
              </div>
              <span className="metric-value">UI</span>
            </div>
          </div>
        </aside>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          {[...Array(2)].map((_, repeatIndex) =>
            PROJECT_MARQUEE.map((item, itemIndex) => (
              <span key={`${repeatIndex}-${itemIndex}`} className="ticker-item">
                {item}
                <span className="ticker-sep" />
              </span>
            )),
          )}
        </div>
      </div>

      <section id="project-list" ref={r(0)} className={`section${visible[0] ? ' vis' : ''}`}>
        <div className="eyebrow">Featured work</div>
        <h2 className="h2">Projects that show<br /><em>how you actually build.</em></h2>
        <p className="section-copy">
          These projects demonstrate how I approach system design, application architecture, and production-minded implementation.
          The goal is to show both technical range and the ability to turn ideas into usable software.
        </p>

        <div className="summary-grid">
          <div className="summary-card">
            <strong>5</strong>
            <span>Featured Projects</span>
          </div>
          <div className="summary-card">
            <strong>3+</strong>
            <span>Live Public Demos</span>
          </div>
          <div className="summary-card">
            <strong>70%</strong>
            <span>PipelineForge Progress</span>
          </div>
        </div>

        <div className="project-list">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className={`project-card${project.status ? ' uc' : ''}`}
              style={{ animationDelay: `${index * 90}ms` } as CSSProperties}
            >
              {project.status ? <div className="status-badge">{project.status.label}</div> : null}

              <div className="project-head">
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-date">{project.date}</div>
                </div>
                <div className="project-icon">{project.icon}</div>
              </div>

              <p className="project-desc">{project.summary}</p>

              {project.status ? (
                <>
                  <div className="progress-wrap">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${project.status.progress}%` }} />
                    </div>
                    <div className="progress-info">
                      <span>Development Progress</span>
                      <span className="progress-pct">{project.status.progress}%</span>
                    </div>
                  </div>
                  <p className="launch-note">{project.status.note}</p>
                </>
              ) : null}

              <div className="tech-list">
                {project.tech.map((item) => (
                  <span key={`${project.id}-${item.label}`} className="tech-tag">
                    {item.logo ? (
                      <img src={item.logo} alt={item.label} className="tech-logo" />
                    ) : (
                      <span className="tech-dot" />
                    )}
                    {item.label}
                  </span>
                ))}
              </div>

              <div className="link-row">
                {project.links.map((link) => (
                  <a
                    key={`${project.id}-${link.label}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`project-link ${link.variant === 'outline' ? 'outline' : 'primary'}`}
                  >
                    {link.label}
                  </a>
                ))}
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
