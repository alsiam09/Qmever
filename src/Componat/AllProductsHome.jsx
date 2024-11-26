import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TbLoader2 } from "react-icons/tb";
import _ from "lodash"; // Lodash for debounce
import { useNavigate } from "react-router-dom";

const AllProductsHome = () => {
  const [info, setInfo] = useState([]); // Product data
  const [loading, setLoading] = useState(true); // Initial loading state
  const [loadingMore, setLoadingMore] = useState(false); // Additional load state
  const [totalItems, setTotalItems] = useState(0); // Total available items
  const [page, setPage] = useState(1); // Current page number
  const itemsPerPage = 12; // Items to fetch per page

  const navigate = useNavigate()

  const getData = () => {
    axios
      .get(
        "https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      )
      .then((res) => {
        const total = res.data.length; // Total items from API
        const newItems = res.data.slice(
          (page - 1) * itemsPerPage,
          page * itemsPerPage
        ); // Simulate paginated data
        setInfo((prevInfo) => [...prevInfo, ...newItems]); // Append new items
        setTotalItems(total);
        setLoading(false); // Stop initial loading
        setLoadingMore(false); // Stop additional loading state
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  };

  // Infinite scroll handler
  const handleScroll = _.debounce(() => {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 300;

    // Trigger next page load if more data is available
    if (isBottom && info.length < totalItems) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 200); // Debounce for 200ms

  // Effect to fetch data when page changes
  useEffect(() => {
    getData();
    setLoadingMore(true);
  }, [page]);

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [info, totalItems]);

  if (loading && info.length === 0) {
    return (
      <div className="container mx-auto my-10">
        <SkeletonTheme baseColor="#f9f9f9" highlightColor="#fff">
          <div className="flex flex-wrap">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className=" bg-white w-[50%] md:w-[33.333333%] lg:w-[20%] p-[4px]  md:p-4"
                >
                  <Skeleton className="h-48 mb-4" />
                  <Skeleton className="h-6 mb-2" />
                  <Skeleton className="h-6 mb-2" />
                </div>
              ))}
          </div>
        </SkeletonTheme>
      </div>
    );
  }

  const handleProDetails = (item) => {
    navigate(`/productDetails/${item.ProdectId}`);
    window.scrollTo(0, 0);
  } 
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap ">
          {info.map((item, index) => (
            item !== null
            ?
            <div
              key={item.ProdectId || index}
              onClick={()=>handleProDetails(item)}
              className="group w-[50%] md:w-[33.333333%] lg:w-[20%] p-[4px]  md:p-4 rounded-lg cursor-pointer"
            >
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  className="w-full md:h-[240px] object-cover group-hover:scale-110 transition-transform duration-300"
                  src={item.imgurl}
                  alt={item.Prodectname || "Product Image"}
                />
              </div>
              <h2 className="text-lg font-semibold text-purple-700 mt-2">
                Price: {item.Price || "N/A"}
              </h2>
              <h3 className="text-md font-medium text-gray-800">
                {item.Prodectname || "Unnamed Product"}
              </h3>
            </div>
            : ""
          ))}
        </div>
        {loadingMore && (
          <div className="flex justify-center my-8">
            <TbLoader2 className="w-10 h-10 animate-spin text-purple-700" />
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProductsHome;
