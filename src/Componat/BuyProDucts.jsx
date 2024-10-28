import React, { useState } from 'react'

const BuyProDucts = ({ BuyItem , HandleSendOTP }) => {

  return (
    <div className="BuyProDuct w-[100%] md:w-[40%]">
      {BuyItem.map((Buyitemuser) => (
        Buyitemuser.totalPrice
          ?
          <div className="">
            {(Buyitemuser.cartItem).map((item)=>(
              <div className="box justify-between w-[100%] my-[10px] md:m-[10px] border-[2px] border-[#000] flex flex-wrap p-[10px] items-center gap-[10px]">
             {console.log(item, "fuck")}
             
             <img className='h-[70px]' src={item.imgurl} alt="" />
             <h2 className=' pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#000] text-[#000]'>{item.Prodectname}</h2>
             {
               item.ModelName 
               ?
               <h2 className=' pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#000] text-[#000]'>{item.ModelName} : {item.size}</h2>
               :
               ""
             }
             <h2 className=' pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#000] text-[#000]'>ProdectQun x {item.ProdectQun}</h2>
             <h2 className=' pr-[10px] flex items-center h-[70px] text-[#000]'>Price : {item.Pricesub !== "" && item.Pricesub ? item.Pricesub : item.Price}৳</h2>
         </div>

        
      )) }
       <div className='flex items-center gap-[10px]'><h3 className=' w-[20px] h-[20px] rounded-[50%] border-[2px] border-[red]' ></h3><h3 className='text-[18px] text-[#000]'>Cash on delivery</h3></div>
         <div className='flex items-center gap-[10px]'><h3 className=' w-[20px] h-[20px] rounded-[50%] border-[2px] border-[red]' ></h3><h3 className='text-[18px] text-[#000]'>Pay Online</h3></div>
         <h2 onClick={HandleSendOTP} className="pay w-[100%] my-[40px] md:mx-[10px] h-[40px] text-[#fff] font-[700] flex justify-center items-center text-[18px] bg-[red] rounded">Pay Now {Buyitemuser.totalPrice} ৳</h2>
      </div>
          :
          <div className="">
          <div className="box justify-between w-[100%] my-[10px] md:m-[10px] border-[2px] border-[#000] flex flex-wrap p-[10px] items-center gap-[10px]">
             <img className='h-[70px]' src={Buyitemuser.imgurl} alt="" />
             <h2 className=' pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#000] text-[#000]'>{Buyitemuser.Prodectname}</h2>
             {
               Buyitemuser.ModelName 
               ?
               <h2 className=' pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#000] text-[#000]'>{Buyitemuser.ModelName} : {Buyitemuser.size}</h2>
               :
               ""
             }
             <h2 className=' pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#000] text-[#000]'>ProdectQun x {Buyitemuser.ProdectQun}</h2>
             <h2 className=' pr-[10px] flex items-center h-[70px] text-[#000]'>Price : {Buyitemuser.Pricesub !== "" && Buyitemuser.Pricesub ? Buyitemuser.Pricesub : Buyitemuser.Price}৳</h2>
         </div>
         <div className="w-[100%] my-[40px] md:mx-[10px] flex-wrap">
         <div className='flex items-center gap-[10px]'><h3 className=' w-[20px] h-[20px] rounded-[50%] border-[2px] border-[red]' ></h3><h3 className='text-[18px] text-[#000]'>Cash on delivery</h3></div>
         <div className='flex items-center gap-[10px]'><h3 className=' w-[20px] h-[20px] rounded-[50%] border-[2px] border-[red]' ></h3><h3 className='text-[18px] text-[#000]'>Pay Online</h3></div>
         </div>
         <h2 onClick={HandleSendOTP} className="pay w-[100%] my-[40px] md:mx-[10px] h-[40px] text-[#fff] font-[700] flex justify-center items-center text-[18px] bg-[red] rounded">Buy Now {Buyitemuser.Pricesub !== "" && Buyitemuser.Pricesub ? Buyitemuser.Pricesub : Buyitemuser.Price}৳</h2>
         </div>
        ))}
    </div>
  )
}

export default BuyProDucts