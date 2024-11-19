import React, { useContext, useState } from 'react'
import { apiData } from './ContextApi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const AllProductsHome = () => {

    let navigate = useNavigate()
    let productsData = useContext(apiData)

    let handleProDetails = (item) => {
        window.scrollTo(0, 0);
        navigate(`productDetails/${item.ProdectId}`);
    }

    return (

        <section className='py-[30px] sm:py-[50px] px-[10px]'>
            <div className="container mx-auto">
                <div className="ProPraBox cursor-pointer w-[100%] flex flex-wrap gap-[4px] sm:gap-[12px]">
                    {productsData.map((item) => (


                        item !== null
                        &&
                        <div onClick={() => handleProDetails(item)} className=" lg:hover:shadow-2xl group ProBox w-[49%] sm:w-[32%] lg:w-[24%] bg-[#fff] py-[6px] px-[6px] rounded-[20px]">
                            <div className="proImgBox w-[100%] overflow-hidden ">
                                <img className='w-[100%] rounded-[20px] group-hover:w-[100%]' src={item.imgurl} alt="" />
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

export default AllProductsHome