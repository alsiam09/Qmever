import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BuyProDucts from '../Componat/BuyProDucts';
import UserContact from '../Componat/UserContact';

const CheckOut = () => {
  let BuyItem = useSelector((item)=>item.counter.BuyItem)
  useEffect(() => {
    window.scrollTo(0, 0);
  });

    
  let [SendOTP , setSendOTP] = useState(false);  

  let HandleSendOTP = () => {
    setSendOTP(true);
    
  }
  
  return (
    <section>
      <div className="container px-[10px] my-[30px] mx-auto flex flex-wrap">
        <UserContact/>
        {
          SendOTP === true 
          ? <div className=" p-[30px] rounded OTPInput fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] bg-[#fff]">
            <h2 className=' flex justify-center mb-[20px] text-[18px] font-[600]'>Please cheak you message box</h2>
            <h2 className=' flex justify-center my-[20px] text-[18px] text-[green] font-[600]'>+880 XXXX XXXXXX</h2>
            <div className=" flex justify-center items-center ">
            <input type="text" className='w-[100%] h-[40px] outline-none px-[5px] border-[2px] border-[#00000097] rounded ' placeholder='Inter OTP' />
            </div>
            <h2 className=' flex justify-center items-center mt-[10px] rounded w-[80px] h-[30px] bg-[#000] text-[#fff] text-[15px] font-[600]'>Verify</h2>
          </div>
          : ""
        }
        <BuyProDucts HandleSendOTP={HandleSendOTP} BuyItem={BuyItem} />
      </div>
    </section>
  )
}

export default CheckOut