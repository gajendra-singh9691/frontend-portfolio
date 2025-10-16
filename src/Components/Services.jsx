import { useLayoutEffect, useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook: equalize heights of direct children of the container ref
 */
function useEqualHeight(ref) {
  useEffect(() => {
    const container = ref.current
    if (!container) return

    const resizeHandler = () => {
      const items = Array.from(container.children)
      if (!items.length) return
      items.forEach((el) => (el.style.height = "auto"))
      const max = Math.max(...items.map((el) => el.offsetHeight))
      items.forEach((el) => (el.style.height = `${max}px`))
    }

    resizeHandler()
    window.addEventListener("resize", resizeHandler)
    return () => window.removeEventListener("resize", resizeHandler)
  }, [ref])
}

const Services = ({ animationWork }) => {
  const [servicesData, setServicesData] = useState([])

  const ball1Ref = useRef(null)
  const ball2Ref = useRef(null)
  const headingRef = useRef(null)
  const containerRef = useRef(null)
  const cardsRef = useRef([]) // array of card DOM nodes
  const gsapContextRef = useRef(null)

  useEqualHeight(containerRef)

  // Helper to set card refs from map
  const setCardRef = (el, i) => {
    cardsRef.current[i] = el
  }

  // Fetch data (safe try/catch)
  useEffect(() => {
    let canceled = false
    ;(async () => {
      try {
        const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/service/sendservicedetail`)
        if (!canceled) {
          // If your API returns the array at resp.data.data (as in your example)
          setServicesData(Array.isArray(resp?.data?.data) ? resp.data.data : [])
        }
      } catch (err) {
        console.error("Failed to fetch services:", err)
        if (!canceled) setServicesData([])
      }
    })()
    return () => {
      canceled = true
    }
  }, [])

  // Initialize animations that don't depend on dynamic cards (balls & heading)
  useLayoutEffect(() => {
    // Use a small gsap context for easy cleanup
    const ctx = gsap.context(() => {
      // Background balls entrance (simple from animation)
      gsap.fromTo(
        ball1Ref.current,
        { opacity: 0, scale: 0.9, x: -1000, rotation: 0 },
        { opacity: 1, scale: 1, x: 0, rotation: 360, duration: 1.8, ease: "power2.out" }
      )
      gsap.fromTo(
        ball2Ref.current,
        { opacity: 0, scale: 0.9, x: 1000, rotation: 0 },
        { opacity: 1, scale: 1, x: 0, rotation: -360, duration: 1.8, ease: "power2.out" }
      )

      // Heading animation - will play when heading enters viewport
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%", // play when top of heading reaches 90% of viewport
            once: true,
            markers: false,
          },
        }
      )
    }, containerRef) // scope to containerRef for safety

    // store context so we can revert on unmount
    gsapContextRef.current = ctx

    return () => {
      // revert cleans up all tweens, ScrollTriggers, event handlers created in context
      ctx.revert()
      gsapContextRef.current = null
    }
  }, []) // run once

  // Create/destroy card animations whenever servicesData changes (cards rendered)
  useLayoutEffect(() => {
    if (!servicesData || servicesData.length === 0) {
      // nothing to animate
      return
    }

    // ensure any previous ScrollTriggers are cleared first
    // (context.revert cleared earlier animations but we also ensure no leftover triggers)
    ScrollTrigger.getAll().forEach((t) => {
      // keep only triggers that are not related to our container:
      // if trigger is inside our containerRef, kill it.
      const trigEl = t.trigger
      if (containerRef.current && containerRef.current.contains(trigEl)) {
        t.kill()
      }
    })

    // new context specifically for cards animations (so we can revert easily)
    const cardsCtx = gsap.context(() => {
      // For each card, create a FROM animation with ScrollTrigger
      cardsRef.current.forEach((card, i) => {
        if (!card) return

        // reset inline style so from animation always applies
        card.style.opacity = 0
        // Use fromTo to have consistent starting transform even if already visible
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: -200,
            y: 50,
            scale: 0.85,
            rotation: -8,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.9,
            ease: "back.out(1.4)",
            delay: i * 0.12 + 0.25, // small stagger
            scrollTrigger: {
              trigger: card,
              start: "top 92%", // triggers when card top crosses 92% of viewport height
              end: "bottom 20%",
              toggleActions: "play none none reverse", // play on enter, reverse on leave back up
              // once: false, // leave false so it can reverse if user scrolls back
              markers: false, // set true temporarily while debugging
              // mark the scroll trigger to the whole card so large screens won't miss it:
              // onRefresh can be used if you need to adjust anything
            },
          }
        )
      })
    }, containerRef)

    // After adding triggers, refresh positions
    ScrollTrigger.refresh()

    // Cleanup: kill triggers/tweens created inside this context when data changes / unmount
    return () => {
      cardsCtx.revert()
      ScrollTrigger.refresh()
    }
  }, [servicesData])

  // When parent signals outgoing animation (animationWork prop changed), run out animation
  useEffect(() => {
    // avoid running on first render if that's undesired
    const runOut = () => {
      gsap.to([ball1Ref.current, ball2Ref.current], {
        opacity: 0,
        scale: 0.8,
        x: (i, targ) => (targ === ball1Ref.current ? -1000 : 1000),
        duration: 1.2,
        ease: "power1.in",
      })
      // scale down cards quickly
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.to(card, { opacity: 0, scale: 0, duration: 0.6, ease: "power1.in" })
        }
      })
      gsap.to(headingRef.current, { opacity: 0, scale: 0.9, duration: 0.6, ease: "power1.in" })
    }

    // don't run the out animation on first mount
    const rid = animationWork // read prop
    if (rid) {
      runOut()
    }
    // NOTE: we intentionally do not attempt to detect "first render" here;
    // if you want to skip first-change behavior, wrap with a ref-based guard.
  }, [animationWork])

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row justify-center md:justify-around items-center p-4 pt-16 sm:p-8 gap-12 md:gap-8">
      {/* BACKGROUND & BALLS */}
      <div className="fixed top-0 left-0 w-full h-screen z-[-2] overflow-x-hidden pointer-events-none">
        <div className="w-full h-screen bg-linear-to-tl from-[#010228] to-[#212367] absolute overflow-hidden">
          <div
            ref={ball1Ref}
            className="blur-[2px] w-96 h-96 sm:w-120 sm:h-120 md:w-[35rem] md:h-[35rem] lg:w-[42rem] lg:h-[42rem] xl:w-194 xl:h-194 top-1/2 -translate-y-1/2 -left-4/8 sm:-left-1/4 rounded-full absolute bg-radial-[at_25%_25%] from-[#0D1164] to-[#640D5F] to-75%"
          />
          <div
            ref={ball2Ref}
            className="blur-[3px] w-96 h-96 sm:w-120 sm:h-120 md:w-[35rem] md:h-[35rem] lg:w-[42rem] lg:h-[42rem] xl:w-194 xl:h-194 top-1/2 -translate-y-1/2 -right-4/8 sm:-right-1/4 rounded-full absolute bg-radial-[at_100%_100%] from-[#0D1164] to-[#640D5F] to-80%"
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="min-h-screen w-full bg-linear-to-tr from-secondary from-2% to-main to-90% pt-12">
        <h2
          ref={headingRef}
          className="text-center text-4xl font-bold text-white underline mb-8"
          style={{ opacity: 0 }} // gsap controls final values
        >
          My Services
        </h2>

        <div
          ref={containerRef}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white px-4 sm:px-8"
        >
          {servicesData.map((work, i) => (
            <ServiceCard key={i} work={work} setRef={(el) => setCardRef(el, i)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services




const ServiceCard = ({ work = {}, setRef }) => {
  // Safely default arrays/objects to avoid runtime errors
  const workList = Array.isArray(work.Work_list) ? work.Work_list : []

  return (
    <div
      ref={setRef}
      // initial inline style kept minimal; gsap.fromTo will override transform/opacity
      className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 flex flex-col gap-2 justify-between hover:scale-105 duration-200 transition-all"
      style={{ opacity: 0 }}
    >
      <div>
        <h3 className="font-bold text-2xl text-left sm:text-center text-[#FBFAF5]">
          {work.serviceName || work.heading || "Service"}
        </h3>
      </div>

      <div>
        <p className="my-2 text-md text-left">Best for : {work.best_for || work.Best_for || "General"}</p>
      </div>

      <div>
        <ul className="border-b-[#fd5f034f] border-b-1 py-2 pb-2">
          {workList.map((item, idx) => (
            <li key={idx} className="flex items-center gap-6 sm:gap-8 mb-1">
              <span>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-xl flex justify-between py-2">
        <button className="border-1 border-gray-400 rounded-md px-4 py-1 cursor-pointer bg-gray-500/50 hover:bg-text-main/40">
          INR &#x20B9;{work.price?.INR ?? work.price?.indian ?? "—"}
        </button>
        <button className="border-1 border-gray-400 rounded-md px-4 py-1 cursor-pointer bg-gray-500/50 hover:bg-text-secondary/40">
          USD &#36;{work.price?.USD ?? work.price?.usd ?? "—"}
        </button>
      </div>

      <div>
        <p className="flex gap-1">
          <span>Timeline : </span>
          <span>{work.timeline ?? "—"}</span>
        </p>
      </div>

      <div className="bg-[#640d6075] p-2 rounded-md text-md">
        <p>{work.note ?? ""}</p>
      </div>
    </div>
  )
}
