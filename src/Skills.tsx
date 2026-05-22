import { useEffect, useRef, useState, type CSSProperties } from 'react'

type SkillGroup = {
  id: string
  number: string
  title: string
  icon: string
  summary: string
  proficiency: number
  items: Array<{
    label: string
    logo?: string
  }>
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'backend',
    number: '01',
    title: 'Backend Systems',
    icon: '</>',
    summary: 'Java-first backend engineering with scalable APIs, auth flows, and production-minded service design.',
    proficiency: 88,
    items: [
      { label: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { label: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { label: 'Spring Security', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { label: 'Spring AI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { label: 'JWT' },
      { label: 'REST APIs' },
    ],
  },
  {
    id: 'database',
    number: '02',
    title: 'Data Layer',
    icon: '[]',
    summary: 'Relational data modeling and persistence patterns built for clean queries, stable schema evolution, and fast delivery.',
    proficiency: 80,
    items: [
      { label: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { label: 'SQL' },
      { label: 'Spring Data JPA', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    ],
  },
  {
    id: 'cloud',
    number: '03',
    title: 'Cloud & DevOps',
    icon: '{ }',
    summary: 'Deployment pipelines and infra tooling that keep projects reproducible, observable, and easy to ship.',
    proficiency: 75,
    items: [
      { label: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { label: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { label: 'Nginx', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
      { label: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      { label: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
      { label: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    ],
  },
  {
    id: 'frontend',
    number: '04',
    title: 'Frontend Craft',
    icon: '<>',
    summary: 'Responsive interfaces with clean structure, sharp motion, and practical user experience over gimmicks.',
    proficiency: 65,
    items: [
      { label: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { label: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { label: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { label: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { label: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { label: 'Vite', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    ],
  },
  {
    id: 'tools',
    number: '05',
    title: 'Workflow Tools',
    icon: '++',
    summary: 'Daily tools that keep builds, debugging, collaboration, and delivery moving without friction.',
    proficiency: 82,
    items: [
      { label: 'Maven', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg' },
      { label: 'IntelliJ', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
      { label: 'Postman', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
      { label: 'Jira', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
      { label: 'GitHub Actions', logo: 'https://icon.icepanel.io/Technology/svg/GitHub-Actions.svg' },
    ],
  },
]

const MARQUEE_ITEMS = [
  'Spring Boot',
  'React',
  'AWS',
  'Java',
  'TypeScript',
  'MySQL',
  'Docker',
  'Terraform',
  'JWT Auth',
  'REST APIs',
  'CI/CD',
]

export default function Skills() {
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
        @keyframes drift { 0% { transform: translate(0, 0); } 33% { transform: translate(24px, -18px); } 66% { transform: translate(-12px, 10px); } 100% { transform: translate(0, 0); } }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scaleIn { from { opacity: 0; transform: translateY(28px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fillBar { from { width: 0; } to { width: var(--prof); } }

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
          display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(320px, .9fr);
          gap: 4rem; align-items: end;
        }
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-bg video { width: 100%; height: 100%; object-fit: cover; opacity: .28; filter: grayscale(100%) contrast(1.1); animation: drift 22s ease-in-out infinite; }
        .hero-bg::after {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, rgba(5,5,5,.15) 0%, rgba(5,5,5,.05) 20%, rgba(5,5,5,.78) 72%, #050505 100%),
            linear-gradient(to right, rgba(5,5,5,.45) 0%, rgba(5,5,5,.08) 60%, rgba(5,5,5,.55) 100%);
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
          max-width: 540px; font-size: 14px; line-height: 1.95; color: rgba(255,255,255,.3); font-weight: 300;
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
          max-width: 1240px; margin: 0 auto; padding: 110px 5vw;
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
          margin-top: 1.2rem; max-width: 720px; font-size: 14px; line-height: 1.95; color: rgba(255,255,255,.28); font-weight: 300;
        }

        .skills-grid {
          margin-top: 4rem; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem;
        }
        .skill-card {
          position: relative; padding: 1.8rem; border-radius: 22px;
          border: 1px solid rgba(255,255,255,.07);
          background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.015));
          overflow: hidden;
          opacity: 0; transform: translateY(24px);
        }
        .section.vis .skill-card { animation: scaleIn .7s cubic-bezier(0.16,1,0.3,1) forwards; }
        .skill-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.04), transparent 45%);
          opacity: 0; transition: opacity .25s;
        }
        .skill-card:hover::before { opacity: 1; }
        .skill-card:hover { border-color: rgba(255,255,255,.14); }
        .skill-top { display: grid; grid-template-columns: auto 1fr; gap: 1rem; align-items: center; }
        .skill-icon {
          width: 54px; height: 54px; border-radius: 16px; display: grid; place-items: center;
          background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.07);
          font-family: 'JetBrains Mono', monospace; font-size: .9rem; color: rgba(255,255,255,.72);
        }
        .skill-meta span {
          display: block; font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .2em;
          text-transform: uppercase; color: rgba(255,255,255,.18); margin-bottom: .4rem;
        }
        .skill-meta h3 {
          font-family: 'Playfair Display', serif; font-size: 1.75rem; line-height: 1; color: rgba(255,255,255,.9);
        }
        .skill-summary {
          margin-top: 1.4rem; font-size: .92rem; line-height: 1.8; color: rgba(255,255,255,.28);
        }
        .tech-list { display: flex; flex-wrap: wrap; gap: .7rem; margin-top: 1.4rem; }
        .tech-tag {
          display: inline-flex; align-items: center; gap: .5rem; padding: .68rem .9rem; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03);
          font-family: 'JetBrains Mono', monospace; font-size: .67rem; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.55);
        }
        .tech-logo {
          width: 16px; height: 16px; object-fit: contain; flex-shrink: 0;
          filter: grayscale(0);
        }
        .tech-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,.35); }
        .proficiency { margin-top: 1.6rem; padding-top: 1.2rem; border-top: 1px solid rgba(255,255,255,.06); }
        .prof-head {
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          font-family: 'JetBrains Mono', monospace; font-size: .66rem; letter-spacing: .16em;
          text-transform: uppercase; color: rgba(255,255,255,.25); margin-bottom: .7rem;
        }
        .prof-bar {
          width: 100%; height: 4px; background: rgba(255,255,255,.07); border-radius: 999px; overflow: hidden;
        }
        .prof-fill {
          width: 0; height: 100%; border-radius: inherit; background: linear-gradient(90deg, rgba(255,255,255,.55), rgba(255,255,255,.95));
        }
        .section.vis .prof-fill { animation: fillBar 1.2s cubic-bezier(0.16,1,0.3,1) forwards .25s; }

        .breakdown {
          display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(280px, .85fr); gap: 2rem; align-items: start; margin-top: 4rem;
        }
        .breakdown-copy {
          padding: 2rem; border: 1px solid rgba(255,255,255,.06); border-radius: 22px; background: rgba(255,255,255,.02);
        }
        .breakdown-copy p {
          font-size: .95rem; line-height: 1.95; color: rgba(255,255,255,.3);
        }
        .breakdown-copy p + p { margin-top: 1rem; }
        .focus-list {
          border: 1px solid rgba(255,255,255,.06); border-radius: 22px; overflow: hidden; background: rgba(255,255,255,.015);
        }
        .focus-row {
          display: grid; grid-template-columns: 56px 1fr auto; gap: 1rem; align-items: center;
          padding: 1.25rem 1.4rem; border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .focus-row:last-child { border-bottom: none; }
        .focus-no { font-family: 'Playfair Display', serif; font-style: italic; font-size: 1rem; color: rgba(255,255,255,.18); }
        .focus-text strong { display: block; font-size: .9rem; color: rgba(255,255,255,.8); }
        .focus-text span { display: block; margin-top: .2rem; font-size: .75rem; line-height: 1.6; color: rgba(255,255,255,.26); }
        .focus-value { font-family: 'JetBrains Mono', monospace; font-size: .66rem; letter-spacing: .12em; color: rgba(255,255,255,.36); }

        .footer {
          padding: 26px 5vw; border-top: 1px solid rgba(255,255,255,.05);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .footer-logo { font-family: 'JetBrains Mono', monospace; font-size: .82rem; color: rgba(255,255,255,.18); }
        .footer-copy { font-size: 10px; color: rgba(255,255,255,.12); letter-spacing: .05em; }

        @media (max-width: 1080px) {
          .hero { grid-template-columns: 1fr; gap: 2rem; padding-top: 8.5rem; }
          .skills-grid, .breakdown { grid-template-columns: 1fr; }
        }
        @media (max-width: 960px) {
          .nav-links, .nav-sep { display: none; }
          .hamburger { display: flex; }
        }
        @media (max-width: 640px) {
          .hero-actions { flex-direction: column; align-items: flex-start; }
          .metric-row, .focus-row { grid-template-columns: 42px 1fr; }
          .metric-value, .focus-value { display: none; }
          .skill-card { padding: 1.35rem; }
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
                <a href={link.href} className={link.label === 'Skills' ? 'active' : ''}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#/contact" className="nav-cta">
            <div className="nav-cta-dot" />
            Available
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
            <span className="status-text">Technical expertise</span>
            <div className="status-div" />
            <span className="status-text">Built for production</span>
          </div>

          <h1 className="hero-title">
            <span className="title-row"><span className="title-main">Core</span></span>
            <span className="title-row"><span className="title-outline">Skills</span></span>
            <span className="title-row"><span className="title-tag">- Stack, tooling, and systems I use in real projects</span></span>
          </h1>

          <p className="hero-desc">
            Modern technologies I use to build scalable applications across backend architecture, frontend delivery,
            cloud infrastructure, and developer workflow. The goal is simple: code that looks sharp, ships fast, and stays stable.
          </p>

          <div className="hero-actions">
            <a href="#skills-grid" className="btn-primary">
              Explore Stack
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#/" className="btn-ghost">Back to home</a>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="panel-top">
            <span className="panel-eyebrow">Stack overview</span>
            <span className="panel-metric">05</span>
          </div>
          <div className="panel-body">
            {SKILL_GROUPS.slice(0, 4).map((group) => (
              <div key={group.id} className="metric-row">
                <span className="metric-no">{group.number}</span>
                <div className="metric-copy">
                  <strong>{group.title}</strong>
                  <span>{group.summary}</span>
                </div>
                <span className="metric-value">{group.proficiency}%</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          {[...Array(2)].map((_, repeatIndex) =>
            MARQUEE_ITEMS.map((item, itemIndex) => (
              <span key={`${repeatIndex}-${itemIndex}`} className="ticker-item">
                {item}
                <span className="ticker-sep" />
              </span>
            )),
          )}
        </div>
      </div>

      <section id="skills-grid" ref={r(0)} className={`section${visible[0] ? ' vis' : ''}`}>
        <div className="eyebrow">Technical expertise</div>
        <h2 className="h2">A stack built to<br /><em>ship, scale, and evolve.</em></h2>
        <p className="section-copy">
          This section summarizes the technologies I use across backend development, frontend delivery, infrastructure, and day-to-day workflow.
          It is organized to show both core strengths and the way these tools connect in real projects.
        </p>

        <div className="skills-grid">
          {SKILL_GROUPS.map((group, index) => (
            <article key={group.id} className="skill-card" style={{ animationDelay: `${index * 90}ms` } as CSSProperties}>
              <div className="skill-top">
                <div className="skill-icon">{group.icon}</div>
                <div className="skill-meta">
                  <span>{group.number}</span>
                  <h3>{group.title}</h3>
                </div>
              </div>

              <p className="skill-summary">{group.summary}</p>

              <div className="tech-list">
                {group.items.map((item) => (
                  <span key={item.label} className="tech-tag">
                    {item.logo ? (
                      <img src={item.logo} alt={item.label} className="tech-logo" />
                    ) : (
                      <span className="tech-dot" />
                    )}
                    {item.label}
                  </span>
                ))}
              </div>

              <div className="proficiency">
                <div className="prof-head">
                  <span>Proficiency</span>
                  <span>{group.proficiency}%</span>
                </div>
                <div className="prof-bar">
                  <div className="prof-fill" style={{ ['--prof' as string]: `${group.proficiency}%` }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section ref={r(1)} className={`section${visible[1] ? ' vis' : ''}`} style={{ paddingTop: 0 }}>
        <div className="eyebrow">Working style</div>
        <h2 className="h2">Not just tools.<br /><em>Execution habits.</em></h2>

        <div className="breakdown">
          <div className="breakdown-copy">
            <p>
              The strongest part of your stack is how the pieces connect: backend services that stay clean,
              frontend work that stays readable, and deployment choices that do not become a mess later.
            </p>
            <p>
              Rather than listing tools without context, this section presents them as part of a practical engineering profile:
              technical capability, sound judgment, and readiness to build reliable software.
            </p>
          </div>

          <div className="focus-list">
            <div className="focus-row">
              <span className="focus-no">01</span>
              <div className="focus-text">
                <strong>APIs first</strong>
                <span>Clean contracts, auth, and backend reliability.</span>
              </div>
              <span className="focus-value">REST</span>
            </div>
            <div className="focus-row">
              <span className="focus-no">02</span>
              <div className="focus-text">
                <strong>Cloud ready</strong>
                <span>Infra and deployments designed for repeatability.</span>
              </div>
              <span className="focus-value">AWS</span>
            </div>
            <div className="focus-row">
              <span className="focus-no">03</span>
              <div className="focus-text">
                <strong>Frontend polish</strong>
                <span>Interfaces that feel deliberate, not template-made.</span>
              </div>
              <span className="focus-value">React</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span className="footer-logo">&lt;SY/&gt;</span>
        <span className="footer-copy">© 2026 Sumeet Yadav · Built with passion & coffee</span>
      </footer>
    </>
  )
}
