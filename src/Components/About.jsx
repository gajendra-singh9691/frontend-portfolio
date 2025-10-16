import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import axios from "axios";
const api_uri = import.meta.env.VITE_API_URL

const About = ({ animationWork }) => {
    const headingRef = useRef(null)
    const paraRef1 = useRef(null);
    const skillheadingRef = useRef(null)
    const skillPerentDivRef = useRef(null)
    const ball1Ref = useRef()
    const ball2Ref = useRef()
    const [skill, setSkill] = useState([])
    const [paragraph, setParagraph] = useState([])
    let isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        outAnimation();
    }, [animationWork])

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`${api_uri}/api/about/sendaboutskill`);
                setSkill(response.data.data);
            }
        )();
    }, [])


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${api_uri}/api/about/sendaboutdata`)
                setParagraph(response.data.data[0].Detail)
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    const outAnimation = () => {
        // useGSAP(()=>{
        gsap.to(ball1Ref.current,
            { opacity: 0, scale: .8, y: "-1000", x: "1000", rotation: 360, duration: 2, delay: 1, ease: "power1.In" }
        )
        gsap.to(ball2Ref.current,
            { opacity: 0, scale: .8, y: 1000, x: -1000, rotation: 360, duration: 2, delay: 1, ease: "power1.In" }
        )
        gsap.to(headingRef.current, { opacity: 0, duration: 1, y: -50 })
        gsap.to(skillheadingRef.current, { opacity: 0, duration: 1, x: 50 })
        gsap.to(paraRef1.current, { opacity: 0, duration: 1, x: 50 })
        // gsap.to(paraRef2.current, { opacity: 0, duration: 1, x: 50 })
        gsap.to(skillPerentDivRef.current, { opacity: 0, duration: 1 })
    }


    useGSAP(() => {
        gsap.fromTo(ball1Ref.current,
            { opacity: 0, scale: .8, y: "-800", x: "800", rotation: 0 },
            { opacity: 1, scale: 1, y: "0", x: "0", rotation: 360, duration: 2, ease: "power1.Out" },
        )
        gsap.fromTo(ball2Ref.current,
            { opacity: 0, scale: .8, y: "800", x: "-800", rotation: 0 },
            { opacity: 1, scale: 1, y: "0", x: "0", rotation: 360, duration: 2, ease: "power1.Out" },
        )
    })
    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#about",
                    start: '-20%',
                }
            })
            tl.from(headingRef.current, { opacity: 0, duration: .75, y: -50, delay: 1.5 })
                .from(skillheadingRef.current, { opacity: 0, duration: 1, x: 50 }, "-=0.5")
                .from(paraRef1.current, { opacity: 0, duration: 1, x: 50 }, '-=.5')
                .from(skillPerentDivRef.current, { opacity: 0, duration: .75 })
        }
    )

    return (
        <div id='about' className='flex h-fit min-h-screen p-4 sm:p-16 pt-14 justify-evenly bg-linear-to-br from-secondary from-2% to-main to-70%'>
            <div className="fixed top-0 left-0 w-full h-screen z-[-2] overflow-x-hidden">
                <div className="w-full h-screen bg-linear-to-tl from-[#010228] to-[#212367] to-75% absolute overflow-hidden">
                    <div ref={ball1Ref} className="blur-[2px] w-96 h-96 sm:w-120 sm:h-120 md:w-[35rem] md:h-[35rem] lg:w-[42rem] lg:h-[42rem] xl:w-194 xl:h-194 -top-2/8 -right-2/8 sm:-top-4/8 sm:-right-2/8 rounded-full absolute bg-radial-[at_25%_25%] from-[#0D1164] to-[#640D5F] to-75%"></div>
                    <div ref={ball2Ref} className="blur-[3px] w-96 h-96 sm:w-120 sm:h-120 md:w-[35rem] md:h-[35rem] lg:w-[42rem] lg:h-[42rem] xl:w-194 xl:h-194 -bottom-2/8 -left-2/8 sm:-bottom-4/8 sm:-left-2/8 rounded-full absolute bg-radial-[at_100%_100%] from-[#0D1164] to-[#640D5F] to-80%"></div>
                </div>
            </div>
            <div className='w-full flex flex-col gap-20 justify-around px-8 py-8'>
                <div className="flex flex-col gap-8 text-white">
                    <h3 ref={headingRef} className='text-center  text-4xl font-bold text-text-main underline'>About me</h3>
                    <div className="flex flex-col gap-1" ref={paraRef1}>
                        {
                            paragraph.map((data, index) => {
                                return <p key={index}>{data}</p>
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    <h3 ref={skillheadingRef} className="text-4xl text-white font-bold underline text-center">My <span className="">Skillset</span></h3>
                    <div ref={skillPerentDivRef} className="flex justify-around sm:justify-center gap-14 sm:gap-14 py-4 px-0 sm:px-12 flex-wrap mx-auto">
                        {
                            skill.map((item, index) => {
                                return (<Skills key={index} icon={item.icon} name={item.name} />)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About




gsap.registerPlugin(ScrollTrigger);
const Skills = ({ icon, name }) => {
    const iconRef = useRef(null);
    const absoulutediv = useRef(null);
    const [toggle, settoggle] = useState(false);
    const innerwidth = window.innerWidth;
    const skillsChange = (event) => {
        // event.target.classList.toggle('active');
        if (innerwidth > 640) return;
        if (toggle) {
            absoulutediv.current.style.opacity = '0';
            settoggle(!toggle);
        }
        else {
            absoulutediv.current.style.opacity = '1';
            settoggle(!toggle);
        }
    }
    useGSAP(() => {
        gsap.fromTo(
            iconRef.current,
            { y: 500, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: iconRef.current,
                    start: "top 110%", // when enters viewport
                    toggleActions: "play none none none",
                    immediateRender: false,
                    once: true,
                },
            }
        )
    }, { scope: iconRef })

    return (
        <div
            ref={iconRef}
            className="bg-gray-300/3 backdrop-blur-sm relative duration-500 flex justify-center items-center w-20 h-20 sm:w-30 sm:h-30 rounded-md cursor-pointer group z-20"
        >
            <i className={`${icon} text-white text-3xl`}></i>
            <div
                ref={absoulutediv}
                className="w-20 h-20 sm:w-30 sm:h-30 absolute top-0 z-10 border-2 border-text-main rounded-md bg-[#FBFAF5] flex justify-center items-center flex-col box-border opacity-0 group-hover:opacity-100 duration-500 transition-opacity"
                onClick={skillsChange}
            >
                <span><i className={`${icon} text-black text-xl`}></i></span>
                <div>
                    <span>{name}</span>
                </div>
            </div>
        </div>
    )
}