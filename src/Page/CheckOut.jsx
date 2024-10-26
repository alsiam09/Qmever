import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuyProDucts from '../Componat/BuyProDucts';
import UserContact from '../Componat/UserContact';
import { getDatabase, ref, set , onValue } from "firebase/database";
import { removeAllcartPro } from '../Componat/slice/AllSlice';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
  const db = getDatabase();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let userUid = useSelector((item)=>item.counter.user)
  const BuyItem = useSelector((item) => item.counter.BuyItem);
  const cartItem = useSelector((item)=> item.counter.cartItem)
  console.log(cartItem);
  
  let [ userDelivery , setuserDelivery ] = useState({})
  const [SendOTP, setSendOTP] = useState(false);


  console.log(BuyItem);
  
  useEffect(()=>{
    const starCountRef = ref(db, 'users/' + userUid);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val().Delivery_address;
        setuserDelivery(data)            
      });
  },[db])

  const HandleSendOTP = () => {
      try {
        set(ref(db, 'orders/' + `${userUid}/` + 1 ), {
          orderId : 1,
          customer : userDelivery,
          orderItem : { BuyItem , orderStatus : "Placed"},
          
        })
        .then(()=>{
          dispatch(removeAllcartPro(cartItem))
          console.log("ok");
          setTimeout(() => {
            navigate("/orders")
          }, 200);
          
        })
      } catch (error) {
        console.log("error");
        
      }
  };

  const OTPINPUT = (e) => {
  };

  const handleVerifyOTP = async () => {
    
  };

  return (
    <section>
      <div className="container px-[10px] my-[30px] mx-auto flex flex-wrap">
        <UserContact userDelivery={userDelivery} />
        {SendOTP && (
          <div className="p-[30px] rounded OTPInput fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] bg-[#fff]">
            <h2 className='flex justify-center mb-[20px] text-[18px] font-[600]'>Please check your message box</h2>
            <h2 className='flex justify-center my-[20px] text-[18px] text-[green] font-[600]'>{phoneNumber.replace(/\d(?=\d{4})/g, '*')}</h2>
            <div className="flex justify-center items-center">
              <input onChange={OTPINPUT} type="text" className='w-[100%] h-[40px] outline-none px-[5px] border-[2px] border-[#00000097] rounded' placeholder='Enter OTP' />
            </div>
            <h2 onClick={handleVerifyOTP} className='flex justify-center items-center mt-[10px] rounded w-[80px] h-[30px] bg-[#000] text-[#fff] text-[15px] font-[600] cursor-pointer'>Verify</h2>
          </div>
        )}
        <BuyProDucts HandleSendOTP={HandleSendOTP} BuyItem={BuyItem} />
      </div>
    </section>
  );
}

export default CheckOut;
