import { useEffect, useState } from 'react'
import About from './About'
import Contact from './Contact'
import Experience from './Experience'
import Home from './Home'
import Projects from './Projects'
import Skills from './Skills'

const parseHash = () => {
  const hash = window.location.hash || '#/'

  if (hash === '#/skills') {
    return { route: 'skills', section: '' }
  }

  if (hash === '#/projects') {
    return { route: 'projects', section: '' }
  }

  if (hash === '#/about') {
    return { route: 'about', section: '' }
  }

  if (hash === '#/contact') {
    return { route: 'contact', section: '' }
  }

  if (hash === '#/experience') {
    return { route: 'experience', section: '' }
  }

  if (hash.startsWith('#/')) {
    return { route: 'home', section: hash.slice(2) }
  }

  return { route: 'home', section: '' }
}

export default function App() {
  const [{ route, section }, setLocation] = useState(parseHash)

  useEffect(() => {
    const onHashChange = () => setLocation(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (route !== 'home') return

    const target = section ? document.getElementById(section) : null
    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }

    window.scrollTo({ top: 0, behavior: section ? 'smooth' : 'auto' })
  }, [route, section])

  if (route === 'skills') return <Skills />
  if (route === 'projects') return <Projects />
  if (route === 'about') return <About />
  if (route === 'contact') return <Contact />
  if (route === 'experience') return <Experience />
  return <Home />
}
