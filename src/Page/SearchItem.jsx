import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchItem = () => {
    
    let location = useLocation()

    
    
    const query = new URLSearchParams(location.search).get('query')
    console.log(query);
    
    let [getDataSearch , setGetDataSearch] = useState([])
    
    let Data = () => {
            axios.get("https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products.json").then((res)=>{
                setGetDataSearch(res?.data?.filter((item)=>item?.Prodectname?.toLowerCase().includes(query.toLowerCase())))
            })
      
    }
    useEffect(()=>{
        Data()
    },[query])
    
    let navigate = useNavigate()

    let handleProDetails = (item) => {
        window.scrollTo(0, 0);
        navigate(`/productDetails/${item.ProdectId}`);
    }
    
  return (
    <section>
        <div className="container mx-auto">
        <div className="ProPraBox my-[40px] cursor-pointer w-[100%] flex flex-wrap gap-[4px] sm:gap-[12px]">
            {getDataSearch.map((item)=>(
                <div onClick={() => handleProDetails(item)} className="ProBox w-[49%] sm:w-[32%] lg:w-[24%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]">
                <div className="proImgBox w-[100%]  flex ">
                    <img className='w-[100%] rounded-[20px]' src={item.imgurl} alt="" />
                </div>
                <h2 className=' text-[15px] font-[600] py-[3px] sm:text-[20px] lg:text-[25px] text-[#9a0ec5]'>Price : <span>{item.Price}</span></h2>
                <h2 className=' text-[15px] font-[600] py-[3px] sm:text-[20px] lg:text-[25px]'>{item.Prodectname}</h2>
            </div>
            ))}
        </div>
        </div>
    </section>
  )
}

export default SearchItem