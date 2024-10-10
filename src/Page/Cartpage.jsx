import React from 'react'
import { useSelector } from 'react-redux';

const Cartpage = () => {
  const cartItem = useSelector((item)=>item.counter.cartItem)
  console.log(cartItem); 
  
  return (
    <section>
      <div className="container mx-auto">
      {cartItem.map((cartItemx)=>(
            <div className="">
              <div className="box justify-between w-[100%] my-[10px] md:m-[10px] flex flex-wrap p-[10px] items-center gap-[10px]">
                <img className='h-[70px]' src={cartItemx.imgurl} alt="" />
                <h2 className=' pr-[10px] flex items-center h-[70px] text-[#fff]'>{cartItemx.Prodectname}</h2>
                <h2 className=' pr-[10px] flex items-center h-[70px] text-[#fff]'>{cartItemx.ModelName} : {cartItemx.size}</h2>
                <h2 className=' pr-[10px] flex items-center h-[70px] text-[#fff]'>ProdectQun x {cartItemx.ProdectQun}</h2>
                <h2 className=' pr-[10px] flex items-center h-[70px] text-[#fff]'>Price : {cartItemx.Pricesub !== "" ? cartItemx.Pricesub : cartItemx.Price}৳</h2>
            </div>
            <div className="w-[100%] my-[40px] md:mx-[10px] flex-wrap">
            <div className='flex items-center gap-[10px]'><h3 className=' w-[20px] h-[20px] rounded-[50%] border-[2px] border-[red]' ></h3><h3 className='text-[18px] text-[#fff]'>Cash on delivery</h3></div>
            <div className='flex items-center gap-[10px]'><h3 className=' w-[20px] h-[20px] rounded-[50%] border-[2px] border-[red]' ></h3><h3 className='text-[18px] text-[#fff]'>Pay Online</h3></div>
            </div>
            <h2 className="pay w-[100%] my-[40px] md:mx-[10px] h-[40px] text-[#fff] font-[700] flex justify-center items-center text-[18px] bg-[red] rounded">Pay Now {cartItemx.Pricesub !== "" ? cartItemx.Pricesub : cartItemx.Price}৳</h2>
            </div>
        ))}
      </div>
    </section>
  )
}

export default Cartpage