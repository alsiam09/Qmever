import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useParams, useResolvedPath } from 'react-router-dom';
import { IoLogoWhatsapp } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";


let apiData = createContext();

const ContextApi = ({ children }) => {
  let [info, setInfo] = useState([]);
  let [loading, setLoading] = useState(true);
  let [loading2, setLoading2] = useState(false);
  let [helperLoad , SetHelperLoad] = useState("")
  let [page, setPage] = useState(1);
  const itemsPerPage = 8; // Adjust this to load more or fewer items
  let path = window.location.pathname
  const getData = async () => {
    if (path === "/") {
      try {
        const res = await axios.get("https://rupkotha-a706e-default-rtdb.asia-southeast1.firebasedatabase.app/products.json");
        setInfo(prevInfo => [...prevInfo, ...res.data.slice((page - 1) * itemsPerPage, page * itemsPerPage)]);
        setLoading(false)
        SetHelperLoad(res.data.length)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  
  useEffect(()=>{
    if ( info.length !== 0 && helperLoad !== info.length ) {
      setLoading2(true);
    } else{
      setLoading2(false);
    }
  },[info , loading2 , helperLoad])

  useEffect(() => {
    getData();
  }, [page , path]);

  
  const handleScroll = () => {
    
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 300 && !loading && window.location.pathname === "/") {      
      setPage(prevPage => prevPage + 1);
    } else{
      setPage(prevPage => prevPage + 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading , path]);

  
  return (
    <apiData.Provider value={info}>
      {children}
      {loading ? <div className=" container mx-auto ">
        <div className=" my-[40px] ">
                <SkeletonTheme className='' baseColor="#f9f9f9" highlightColor="#fff">
                <div className="ProPraBox cursor-pointer mx-auto container flex flex-wrap gap-[4px] sm:gap-[12px]">

<div className=" group ProBox w-[49%] sm:w-[32%] lg:w-[24%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]">
    <div className="proImgBox w-[100%] overflow-hidden ">
    <Skeleton className=' h-[200px] md:h-[300px] my-[10px]'/>
    </div>
    <Skeleton className=' my-[3px] h-[20px]' count={2} />
</div>
<div className=" group ProBox w-[49%] sm:w-[32%] lg:w-[24%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]">
    <div className="proImgBox w-[100%] overflow-hidden ">
    <Skeleton className=' h-[200px] md:h-[300px] my-[10px]'/>
    </div>
    <Skeleton className=' my-[3px] h-[20px]' count={2} />
</div>
<div className=" md:block hidden group ProBox w-[49%] sm:w-[32%] lg:w-[24%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]">
    <div className="proImgBox w-[100%] overflow-hidden ">
    <Skeleton className=' h-[200px] md:h-[300px] my-[10px]'/>
    </div>
    <Skeleton className=' my-[3px] h-[20px]' count={2} />
</div>
<div className=" lg:block hidden group ProBox w-[49%] sm:w-[32%] lg:w-[24%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]">
    <div className="proImgBox w-[100%] overflow-hidden ">
    <Skeleton className=' h-[200px] md:h-[300px] my-[10px]'/>
    </div>
    <Skeleton className=' my-[3px] h-[20px]' count={2} />
</div>



</div>
  </SkeletonTheme>
      </div>
      </div>:""} {/* Optional loading indicator */}
      {
        loading2 === true && path === "/" ? <div className=" container mx-auto ">
        <div className=" my-[40px] ">
                <SkeletonTheme className='' baseColor="#f9f9f9" highlightColor="#fff">
                <div className="ProPraBox cursor-pointer mx-auto container flex flex-wrap gap-[4px] sm:gap-[12px]">

<div className=" group ProBox w-[49%] sm:w-[32%] lg:w-[24%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]">
    <div className="proImgBox w-[100%] overflow-hidden ">
    <Skeleton className=' h-[200px] md:h-[300px] my-[10px]'/>
    </div>
    <Skeleton className=' my-[3px] h-[20px]' count={2} />
</div>
<div className=" group ProBox w-[49%] sm:w-[32%] lg:w-[24%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]">
    <div className="proImgBox w-[100%] overflow-hidden ">
    <Skeleton className=' h-[200px] md:h-[300px] my-[10px]'/>
    </div>
    <Skeleton className=' my-[3px] h-[20px]' count={2} />
</div>
<div className=" md:block hidden group ProBox w-[49%] sm:w-[32%] lg:w-[24%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]">
    <div className="proImgBox w-[100%] overflow-hidden ">
    <Skeleton className=' h-[200px] md:h-[300px] my-[10px]'/>
    </div>
    <Skeleton className=' my-[3px] h-[20px]' count={2} />
</div>
<div className=" lg:block hidden group ProBox w-[49%] sm:w-[32%] lg:w-[24%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]">
    <div className="proImgBox w-[100%] overflow-hidden ">
    <Skeleton className=' h-[200px] md:h-[300px] my-[10px]'/>
    </div>
    <Skeleton className=' my-[3px] h-[20px]' count={2} />
</div>



</div>
  </SkeletonTheme>
      </div>
      </div>:""
      }
      
      <section className='bg-[#062919]' >
        <div className="container mx-auto px-[10px] lg:px-[0px] py-[30px] ">
          <h5 className=' flex items-center text-[#fff] md:text-[30px] font-[700]' >Qmever.com{path}</h5>
          <h5 className=' px-[20px] h-[60px] cursor-pointer border-[#fff] border-[2px] md:w-[500px] w-[100%] rounded-[5px] flex items-center text-[#fff] md:text-[30px] font-[500] my-[20px] justify-between ' > <span className=' text-[23px] md:text-[30px] border-r-[2px] border-r-[red] pr-[20px] '><IoLogoWhatsapp/></span> <span className='text-[red] cursor-pointer '>+880 1813-904257</span></h5>
          <h5 className=' px-[20px] h-[60px] cursor-pointer border-[#fff] border-[2px] md:w-[500px] w-[100%] rounded-[5px] flex items-center text-[#fff] md:text-[30px] font-[500] my-[20px] justify-between ' > <span className=' text-[23px] md:text-[30px] border-r-[2px] border-r-[red] pr-[20px] '><TfiEmail /></span> <span className='text-[red] cursor-pointer '>qmever.bd@gmail.com</span></h5>
          <iframe className='w-[100%] h-[200px]' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d117618.22871571548!2d89.17929430664063!3d22.892350670537734!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff6f45dabacc0f%3A0xa8030a8113dddfb!2sSiam%20House!5e0!3m2!1sen!2sbd!4v1731901565799!5m2!1sen!2sbd"></iframe>
        </div>
    </section>
    </apiData.Provider>
  );
};

export { ContextApi, apiData };
