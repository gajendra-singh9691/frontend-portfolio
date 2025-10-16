import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useGSAP } from "@gsap/react"
import axios from "axios"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"

// ⏹️ Helper Hook: make all cards same height
function useEqualHeight(ref) {
  useEffect(() => {
    const container = ref.current
    if (!container) return

    const resizeHandler = () => {
      const items = Array.from(container.children)
      if (!items.length) return

      items.forEach((el) => (el.style.height = "auto"))
      const maxHeight = Math.max(...items.map((el) => el.offsetHeight))
      items.forEach((el) => (el.style.height = `${maxHeight}px`))
    }

    resizeHandler()
    window.addEventListener("resize", resizeHandler)
    return () => window.removeEventListener("resize", resizeHandler)
  }, [ref])
}

const Projects = ({ animationWork }) => {
  const [projectData, setProjectData] = useState([])
  const [hoveredCard, setHoveredCard] = useState(null)

  const ball1Ref = useRef()
  const ball2Ref = useRef()
  const headingRef = useRef()
  const containerRef = useRef()
  const cardsRef = useRef([])

  useEqualHeight(containerRef)

  // ✅ Fetch project data
  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/project/sendprojectdetail`
        )
        setProjectData(response.data.data)
      } catch (error) {
        console.error("Error fetching project data:", error)
      }
    })()
  }, [])

  // ✅ Animate when project data is loaded
  useGSAP(() => {
    if (
      !ball1Ref.current ||
      !ball2Ref.current ||
      !headingRef.current ||
      cardsRef.current.length === 0
    ) {
      console.warn("GSAP: some targets not found — skipping animation")
      return
    }

    const tl = gsap.timeline()

    tl.fromTo(
      ball1Ref.current,
      { opacity: 0, scale: 0.8, y: "-1000", x: "-1000", rotation: 0 },
      { opacity: 1, scale: 1, y: "0", x: "0", rotation: 180, duration: 3, ease: "power1.out" }
    )
      .fromTo(
        ball2Ref.current,
        { opacity: 0, scale: 0.8, y: "1000", x: "1000", rotation: 0 },
        { opacity: 1, scale: 1, y: "0", x: "0", rotation: 180, duration: 3, ease: "power1.out" },
        "-=2.5"
      )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=1.5"
      )
      .fromTo(
        cardsRef.current,
        { opacity: 0, y: 100, scale: 0.9, rotationY: 15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: { amount: 0.6, from: "start" },
        },
        "-=1"
      )
  }, [projectData])

  // ✅ Exit animation when switching animationWork
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    outAnimation()
  }, [animationWork])

  const outAnimation = () => {
    if (!ball1Ref.current || !ball2Ref.current || !headingRef.current) return

    gsap.to(ball1Ref.current, {
      opacity: 0,
      scale: 0.8,
      y: "-1000",
      x: "-1000",
      rotation: 360,
      duration: 1.45,
      delay: 1,
      ease: "power1.in",
    })
    gsap.to(ball2Ref.current, {
      opacity: 0,
      scale: 0.8,
      y: 1000,
      x: 1000,
      rotation: 360,
      duration: 1.45,
      delay: 1,
      ease: "power1.in",
    })
    gsap.to(cardsRef.current, { opacity: 0, y: 100, scale: 0, duration: 1 })
    gsap.to(headingRef.current, { opacity: 0, y: -100, duration: 1 })
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row justify-center md:justify-around items-center p-4 pt-16 sm:p-8 gap-12 md:gap-8">
      {/* 🔮 Background Gradient and Balls */}
      <div className="fixed top-0 left-0 w-full h-screen z-[-2] overflow-x-hidden">
        <div className="w-full h-screen bg-linear-to-tl from-[#010228] to-[#212367] to-75% absolute overflow-hidden">
          <div
            ref={ball1Ref}
            className="blur-[2px] w-96 h-96 sm:w-120 sm:h-120 md:w-[35rem] md:h-[35rem] lg:w-[42rem] lg:h-[42rem] xl:w-194 xl:h-194 -bottom-2/8 -right-2/8 sm:-bottom-3/8 sm:-right-2/8 rounded-full absolute bg-radial-[at_25%_25%] from-[#0D1164] to-[#640D5F] to-75%"
          ></div>
          <div
            ref={ball2Ref}
            className="blur-[3px] w-96 h-96 sm:w-120 sm:h-120 md:w-[35rem] md:h-[35rem] lg:w-[42rem] lg:h-[42rem] xl:w-194 xl:h-194 -left-2/8 sm:-top-4/8 sm:-left-2/8 rounded-full absolute bg-radial-[at_100%_100%] from-[#0D1164] to-[#640D5F] to-80%"
          ></div>
        </div>
      </div>

      {/* 🌟 Project Cards */}
      <div className="w-full min-h-screen text-white flex flex-col gap-12">
        <h3 ref={headingRef} className="text-center mt-14 text-4xl font-bold text-white underline">
          Projects
        </h3>

        <div
          ref={containerRef}
          className="w-full flex flex-col justify-center sm:flex-row flex-wrap gap-8 text-white px-4 sm:px-8"
        >
          {projectData.length === 0 ? (
            <p className="text-center w-full text-gray-300">Loading projects...</p>
          ) : (
            projectData.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                cardRef={(el) => (cardsRef.current[index] = el)}
                index={index}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Projects

// 💳 Single Project Card
const ProjectCard = ({ project, cardRef, index, hoveredCard, setHoveredCard }) => {
  const isBlurred = hoveredCard !== null && hoveredCard !== index

  return (
    <div
      ref={cardRef}
      className={`w-full backdrop-blur-lg bg-black/40 border border-white/20 rounded-2xl shadow-lg p-6 flex flex-col gap-2 justify-between hover:scale-[1.02] hover:bg-black/50 hover:border-white/30 duration-500 transition-all ease-out hover:shadow-2xl sm:max-w-96 ${
        isBlurred ? "blur-[2px]" : "blur-none"
      }`}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{ opacity: 0 }}
    >
      <div className="w-full h-40 rounded-sm">
        <img
          className="w-full h-full object-contain border-1 border-gray-900"
          src={project.projectImage || "/placeholder.svg"}
          alt={project.projectName || "Project"}
        />
      </div>
      <div>
        <h3 className="font-bold text-2xl text-left sm:text-center text-white">
          {project.projectName}
        </h3>
      </div>
      <div>
        <p className="my-2 text-md text-left text-gray-100">{project.projectDetail}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.projectUse?.map((tech, idx) => (
          <button
            key={idx}
            className="w-fit p-1 px-4 rounded-full bg-[#640D5F] text-white border border-white/20"
          >
            {tech}
          </button>
        ))}
      </div>
      <div className="flex justify-between pt-2">
        <button
          className="flex gap-0.5 bg-[#640D5F] text-white px-2 py-1 rounded-md cursor-pointer relative hover:-translate-y-1 duration-100 transition-all"
          onClick={() => window.open(project.projectGithubLink, "_blank")}
        >
          <FontAwesomeIcon icon={faGithub} />
          <span className="ml-1">Source Code</span>
        </button>
        <button
          className="flex gap-0.5 bg-[#640D5F] text-white px-2 py-1 rounded-md cursor-pointer relative hover:-translate-y-1 duration-100 transition-all"
          onClick={() => window.open(project.projectDemoLink, "_blank")}
        >
          <FontAwesomeIcon icon={faUpRightFromSquare} />
          <span className="ml-1">Live Demo</span>
        </button>
      </div>
    </div>
  )
}
