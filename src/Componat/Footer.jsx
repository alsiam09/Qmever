import React, { useEffect, useRef, useState } from 'react'
import { IoLogoWhatsapp } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { MdKeyboardArrowUp } from "react-icons/md";

const Footer = () => {
  let Footer_Ref = useRef()
  let path = window.location.pathname
  let [ ShowFooter , SetShowFooter ] = useState(false)

  useEffect(()=>{
    let RefHandleClick = (e) => {
      SetShowFooter(Footer_Ref.current.contains(e.target))
      
    }
    document.addEventListener("click" , RefHandleClick);
    return () => document.removeEventListener("click" , RefHandleClick);
  },[])



  return (
    <section>
      <h5 ref={Footer_Ref} className={` ${ ShowFooter !== true ? "block" : "hidden" } fixed bottom-0 left-[50%] translate-x-[-50%] bg-[#062919] h-[20px] 2xl:h-[40px] z-[999] w-[100px] 2xl:w-[200px] rounded-t-[10px] flex justify-center items-center text-[#fff] 2xl:text-[40px] text-[15px]`} ><MdKeyboardArrowUp/></h5>
      {
        ShowFooter !== false
        ?
      <div className='bg-[#062919] w-[100%] fixed bottom-[0px] duration-200 left-0 z-[990]' >
        <div className="container mx-auto px-[10px] lg:px-[0px] py-[30px] ">
          <h5 className=' flex items-center text-[#fff] md:text-[30px] font-[700]' >Qmever.com{path}</h5>
          <h5 className=' px-[20px] h-[60px] cursor-pointer border-[#fff] border-[2px] md:w-[500px] w-[100%] rounded-[5px] flex items-center text-[#fff] md:text-[30px] font-[500] my-[20px] justify-between ' > <span className=' text-[23px] md:text-[30px] border-r-[2px] border-r-[red] pr-[20px] '><IoLogoWhatsapp/></span> <span className='text-[red] cursor-pointer '>+880 1813-904257</span></h5>
          <h5 className=' px-[20px] h-[60px] cursor-pointer border-[#fff] border-[2px] md:w-[500px] w-[100%] rounded-[5px] flex items-center text-[#fff] md:text-[30px] font-[500] my-[20px] justify-between ' > <span className=' text-[23px] md:text-[30px] border-r-[2px] border-r-[red] pr-[20px] '><TfiEmail /></span> <span className='text-[red] cursor-pointer '>qmever.bd@gmail.com</span></h5>
          <iframe className='w-[100%] h-[200px]' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d117618.22871571548!2d89.17929430664063!3d22.892350670537734!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff6f45dabacc0f%3A0xa8030a8113dddfb!2sSiam%20House!5e0!3m2!1sen!2sbd!4v1731901565799!5m2!1sen!2sbd"></iframe>
        </div>
    </div>
        :
        <div className='bg-[#062919] w-[100%] fixed bottom-[-100%] duration-200 left-0 z-[990]' >
        <div className="container mx-auto px-[10px] lg:px-[0px] py-[30px] ">
          <h5 className=' flex items-center text-[#fff] md:text-[30px] font-[700]' >Qmever.com{path}</h5>
          <h5 className=' px-[20px] h-[60px] cursor-pointer border-[#fff] border-[2px] md:w-[500px] w-[100%] rounded-[5px] flex items-center text-[#fff] md:text-[30px] font-[500] my-[20px] justify-between ' > <span className=' text-[23px] md:text-[30px] border-r-[2px] border-r-[red] pr-[20px] '><IoLogoWhatsapp/></span> <span className='text-[red] cursor-pointer '>+880 1813-904257</span></h5>
          <h5 className=' px-[20px] h-[60px] cursor-pointer border-[#fff] border-[2px] md:w-[500px] w-[100%] rounded-[5px] flex items-center text-[#fff] md:text-[30px] font-[500] my-[20px] justify-between ' > <span className=' text-[23px] md:text-[30px] border-r-[2px] border-r-[red] pr-[20px] '><TfiEmail /></span> <span className='text-[red] cursor-pointer '>qmever.bd@gmail.com</span></h5>
          <iframe className='w-[100%] h-[200px]' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d117618.22871571548!2d89.17929430664063!3d22.892350670537734!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff6f45dabacc0f%3A0xa8030a8113dddfb!2sSiam%20House!5e0!3m2!1sen!2sbd!4v1731901565799!5m2!1sen!2sbd"></iframe>
        </div>
    </div>
      }
    </section>
  )
}

export default Footer