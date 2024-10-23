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
 
  console.log(SendOTP);
  

  let HandleSendOTP = () => {
    setSendOTP(true);
    
  }
  
  return (
    <section>
      <div className="container px-[10px] my-[30px] mx-auto flex flex-wrap">
        <UserContact/>
        <BuyProDucts HandleSendOTP={HandleSendOTP} BuyItem={BuyItem} />
      </div>
    </section>
  )
}

export default CheckOut