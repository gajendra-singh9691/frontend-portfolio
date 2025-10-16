import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const api_uri = import.meta.env.VITE_API_URL
import axios from "axios";
gsap.registerPlugin(ScrollTrigger);
const Home = ({ animationWork, setAnimationWork }) => {
  const [detailData, setDetailData] = useState({
    titles: []
  })
  const [titles, setTitles] = useState([])
  const ball1Ref = useRef()
  const ball2Ref = useRef()
  const cartRef = useRef()
  const nameRef = useRef()
  const skillsRef = useRef()
  const descriptionRef = useRef()
  const moreButtonRef = useRef()


  useGSAP(() => {
    gsap.fromTo(ball1Ref.current,
      { opacity: 0, scale: .8, y: "-1000", x: "-1000", rotation: 0 },
      { opacity: 1, scale: 1, y: "0", x: "0", rotation: 360, duration: 3, ease: "power1.Out" },
    )
    gsap.fromTo(ball2Ref.current,
      { opacity: 0, scale: .8, y: "1000", x: "1000", rotation: 0 },
      { opacity: 1, scale: 1, y: "0", x: "0", rotation: 360, duration: 3, ease: "power1.Out" },
    )
  })

  const outAnimation = () => {
    // useGSAP(()=>{
    gsap.to(ball1Ref.current,
      { opacity: 0, scale: .8, y: "-1000", x: "-1000", rotation: 360, duration: 2, delay: 1, ease: "power1.In" }
    )
    gsap.to(ball2Ref.current,
      { opacity: 0, scale: .8, y: 1000, x: 1000, rotation: 360, duration: 2, delay: 1, ease: "power1.In" }
    )
    gsap.to(cartRef.current,
      { opacity: 0, y: -1000, duration: 1 }
    )
    gsap.to(nameRef.current,
      { opacity: 0, y: -300, duration: 1 }
    )
    gsap.to(skillsRef.current,
      { opacity: 0, y: 100, duration: 1 }
    )
    gsap.to(descriptionRef.current,
      { opacity: 0, y: 100, duration: 1 }
    )
    gsap.to(moreButtonRef.current,
      { opacity: 0, y: 100, duration: 1 }
    )
  }

  let isFirstRender = useRef(true);
  // let [animationWork,setAnimationWork] = useState(false)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    outAnimation();
  }, [animationWork])

  useGSAP(() => {
    gsap.fromTo(cartRef.current,
      { y: -1000 },
      { y: 0, duration: 2, delay: 3, ease: "bounce.out" }
    )
    gsap.fromTo(nameRef.current,
      { opacity: 0, y: -300 },
      {
        opacity: 1, y: 0, delay: 3, duration: 1,
        scrollTrigger: {
          trigger: nameRef.current,
          start: "top 110%",
          // end : 10
        }
      }
    )
    gsap.fromTo(skillsRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1, y: 0, delay: 3, duration: 1.5,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 110%",
        }
      }
    )
    gsap.fromTo(descriptionRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1, y: 0, delay: 3, duration: 1.5,
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 110%",
        }
      }
    )
    gsap.fromTo(moreButtonRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1, y: 0, delay: 3, duration: 1.5,
        scrollTrigger: {
          trigger: moreButtonRef.current,
          start: "top 110%",
        }
      }
    )
  })

  useEffect(() => {
    (
      async () => {
        const response = await axios.get(`${api_uri}/api/home/homedata`)
        setDetailData(response.data.data)
      }
    )();
  }, [])

  useEffect(() => {
    setTitles(detailData.titles)
  }, [detailData])


  const navigate = useNavigate()
  const moreAboutMe = () => {
    outAnimation()
    // navigate("/about")
    setTimeout(() => {
      navigate("/about");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row justify-center md:justify-around items-center p-4 pt-16 sm:p-8 gap-12 md:gap-8 ">
      <div className="fixed top-0 left-0 w-full h-screen z-[-2] overflow-x-hidden">
        <div className="w-full h-screen bg-linear-to-tl from-[#010228] to-[#212367] to-75% absolute overflow-hidden">
          <div ref={ball1Ref} className="blur-[2px] w-96 h-96 sm:w-120 sm:h-120 md:w-[35rem] md:h-[35rem] lg:w-[42rem] lg:h-[42rem] xl:w-194 xl:h-194 -top-2/8 -left-2/8 sm:-top-4/8 sm:-left-2/8 rounded-full absolute bg-radial-[at_25%_25%] from-[#0D1164] to-[#640D5F] to-75%"></div>
          <div ref={ball2Ref} className="blur-[3px] w-96 h-96 sm:w-120 sm:h-120 md:w-[35rem] md:h-[35rem] lg:w-[42rem] lg:h-[42rem] xl:w-194 xl:h-194 -bottom-2/8 -right-2/8 sm:-bottom-3/8 sm:-right-2/8 rounded-full absolute bg-radial-[at_100%_100%] from-[#0D1164] to-[#640D5F] to-80%"></div>
        </div>
      </div>
      <div ref={cartRef}>
        <Cart setAnimationWork={setAnimationWork} animationWork={animationWork} image={detailData.image} />
      </div>
      <div className="min-w-fit md:min-w-5/12 h-full text-white flex flex-col gap-8 text-center md:text-left">
        <div ref={nameRef}>
          <span className="text-2xl">Hii I'm</span>
          <h2 className="text-4xl ">{detailData.name}</h2>
        </div>
        <div ref={skillsRef}>
          <TypingAnimation titles={titles} />
        </div>
        <div>
          <p ref={descriptionRef} className="text-text-secondary text-lg md:text-xl font-light max-w-[500px]">{detailData.detail}</p>
        </div>
        <div ref={moreButtonRef}>
          <button onClick={moreAboutMe} className="bg-[#640d604b]  text-white font-bold px-6 py-1 rounded-md cursor-pointer hover:bg-linear-to-r hover:scale-95 duration-75">More About Me...</button>
        </div>
      </div>
    </div>
  )
}

export default Home




const Cart = ({ setAnimationWork, animationWork,image}) => {

  const navigate = useNavigate()

  const [socialMedia, setSocialMedia] = useState({})

  useEffect(() => {
    (
      async () => {
        const response = await axios.get(`${api_uri}/api/socialmedia/sendsocialmedialink`)
        setSocialMedia(response.data.data)
      }
    )();
  }, [])

  return (
    <div className="rounded-xl w-fit p-7 bg-[#92929209] flex flex-col gap-3 lg:gap-6 relative top-0 hover:top-[-5px] duration-200 transition-all h-fit shadow-2xl shadow-text-secondary backdrop-blur-sm">
      <div className="border-4 bg-radial-gradient-to-r from-primary via-secondary to-main rounded-xl shadow-lg border-[#640d5f] w-50 lg:w-60 h-50 lg:h-60 relative">
        <img src={image} className="w-full h-full object-contain" alt="" />
      </div>
      <div className="flex gap-2 py-1 justify-center">
        <a href={socialMedia.github} target="_blank" className="px-2 py-1 border-1 border-gray-700 hover:border-white rounded-md hover:scale-130 duration-100 cursor-pointer">
          <FontAwesomeIcon icon={faGithub} className="text-white" />
        </a>
        <a href={socialMedia.linkdin} target="_blank" className="px-2 py-1 border-1 border-gray-700 hover:border-blue-700 rounded-md hover:scale-130 duration-100 cursor-pointer">
          <FontAwesomeIcon icon={faLinkedin} className="text-blue-400" />
        </a>
        <a href={socialMedia.instagram} target="_blank" className="px-2 py-1 border-1 border-gray-700 hover:border-pink-700 rounded-md hover:scale-130 duration-100 cursor-pointer">
          <FontAwesomeIcon icon={faInstagram} className="text-pink-600" />
        </a>
      </div>
      <div className="flex justify-center">
        <button onClick={() => {
          setAnimationWork(!animationWork)
          setTimeout(() => {
            navigate('/about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 1500);
        }} className="bg-[#640d5f] border-2 border-[#0d1164] text-white font-bold px-6 py-1 rounded-md cursor-pointer hover:bg-linear-to-r hover:scale-95 duration-75">Contact Me</button>
      </div>
    </div>
  )
}

function TypingAnimation({ titles }) {
  // const [titles, setTitles] = useState([]);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (titles.length === 0) return;
    const currentTitle = titles[currentTitleIndex];
    let timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => {
          if (prev.length > 0) return prev.slice(0, -1);
          setIsDeleting(false);
          setCurrentTitleIndex((i) => (i + 1) % titles.length);
          return "";
        });
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setCurrentText((prev) => {
          if (prev.length < currentTitle.length) {
            return currentTitle.slice(0, prev.length + 1);
          } else {
            setIsPaused(true);
            return prev;
          }
        });
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [titles, currentTitleIndex, isDeleting, isPaused, currentText]);

  return (
    <span className="text-text-secondary text-2xl md:text-4xl font-semibold">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}