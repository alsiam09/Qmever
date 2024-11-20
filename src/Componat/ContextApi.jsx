import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import _ from "lodash"; // Import Lodash for debounce

// Create Context
let apiData = createContext();

const ContextApi = ({ children }) => {
  const [info, setInfo] = useState([]); // Product data
  const [loading, setLoading] = useState(true); // Initial loading state
  const [loadingMore, setLoadingMore] = useState(false); // Additional load state
  const [totalItems, setTotalItems] = useState(0); // Total available items
  const [page, setPage] = useState(1); // Current page number
  const itemsPerPage = 12; // Items to fetch per page

  
  // Fetch data function
  const getData = () => {
      axios.get(
        "https://rupkotha-a706e-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      ).then((res)=>{

        
        // Simulate paginated data
        const total = res.data.length;
        const newItems = res.data.slice(
          (page - 1) * itemsPerPage,
          page * itemsPerPage
        );
        
        setInfo((prevInfo) => [...prevInfo, ...newItems]);
        setTotalItems(total); // Save total available items
        setLoading(false); // Stop initial loading
      })

  };

  // Infinite scroll handler
  const handleScroll = _.debounce(() => {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 300;

    // Trigger next page load if on home page and more data is available
    if (isBottom && info.length < totalItems) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 200); // Debounce for 200ms

  // Effect to fetch data when page changes
  useEffect(() => {
    getData();
  }, [page]);
  
  // Attach scroll event listener only on home page
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [info, totalItems]);

  useEffect(()=>{
    if (totalItems !== info.length) {
      setLoadingMore(true)
    }else{
      setLoadingMore(false)
    }
  })

  return (
    <apiData.Provider value={info}>
      {children}
      {/* Skeleton loader for infinite scroll */}
      {loadingMore ? (
        <div className="container mx-auto my-[40px]">
          <SkeletonTheme baseColor="#f9f9f9" highlightColor="#fff">
            <div className="ProPraBox cursor-pointer mx-auto container flex flex-wrap gap-[4px] sm:gap-[12px]">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="group ProBox w-[49%] sm:w-[32%] lg:w-[24%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]"
                >
                  <div className="proImgBox w-[100%] overflow-hidden">
                    <Skeleton className="h-[200px] md:h-[300px] my-[10px]" />
                  </div>
                  <Skeleton className="my-[3px] h-[20px]" count={2} />
                </div>
              ))}
            </div>
          </SkeletonTheme>
        </div>
      ) : "" }
    </apiData.Provider>
  );
};

export { ContextApi, apiData };
