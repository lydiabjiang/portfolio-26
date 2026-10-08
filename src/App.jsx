import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Principles from './components/Principles'
import Services from './components/Services'
import Work from './components/Work'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Principles />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
