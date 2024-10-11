import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoAddOutline } from "react-icons/io5";
import { CgMathMinus } from "react-icons/cg";
import { FaCircleXmark } from "react-icons/fa6";
import { qunDecrement, qunIncrement, removeCartPro } from '../Componat/slice/AllSlice';
const Cartpage = () => {
  const cartItem = useSelector((item)=>item.counter.cartItem)

  let dispatch = useDispatch()

  let HandleRemoveCartIn = (index) => {
    dispatch(removeCartPro(index))
  }
  let handleIncre = (index) => {
    dispatch(qunIncrement(index))
  }
  let handleDecre = (index) => {
    dispatch(qunDecrement(index))
  }
  return (
    <section>
      <div className="container mx-auto">
      <div className=" border-b-[2px] border-b-[#ffffff81] ">
              <div className="box justify-between w-[100%] my-[10px] md:m-[10px] flex flex-wrap p-[10px] items-center gap-[10px]">
                <h2 className='w-[30%] pr-[10px] flex items-center h-[70px] text-[#fff]'>Product</h2>
                <h2 className=' justify-start w-[20%] pr-[10px] flex items-center h-[70px] text-[#fff]'>Model</h2>
                <h2 className=' justify-start w-[20%] pr-[10px] flex items-center h-[70px] text-[#fff]'>Quntite</h2>
                <h2 className=' justify-end w-[20%] pr-[10px] flex items-center h-[70px] text-[#fff]'>Price</h2>
            </div>
            </div>
      {cartItem.map((cartItemx , index)=>(
            <div className="">
              <div className="box justify-between w-[100%] my-[10px] md:m-[10px] flex flex-wrap p-[10px] items-center gap-[10px]">
                <div className="w-[30%] flex justify-between pr-[30px]">
                <div className="img relative">
                <h2 onClick={()=>HandleRemoveCartIn(index)} className=' text-[16px] text-[#f00] absolute top-[-5px] left-[-5px] z-[99]'><FaCircleXmark/></h2>
                <img className='h-[70px]' src={cartItemx.imgurl} alt="" />
                </div>
                <h2 className=' pr-[10px] flex items-center h-[70px] text-[#fff]'>{cartItemx.Prodectname}</h2>
                </div>
                <h2 className=' justify-start w-[20%] pr-[10px] flex items-center h-[70px] text-[#fff]'>
                  {
                    cartItemx.ModelName
                    ? <h2>{cartItemx.ModelName} : {cartItemx.size}</h2>
                    : <h2>Regulear</h2>
                  }
                
                </h2>
                <div className=' justify-start w-[20%] pr-[10px] flex items-center h-[70px] text-[#fff]'>
                  <h2 onClick={()=>handleIncre(index)} className='px-[5px]'><IoAddOutline/></h2>
                  <h2 className='px-[5px] text-[green]'>{cartItemx.ProdectQun}</h2>
                  <h2 onClick={()=>handleDecre(index)} className='px-[5px]'><CgMathMinus/></h2>  
                </div>
                <h2 className=' justify-end w-[20%] pr-[10px] flex items-center h-[70px] text-[#fff]'>Price : {cartItemx.Pricesub !== "" && cartItemx.Pricesub ? cartItemx.Pricesub : cartItemx.Price}৳</h2>
            </div>
            </div>
        ))}
      </div>
    </section>
  )
}

export default Cartpage