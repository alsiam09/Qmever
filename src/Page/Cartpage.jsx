import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoAddOutline } from "react-icons/io5";
import { CgMathMinus } from "react-icons/cg";
import { FaCircleXmark } from "react-icons/fa6";
import { BuyItemDelete, qunDecrement, qunIncrement, removeCartPro, userBuyItem } from '../Componat/slice/AllSlice';
import { useNavigate } from 'react-router-dom';
const Cartpage = () => {
  const cartItem = useSelector((item)=>item.counter.cartItem)
  const BuyItem = useSelector((item)=>item.counter.BuyItem)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let [Lodingon, setLodingOn] = useState(false)
  let [Loding, setLoding] = useState(false)
  let HandleRemoveCartIn = (index) => {
    dispatch(removeCartPro(index))
  }
  let handleIncre = (index) => {
    dispatch(qunIncrement(index))
  }
  let handleDecre = (index) => {
    dispatch(qunDecrement(index))
  }
  let HandleCheckoutGo = () => {
    dispatch(BuyItemDelete(BuyItem))
    setLodingOn(true)
    setTimeout(() => {
      dispatch(userBuyItem({cartItem , totalPrice , totalQun }))
      navigate('/CheckOut')
    }, 500);
    setTimeout(() => {
      setLoding(true)
    }, 100);
  }
  let { totalPrice , totalQun } = cartItem.reduce((acc , item)=>{
    acc.totalPrice += item.Price * item.ProdectQun
    acc.totalQun += item.ProdectQun
    return (
      acc
    )
  },{totalPrice:0 , totalQun:0} )
  
  console.log(totalQun);
  
  return (
    <section>
      <div className="container mx-auto">
      <div className={`loging ${Lodingon === true ? " block " : "hidden"} `}>
          {
            Loding === true
            ? <div className={` fixed z-[999] duration-100 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] bg-[#0000008e]`}>Processing...</div>
            : <div className={` fixed z-[999] duration-100 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[0%] h-[100%] bg-[#0000008e]`}></div>
          }
        </div>
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
                <h2 className=' justify-end w-[20%] pr-[10px] flex items-center h-[70px] text-[#fff]'>Price : {cartItemx.Pricesub !== "" && cartItemx.Pricesub ? cartItemx.Pricesub * cartItemx.ProdectQun : cartItemx.Price * cartItemx.ProdectQun}৳</h2>
            </div>
            </div>
        ))}
        
        <div className="TotalBillbox my-[30px] flex justify-end">
          <h2 onClick={HandleCheckoutGo} className="Total rounded w-[20%] flex justify-center items-center p-[7px] border-[2px] bg-[#ff1586] text-[19px] font-[600] text-[#ffffffd3] border-[#fff]">Procces to CheckOut</h2>
        </div>
      </div>
    </section>
  )
}

export default Cartpage