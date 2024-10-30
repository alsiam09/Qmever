import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuyProDucts from '../Componat/BuyProDucts';
import UserContact from '../Componat/UserContact';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { removeAllcartPro } from '../Componat/slice/AllSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

const CheckOut = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userUid = useSelector((item) => item.counter.user);
  const BuyItem = useSelector((item) => item.counter.BuyItem);
  const cartItem = useSelector((item) => item.counter.cartItem);
  
  let [userDelivery, setuserDelivery] = useState({});
  const [SendOTP, setSendOTP] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const starCountRef = ref(db, 'users/' + userUid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val().Delivery_address;
      setuserDelivery(data);
      setPhoneNumber(data.Phone_Number); // Save phone number for OTP
    });
  }, [db, userUid]);

  const HandleSendOTP = async () => {
    const phoneRegex = /^(?:\+8801|8801|01)\d{9}$/;
    
    if (!phoneRegex.test(userDelivery.Phone_Number)) {
      console.log("Invalid phone number");
      return;
    }

    try {
      await axios.post('https://serverrupkotha.onrender.com/send-otp', { to: userDelivery.Phone_Number });
      setSendOTP(true);
      console.log("OTP sent successfully");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { to: phoneNumber, otp: otpInput });
      if (response.data.success) {
        console.log("OTP verified successfully");
        // Proceed with placing the order
        placeOrder();
      } else {
        console.log("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const placeOrder = () => {
    try {
      set(ref(db, 'orders/' + `${userUid}/` + 1), {
        orderId: 1,
        customer: userDelivery,
        orderItem: { BuyItem, orderStatus: "Placed" },
      })
      .then(() => {
        dispatch(removeAllcartPro(cartItem));
        console.log("Order placed successfully");
        setTimeout(() => {
          navigate("/orders");
        }, 200);
      });
    } catch (error) {
      console.error("Error placing order:", error);
    }
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
              <input 
                type="text" 
                className='w-[100%] h-[40px] outline-none px-[5px] border-[2px] border-[#00000097] rounded' 
                placeholder='Enter OTP' 
                onChange={(e) => setOtpInput(e.target.value)} 
              />
            </div>
            <h2 onClick={handleVerifyOTP} className='flex justify-center items-center mt-[10px] rounded w-[80px] h-[30px] bg-[#000] text-[#fff] text-[15px] font-[600] cursor-pointer'>Verify</h2>
          </div>
        )}
        <BuyProDucts HandleSendOTP={HandleSendOTP} BuyItem={BuyItem} />
      </div>
    </section>
  );
};

export default CheckOut;
