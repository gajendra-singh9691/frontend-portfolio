import { faGithub, faInstagram, faLinkedin, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState,useEffect} from 'react'
import axios from "axios";
const api_uri = import.meta.env.VITE_API_URL
const Footer = () => {
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
    <div className='text-white flex justify-around items-center p-8 bg-gray-300/4 backdrop-blur-3xl'>
        <div className='flex flex-col gap-2 sm:flex-row items-center'>
            <span>&copy; 2025</span>
            <span className='hidden sm:inline'> | </span>
            <span>All Rights Reserved.</span>
        </div>
        <div className='flex gap-2 sm:gap-8'>
            
            <div className='group'>
              <a target="_blank" href={socialMedia.instagram}>
                <FontAwesomeIcon className='text-xl sm:text-2xl group-hover:text-[#FD1D1D] group-hover:scale-140 duration-150 cursor-pointer' icon={faInstagram} />
              </a>
            </div>
            <div  className='group'>
              <a target="_blank" href={socialMedia.github}>
                <FontAwesomeIcon className='text-xl sm:text-2xl group-hover:scale-140 duration-150 cursor-pointer' icon={faGithub} />
              </a>
            </div>
            <div className='group'>
              <a target="_blank" href={socialMedia.linkdin}>
                <FontAwesomeIcon className='text-xl sm:text-2xl group-hover:text-[#0A66C2] group-hover:scale-140 duration-150 cursor-pointer' icon={faLinkedinIn} />
              </a>
            </div>
        </div>
    </div>
  )
}

export default Footer
