import React from 'react'

const BuyProDucts = ({BuyItem}) => {
    console.log(BuyItem);
    
  return (
    <div className="BuyProDuct w-[100%] md:w-[40%]">
        {BuyItem.map((Buyitemuser)=>(
            <div className="">
              <div className="box justify-between w-[100%] my-[10px] md:m-[10px] border-[2px] border-[#fff] flex flex-wrap p-[10px] items-center gap-[10px]">
                <img className='h-[70px]' src={Buyitemuser.imgurl} alt="" />
                <h2 className=' pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#fff] text-[#fff]'>{Buyitemuser.Prodectname}</h2>
                {
                  Buyitemuser.ModelName 
                  ?
                  <h2 className=' pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#fff] text-[#fff]'>{Buyitemuser.ModelName} : {Buyitemuser.size}</h2>
                  :
                  ""
                }
                <h2 className=' pr-[10px] sm:border-r-[1px] flex items-center h-[70px] sm:border-x-[#fff] text-[#fff]'>ProdectQun x {Buyitemuser.ProdectQun}</h2>
                <h2 className=' pr-[10px] flex items-center h-[70px] text-[#fff]'>Price : {Buyitemuser.Pricesub !== "" && Buyitemuser.Pricesub ? Buyitemuser.Pricesub : Buyitemuser.Price}৳</h2>
            </div>
            <div className="w-[100%] my-[40px] md:mx-[10px] flex-wrap">
            <div className='flex items-center gap-[10px]'><h3 className=' w-[20px] h-[20px] rounded-[50%] border-[2px] border-[red]' ></h3><h3 className='text-[18px] text-[#fff]'>Cash on delivery</h3></div>
            <div className='flex items-center gap-[10px]'><h3 className=' w-[20px] h-[20px] rounded-[50%] border-[2px] border-[red]' ></h3><h3 className='text-[18px] text-[#fff]'>Pay Online</h3></div>
            </div>
            <h2 className="pay w-[100%] my-[40px] md:mx-[10px] h-[40px] text-[#fff] font-[700] flex justify-center items-center text-[18px] bg-[red] rounded">Pay Now {Buyitemuser.Pricesub !== "" ? Buyitemuser.Pricesub : Buyitemuser.Price}৳</h2>
            </div>
        ))}
    </div>
  )
}

export default BuyProDucts