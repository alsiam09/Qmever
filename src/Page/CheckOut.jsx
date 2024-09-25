import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import BuyProDucts from '../Componat/BuyProDucts';
import UserContact from '../Componat/UserContact';

const CheckOut = () => {
  let BuyItem = useSelector((item)=>item.counter.BuyItem)
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <section>
      <div className="container px-[10px] my-[30px] mx-auto flex flex-wrap">
        <UserContact/>
        <BuyProDucts BuyItem={BuyItem} />
      </div>
    </section>
  )
}

export default CheckOut