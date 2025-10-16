import { useEffect, useState } from 'react'
import './App.css'
import Home from './Components/Home'
import Nav from './Components/Nav'
import { Route, Routes } from 'react-router-dom'
import About from './Components/About'
import Services from './Components/Services'
// import Skills from './Components/Projects'
import Projects from './Components/Projects'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
function App() {

  let [animationWork,setAnimationWork] = useState(false)
  const [isActiveTab,setIsActiveTab] = useState('/');
  return (
    <div className='scrollbar-none'>
      <Nav animationWork={animationWork} setAnimationWork={setAnimationWork} isActiveTab={isActiveTab} setIsActiveTab={setIsActiveTab} />  {/* api integraied */}
      <Routes>
        <Route path="/" element={<Home  animationWork={animationWork} setAnimationWork={setAnimationWork} />} /> {/* api integraied */}
        <Route path="/about" element={<About animationWork={animationWork} />} /> {/* api integraied */}
        <Route path="/services" element={<Services animationWork={animationWork}  />} /> 
        <Route path="/projects" element={<Projects animationWork={animationWork} />} />
        <Route path="/Contact" element={<Contact animationWork={animationWork} />} /> {/* api integraied */}
      </Routes>
      <Footer />

    </div>
  )
}

export default App
