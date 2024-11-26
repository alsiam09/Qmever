import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { apiData , ContextApi } from "./ContextApi";
const AllProductsHome = () => {
  const navigate = useNavigate();
  const productsData = useContext(apiData);

  console.log(productsData);
  
  const handleProDetails = (item) => {
    window.scrollTo(0, 0);
    navigate(`/productDetails/${item.ProdectId}`);
  };


  if (!productsData || productsData.length === 0) {
    return (
           <div className={` container mx-auto `}>
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
          </div>
    );
  }

  return (
    <section className="py-[30px] sm:py-[50px] px-[10px]">
      <div className="container mx-auto">
        <div className="ProPraBox cursor-pointer w-[100%] flex flex-wrap gap-[4px] sm:gap-[12px]">
          {productsData.map(
            (item, index) =>
              item && (
                <div
                  key={item.ProdectId || index} // Use ProdectId as key, fallback to index if missing
                  onClick={() => handleProDetails(item)}
                  className="lg:hover:shadow-2xl group ProBox w-[49%] sm:w-[32%] lg:w-[19%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]"
                >
                  <div className="proImgBox w-[100%] overflow-hidden">
                    <img
                      className="w-[100%] rounded-[20px] group-hover:scale-110 transition-transform duration-300"
                      src={item.imgurl || "https://via.placeholder.com/150"} // Fallback image
                      alt={item.Prodectname || "Product Image"}
                    />
                  </div>
                  <h2 className="text-[15px] font-[600] py-[3px] sm:text-[20px] lg:text-[25px] text-[#9a0ec5]">
                    Price: <span>{item.Price || "N/A"}</span>
                  </h2>
                  <h2 className="text-[15px] font-[600] py-[3px] sm:text-[20px] lg:text-[25px]">
                    {item.Prodectname || "Unnamed Product"}
                  </h2>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default AllProductsHome;
