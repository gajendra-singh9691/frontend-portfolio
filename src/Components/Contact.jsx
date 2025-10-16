// import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { useGSAP } from "@gsap/react"
// import gsap from "gsap"
// import { useEffect, useRef } from "react"


// const Contact = ({ animationWork }) => {
//   const ball1Ref = useRef()
//   const ball2Ref = useRef()
//   useGSAP(() => {
//     gsap.fromTo(ball1Ref.current,
//       { opacity: 0, scale: .8, y: "-1000", rotation: 0 },
//       { opacity: 1, scale: 1, y: "0", rotation: 360, duration: 3, ease: "power1.Out" },
//     )
//     gsap.fromTo(ball2Ref.current,
//       { opacity: 0, scale: .8, y: "1000", rotation: 0 },
//       { opacity: 1, scale: 1, y: "0", rotation: 360, duration: 3, ease: "power1.Out" },
//     )
//   })

//   let isFirstRender = useRef(true);
//   // let [animationWork,setAnimationWork] = useState(false)
//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       return;
//     }
//     outAnimation();
//   }, [animationWork])


//   const outAnimation = () => {
//     // useGSAP(()=>{
//     gsap.to(ball1Ref.current,
//       { opacity: 0, scale: .8, y: "-1000", x: 0, rotation: 360, duration: 2, delay: 1, ease: "power1.In" }
//     )
//     gsap.to(ball2Ref.current,
//       { opacity: 0, scale: .8, y: 1000, x: 0, rotation: 360, duration: 2, delay: 1, ease: "power1.In" }
//     )
//   }
//   return (
//     <div className="w-full min-h-screen flex flex-col md:flex-row justify-center md:justify-around items-center p-4 pt-16 sm:p-8 gap-12 md:gap-8 ">
//       <div className="fixed top-0 left-0 w-full h-screen z-[-2] overflow-x-hidden">
//         <div className="w-full h-screen bg-linear-to-tl from-[#010228] to-[#212367] to-75% absolute overflow-hidden">
//           <div ref={ball1Ref} className="blur-[2px] w-[100vw] h-[100vw] sm:w-120 sm:h-120 md:w-[35rem] md:h-[35rem] lg:w-[42rem] lg:h-[42rem] xl:w-194 xl:h-194 -top-3/12 md:-top-5/12 lg:-top-6/12 left-1/2 -translate-x-1/2 rounded-full absolute bg-radial-[at_25%_25%] from-[#0D1164] to-[#640D5F] to-75%"></div>
//           <div ref={ball2Ref} className="blur-[3px] w-[100vw] h-[100vw] sm:w-120 sm:h-120 md:w-[35rem] md:h-[35rem] lg:w-[42rem] lg:h-[42rem] xl:w-194 xl:h-194 -bottom-3/12 md:-bottom-5/12 lg:-bottom-6/12 left-1/2 -translate-x-1/2 rounded-full absolute bg-radial-[at_100%_100%] from-[#0D1164] to-[#640D5F] to-80%"></div>
//         </div>
//       </div>
//       <div className="text-white w-full flex flex-col justify-center items-center bg-linear-to-b from-[#0d1164] to-[#640d6074] to-75% backdrop-blur-3xl p-2 mt-16 rounded-4xl">
//         <div className="flex flex-col gap-8 w-full max-w-80 sm:max-w-96">
//           <h2 className="text-center p-4 text-4xl font-bold text-text-main underline">Get In Touch</h2>
//           <div className="flex justify-center gap-4">
//             <div className="flex justify-center items-center border-1 border-gray-700 hover:border-white rounded-full w-10 h-10 hover:scale-130 duration-100 cursor-pointer group">
//               <FontAwesomeIcon icon={faGithub} className=" group-hover:text-white text-2xl" />
//             </div>
//             <div className="flex justify-center items-center border-1 border-gray-700 hover:border-blue-700 rounded-full w-10 h-10 hover:scale-130 duration-100 cursor-pointer group">
//               <FontAwesomeIcon icon={faLinkedin} className=" group-hover:text-blue-400 text-2xl" />
//             </div>
//             <div className="flex justify-center items-center border-1 border-gray-700 hover:border-pink-700 rounded-full w-10 h-10 hover:scale-130 duration-100 cursor-pointer group">
//               <FontAwesomeIcon icon={faInstagram} className=" group-hover:text-pink-600 text-2xl" />
//             </div>
//           </div>
//           <form className="flex flex-col gap-6 p-8 sm:p-12 rounded-4xl backdrop-blur-2xl bg-linear-to-t from-[#0d1164] to-[#640d6074] to-75% shadow-2xl">
//             <div className="flex flex-col w-full gap-2">
//               <label htmlFor="name" className="text-xl sm:text-2xl">Name</label>
//               <input type="text" id="name" placeholder="Enter Your Name " className="focus:outline-none border-none bg-[#29335081] p-2 text-md rounded placeholder:text-gray-400" />
//             </div>
//             <div className="flex flex-col w-full gap-2">
//               <label htmlFor="email" className="text-xl sm:text-2xl">Email</label>
//               <input type="text" id="email" placeholder="Enter Your Name " className="focus:outline-none border-none bg-[#29335081] p-2 text-md rounded placeholder:text-gray-400" />
//             </div>
//             <div className="flex flex-col w-full gap-2">
//               <label htmlFor="message" className="text-xl sm:text-2xl">Message</label>
//               <textarea className="resize-y-none min-h-30 border-none focus:outline-none bg-[#29335081] p-2 text-md rounded placeholder:text-gray-400" id="message" placeholder="Tell me about your projects..." ></textarea>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Contact










"use client"

import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useGSAP } from "@gsap/react"
import axios from "axios"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

const Contact = ({ animationWork }) => {
  const ball1Ref = useRef()
  const ball2Ref = useRef()
  const containerRef = useRef()
  const headingRef = useRef()
  const socialIconsRef = useRef()
  const formRef = useRef()


  useGSAP(() => {
    gsap.fromTo(ball1Ref.current,
      { opacity: 0, scale: .8, y: "-1000", rotation: 0 },
      { opacity: 1, scale: 1, y: "0", rotation: 360, duration: 3, ease: "power1.Out" },
    )
    gsap.fromTo(ball2Ref.current,
      { opacity: 0, scale: .8, y: "1000", rotation: 0 },
      { opacity: 1, scale: 1, y: "0", rotation: 360, duration: 3, ease: "power1.Out" },
    )
  })

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 100, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" },
      3, // Start after 0.5 seconds
    )
      // Heading animation
      .fromTo(
        headingRef.current,
        { opacity: 0, scale: 0.5, y: -50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
        // Start after container begins
      )
      // Social icons staggered animation
      .fromTo(
        socialIconsRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      )
      // Form animation
      .fromTo(
        formRef.current,
        { opacity: 0, y: 100, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
      )
  })

  const isFirstRender = useRef(true)
  // let [animationWork,setAnimationWork] = useState(false)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    outAnimation()
  }, [animationWork])

  const outAnimation = () => {
    // const exitTl = gsap.timeline()
    gsap.to(formRef.current, { scale: 0.7, opacity: 0, duration: 1 })
    gsap.to(socialIconsRef.current, { scale: 0.7, opacity: 0, duration: 1 })
    gsap.to(headingRef.current, { scale: 0.7, opacity: 0, duration: 1 })
    gsap.to(containerRef.current, { scale: 0.7, opacity: 0, duration: 1 })
    gsap.to(ball1Ref.current,
      { opacity: 0, scale: .8, y: "-1000", rotation: 360, duration: 2, delay: 1, ease: "power1.In" }
    )
    gsap.to(ball2Ref.current,
      { opacity: 0, scale: .8, y: 1000, rotation: 360, duration: 2, delay: 1, ease: "power1.In" }
    )
  }

  const [data, setData] = useState(
    {
      name: "",
      email: "",
      message: ""
    }
  )

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.name == "") {
        return toast.error("Name is required")
      }
      else if (data.email == "") {
        return toast.error("Email is required")
      }
      else if (data.message == "") {
        return toast.error("Message is required")
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/contact/addinquray`,data)
      toast.success(response.data.message);
      
    } catch (error) {
      toast.error(error.response.data.data);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row justify-center md:justify-around items-center p-4 pt-16 sm:p-8 gap-12 md:gap-8 ">
      <div className="fixed top-0 left-0 w-full h-screen z-[-2] overflow-x-hidden">
        <div className="w-full h-screen bg-linear-to-tl from-[#010228] to-[#212367] to-75% absolute overflow-hidden">
          <div
            ref={ball1Ref}
            className="blur-[2px] w-[100vw] h-[100vw] sm:w-120 sm:h-120 md:w-[35rem] md:h-[35rem] lg:w-[42rem] lg:h-[42rem] xl:w-194 xl:h-194 -top-3/12 md:-top-5/12 lg:-top-6/12 left-1/2 -translate-x-1/2 rounded-full absolute bg-radial-[at_25%_25%] from-[#0D1164] to-[#640D5F] to-75%"
          ></div>
          <div
            ref={ball2Ref}
            className="blur-[3px] w-[100vw] h-[100vw] sm:w-120 sm:h-120 md:w-[35rem] md:h-[35rem] lg:w-[42rem] lg:h-[42rem] xl:w-194 xl:h-194 -bottom-3/12 md:-bottom-5/12 lg:-bottom-6/12 left-1/2 -translate-x-1/2 rounded-full absolute bg-radial-[at_100%_100%] from-[#0D1164] to-[#640D5F] to-80%"
          ></div>
        </div>
      </div>
      <div
        ref={containerRef}
        className="text-white w-full flex flex-col justify-center items-center bg-linear-to-b from-[#0d116471] to-[#640d6074] to-75% backdrop-blur-3xl p-2 mt-16 rounded-4xl"
      >
        <div className="flex flex-col gap-8 w-full max-w-80 sm:max-w-96">
          <h2 ref={headingRef} className="text-center p-4 text-4xl font-bold text-text-main underline">
            Get In Touch
          </h2>
          <div ref={socialIconsRef} className="flex justify-center gap-4">
            <div className="flex justify-center items-center border-1 border-gray-700 hover:border-white rounded-full w-10 h-10 hover:scale-130 duration-100 cursor-pointer group">
              <FontAwesomeIcon icon={faGithub} className=" group-hover:text-white text-2xl" />
            </div>
            <div className="flex justify-center items-center border-1 border-gray-700 hover:border-blue-700 rounded-full w-10 h-10 hover:scale-130 duration-100 cursor-pointer group">
              <FontAwesomeIcon icon={faLinkedin} className=" group-hover:text-blue-400 text-2xl" />
            </div>
            <div className="flex justify-center items-center border-1 border-gray-700 hover:border-pink-700 rounded-full w-10 h-10 hover:scale-130 duration-100 cursor-pointer group">
              <FontAwesomeIcon icon={faInstagram} className=" group-hover:text-pink-600 text-2xl" />
            </div>
          </div>
          <form
            ref={formRef} onSubmit={formSubmit}
            className="flex flex-col gap-6 p-8 sm:p-12 rounded-4xl backdrop-blur-2xl bg-linear-to-t from-[#0d1164] to-[#640d6074] to-75% shadow-2xl"
          >
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="name" className="text-xl sm:text-2xl">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e)=>{
                  setData((prev)=>({
                    ...prev,
                    name : e.target.value
                  }))
                }}
                placeholder="Enter Your Name "
                className="focus:outline-none border-none bg-[#29335081] p-2 text-md rounded placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="email" className="text-xl sm:text-2xl">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={data.email}
                onChange={(e)=>{
                  setData((prev)=>({
                    ...prev,
                    email : e.target.value
                  }))
                }}
                placeholder="Enter Your Name "
                className="focus:outline-none border-none bg-[#29335081] p-2 text-md rounded placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="message" className="text-xl sm:text-2xl">
                Message
              </label>
              <textarea
                value={data.message}
                onChange={(e)=>{
                  setData((prev)=>({
                    ...prev,
                    message : e.target.value
                  }))
                }}
                className="resize-y-none min-h-30 border-none focus:outline-none bg-[#29335081] p-2 text-md rounded placeholder:text-gray-400"
                id="message"
                placeholder="Tell me about your projects..."
              ></textarea>
            </div>
            <div className="w-full">
              <input type="submit" value="Send Inquiry" className="bg-gradient-to-bl from-[#0D1164] to-[#640D5F] w-full p-2 border-0 rounded-2xl cursor-pointer relative hover:-top-0.5 duration-300 transition-all" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
