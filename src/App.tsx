import { useEffect, useState } from 'react'
import About from './About'
import Contact from './Contact'
import Experience from './Experience'
import Home from './Home'
import Projects from './Projects'
import Skills from './Skills'

const parseLocation = () => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const section = window.location.hash.replace(/^#/, '')

  if (path === '/skills') {
    return { route: 'skills', section: '' }
  }

  if (path === '/projects') {
    return { route: 'projects', section: '' }
  }

  if (path === '/about') {
    return { route: 'about', section: '' }
  }

  if (path === '/contact') {
    return { route: 'contact', section: '' }
  }

  if (path === '/experience') {
    return { route: 'experience', section: '' }
  }

  if (path === '/' || path === '') {
    return { route: 'home', section }
  }

  return { route: 'home', section: '' }
}

export default function App() {
  const [{ route, section }, setLocation] = useState(parseLocation)

  useEffect(() => {
    const syncLocation = () => setLocation(parseLocation())
    window.addEventListener('popstate', syncLocation)
    window.addEventListener('hashchange', syncLocation)
    return () => {
      window.removeEventListener('popstate', syncLocation)
      window.removeEventListener('hashchange', syncLocation)
    }
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
