// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { use, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom"

// const Nav = ({animationWork,setAnimationWork,isActiveTab,setIsActiveTab}) => {
//   const nav = useRef(null);
//   const iconRef = useRef(null);
//   const linkRef = useRef(null);
//   useGSAP(() => {
//     const tl = gsap.timeline();
//     tl.fromTo(nav.current, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: .8, delay: 1.5 })
//       .fromTo(iconRef.current, { scale: 0 }, { scale: 1, duration: .7 })
//       .fromTo(linkRef.current, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: .9, ease: "power4.out" })
//   });

//   const navigate = useNavigate()
//   const changeRoute = (e, path) => {
//   e.preventDefault();
//   if (path == undefined) {
//     return
//   }
//   if (isActiveTab === path) {
//     setIsActiveTab(path);
//     return;
//   }
//   setAnimationWork(!animationWork);
//   setTimeout(() => {
//     navigate(path);
//     setIsActiveTab(path);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, 1500);
// };

//   return (
//     <div ref={nav} className="fixed top-0 w-full px-4 py-1  flex justify-between items-center bg-gray-300/5 text-white backdrop-blur-sm shadow-2xl z-50">
//       <div ref={iconRef} className="w-15 h-15">
//         <img className="w-full h-full object-contain invert" src="../Images/logo.png" alt="" />
//       </div>
//       <div ref={linkRef} className="hidden sm:flex gap-6 text-white font-semibold text-md tracking-wide">
//         {[{ name: "HOME", path: "/" }, { name: "ABOUT", path: "/about" }, { name: "SERVICES", path: "/services" }, { name: "PROJECTS", path: "/projects" }, { name: "CONTACT", path: "/contact" }].map((link, i) => (
//           <button
//             key={i}
//             onClick={(e) => changeRoute(e, link = link.path)}
//             className="relative group transition-all duration-300 cursor-pointer">
//             {link.name}
//             <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white group-hover:w-full transition-all opacity-0 -translate-y-[100px]"></span>
//           </button>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Nav

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const LINKS = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "SERVICES", path: "/services" },
  { name: "PROJECTS", path: "/projects" },
  { name: "CONTACT", path: "/contact" },
]

const Nav = ({ animationWork, setAnimationWork, isActiveTab, setIsActiveTab }) => {
  const nav = useRef(null)
  const iconRef = useRef(null)
  const linkRef = useRef(null)

  // mobile menu
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const mobileMenuRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.fromTo(nav.current, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.5 })
      .fromTo(iconRef.current, { scale: 0 }, { scale: 1, duration: 0.7 })
      .fromTo(linkRef.current, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" })
  })

  const navigate = useNavigate()

  const openMobileMenu = () => {
    setIsMobileOpen(true)
    requestAnimationFrame(() => {
      if (!mobileMenuRef.current) return
      gsap.fromTo(
        mobileMenuRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.45, ease: "power4.out" }
      )
    })
  }

  const closeMobileMenu = () => {
    if (!mobileMenuRef.current) {
      setIsMobileOpen(false)
      return
    }
    gsap.to(mobileMenuRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => setIsMobileOpen(false),
    })
  }

  const toggleMobileMenu = () => {
    if (isMobileOpen) closeMobileMenu()
    else openMobileMenu()
  }

  const changeRoute = (e, path) => {
    e.preventDefault()
    if (!path) return

    // auto-hide mobile menu on any link click
    if (isMobileOpen) closeMobileMenu()

    if (isActiveTab === path) {
      setIsActiveTab(path)
      return
    }

    setAnimationWork(!animationWork)
    setTimeout(() => {
      navigate(path)
      setIsActiveTab(path)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 1500)
  }

  return (
    <header
      ref={nav}
      className="fixed top-0 w-full px-4 py-1 flex justify-between items-center bg-gray-300/5 text-white backdrop-blur-sm shadow-2xl z-50"
      role="banner"
    >
      <div ref={iconRef} className="w-12 h-12">
        <img className="w-full h-full object-contain invert" src="../Images/logo.png" alt="Company logo" />
      </div>

      {/* Desktop links */}
      <nav ref={linkRef} className="hidden sm:flex gap-6 font-semibold text-md tracking-wide" aria-label="Primary">
        {LINKS.map((link, i) => (
          <button
            key={i}
            onClick={(e) => changeRoute(e, link.path)}
            className="relative group transition-all duration-300 cursor-pointer"
          >
            {link.name}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white group-hover:w-full transition-all opacity-0 -translate-y-[100px]"></span>
          </button>
        ))}
      </nav>

      {/* Mobile toggle button */}
      <button
        type="button"
        onClick={toggleMobileMenu}
        className="sm:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        aria-controls="mobile-menu"
        aria-expanded={isMobileOpen}
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
      >
        <span className="sr-only">{isMobileOpen ? "Close menu" : "Open menu"}</span>
        {!isMobileOpen ? (
          <svg width="24" height="24" fill="none" stroke="currentColor" className="text-white">
            <path strokeWidth="2" strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" className="text-white">
            <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        )}
      </button>

      {/* Mobile slide-down menu */}
      {isMobileOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="fixed inset-x-0 top-0 pt-16 pb-6 bg-black/80 backdrop-blur-md z-40"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col items-center gap-4 font-semibold text-lg" aria-label="Mobile Primary">
            {LINKS.map((link, i) => (
              <button key={i} onClick={(e) => changeRoute(e, link.path)} className="py-2 px-4">
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Nav
