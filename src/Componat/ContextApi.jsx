import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
let apiData = createContext();

const ContextApi = ({ children }) => {
  let [info, setInfo] = useState([]);
  let [loading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  const itemsPerPage = 5; // Adjust this to load more or fewer items

  const getData = async () => {
    try {
      const res = await axios.get("https://rupkotha-a706e-default-rtdb.asia-southeast1.firebasedatabase.app/products.json");
      setInfo(prevInfo => [...prevInfo, ...res.data.slice((page - 1) * itemsPerPage, page * itemsPerPage)]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handleScroll = () => {
    
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight && !loading) {      
      setPage(prevPage => prevPage + 1);
    } else{

    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  console.log(info, "ok");

  return (
    <apiData.Provider value={info}>
      {children}
      {loading && <div className=" container mx-auto ">
        <div className=" my-[40px] ">
                <SkeletonTheme className='' baseColor="#202020" highlightColor="#444">
    <p>
      <Skeleton count={3} />
    </p>
  </SkeletonTheme>
      </div>
      </div>} {/* Optional loading indicator */}
    </apiData.Provider>
  );
};

export { ContextApi, apiData };
