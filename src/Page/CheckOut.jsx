import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuyProDucts from '../Componat/BuyProDucts';
import UserContact from '../Componat/UserContact';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { removeAllcartPro } from '../Componat/slice/AllSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckOut = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userUid = useSelector((state) => state.counter.user);
  const BuyItem = useSelector((state) => state.counter.BuyItem);
  const cartItem = useSelector((state) => state.counter.cartItem);

  const [userDelivery, setUserDelivery] = useState({});
  const [sendOTP, setSendOTP] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ids, setids] = useState(1);

  useEffect(() => {
    const starCountRef = ref(db, `users/${userUid}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()?.Delivery_address;
      if (data) {
        setUserDelivery(data);
        setPhoneNumber(data.Phone_Number);
      }
    });
  }, [db, userUid]);
  
  useEffect(()=>{

  },[db])
  
  const HandleSendOTP = async () => {
    const phoneRegex = /^(?:\+8801|8801|01)\d{9}$/;

    let valid = true;
    
    if (!phoneRegex.test(userDelivery.Phone_Number)) {
      valid = false;
      console.log("Invalid phone number");
    }
    if ( userDelivery.Division === "") {
      valid = false;
      console.log("Division is required");
    }
    if ( userDelivery.City === "") {
      valid = false;
      console.log("City is required");
    }
    if ( userDelivery.local_address === "") {
      valid = false;
      console.log("Local address is required");
    }
    if ( userDelivery.username === "") {
      valid = false;
      console.log("Username is required");
    }
    const orderId = ref(db , `orders/${userUid}`)
    onValue(orderId , (snapshot) => {
      const orders = snapshot.val()
      if (orders !== null) {
        const id = snapshot.val().length
        console.log(id);
        setids(id)
      } else{
        setids(1)
      }
      
    } )
    if (!valid) return;

    try {
      // await axios.post('https://serverrupkotha.onrender.com/send-otp', { to: userDelivery.Phone_Number });
      setSendOTP(true);
      console.log("OTP sent successfully");
   
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOTP = () => {
    placeOrder();
  };

  const placeOrder = async () => {
 
    try {
      const orderRef = ref(db, `orders/${userUid}/${ids}`);
      await set(orderRef, {
        orderId: Date.now(),
        customer: userDelivery,
        orderItem: { BuyItem, orderStatus: "Placed" },
      })
        .then(() => {
          dispatch(removeAllcartPro(cartItem));
          console.log("Order placed successfully.");
          setTimeout(() => {
            navigate("/orders");
          }, 200);
        });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  console.log(ids);
  
  return (
    <section>
      <div className="container px-[10px] my-[30px] mx-auto flex flex-wrap">
        <UserContact userDelivery={userDelivery} />
        {sendOTP && (
          <div className="p-[30px] rounded OTPInput fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] bg-[#fff]">
            <h2 className="flex justify-center mb-[20px] text-[18px] font-[600]">Please check your message box</h2>
            <h2 className="flex justify-center my-[20px] text-[18px] text-[green] font-[600]">
              {phoneNumber.replace(/\d(?=\d{4})/g, '*')}
            </h2>
            <div className="flex justify-center items-center">
              <input
                type="text"
                className="w-[100%] h-[40px] outline-none px-[5px] border-[2px] border-[#00000097] rounded"
                placeholder="Enter OTP"
                onChange={(e) => setOtpInput(e.target.value)}
              />
            </div>
            <h2
              onClick={handleVerifyOTP}
              className="flex justify-center items-center mt-[10px] rounded w-[80px] h-[30px] bg-[#000] text-[#fff] text-[15px] font-[600] cursor-pointer"
            >
              Verify
            </h2>
          </div>
        )}
        <div id="recaptcha-container"></div>
        <BuyProDucts HandleSendOTP={HandleSendOTP} BuyItem={BuyItem} />
      </div>
    </section>
  );
};

export default CheckOut;
