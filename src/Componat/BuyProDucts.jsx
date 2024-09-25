import React from 'react'

const BuyProDucts = ({BuyItem}) => {
    console.log(BuyItem);
    
  return (
    <div className="BuyProDuct w-[100%] md:w-[40%]">
        {BuyItem.map((Buyitemuser)=>(
            <div className="box justify-between m-[10px] border-[2px] border-[#fff] flex h-[90px] p-[10px] items-center gap-[10px]">
                <img className='h-[70px]' src={Buyitemuser.imgurl} alt="" />
                <h2 className=' pr-[10px] border-r-[1px] flex items-center h-[70px] border-x-[#fff] text-[#fff]'>{Buyitemuser.Prodectname}</h2>
                <h2 className=' pr-[10px] border-r-[1px] flex items-center h-[70px] border-x-[#fff] text-[#fff]'>{Buyitemuser.ModelName} : {Buyitemuser.size}</h2>
                <h2 className=' pr-[10px] border-r-[1px] flex items-center h-[70px] border-x-[#fff] text-[#fff]'>ProdectQun x {Buyitemuser.ProdectQun}</h2>
                <h2 className=' pr-[10px] flex items-center h-[70px] text-[#fff]'>Price : {Buyitemuser.Price}</h2>
            </div>
        ))}
    </div>
  )
}

export default BuyProDucts