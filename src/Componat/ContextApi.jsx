import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useParams, useResolvedPath } from 'react-router-dom';



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
    if ( info.length !== 0 && helperLoad !== info.length && path === "/" ) {
      setLoading2(true);
    } else{
      setLoading2(false);
    }
  },[info , loading2 , helperLoad])

  useEffect(() => {
    getData();
  }, [page , path]);

  
  const handleScroll = () => {
    
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 300 && !loading ) {      
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
        loading2 === true && path === "/" ? <div className={` container mx-auto `}>
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
      
      
    </apiData.Provider>
  );
};

export { ContextApi, apiData };
