import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  let navigate = useNavigate()
  let userLoginUid = useSelector((item)=>item.counter.user)
  const db = getDatabase();
  let [ userData , setUserdata ] = useState([])
  useEffect(()=>{
    userLoginUid.map((useruid)=>{
      return onValue(ref(db, '/users/' + useruid), (snapshot) => {
        const userDetails = snapshot.val()
        setUserdata(userDetails);
      }, {
        onlyOnce: true
      })

    })

  },[userLoginUid])
  console.log(userData);
  
  let Join = () =>{
    navigate('/')
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <section>
      <div className="container mx-auto px-[10px]">
        <div className="user">
          <div className="imgBox flex relative justify-center my-[40px]">
            <img className='w-[200px] rounded-[50%] h-[200px]' src={userData.profile_picture} alt="" />
            <img className=' absolute top-[50px] w-[300px] h-[300px]' src="https://i.ibb.co.com/42kqS9s/Picsart-24-09-13-20-42-41-421.png" alt="" />
          </div>
          <div className="welcome relative text-center ">
            <h1 className='  text-[#fff] text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-[700] font-sans'>Welcome to Rupkotha</h1>
            <h2 className='text-[#fff] text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-[700] font-sans'>Dear {userData.username}</h2>
          </div>
          <h2 onClick={Join} className='px-[20px] py-[7px] absolute bottom-[50px] left-[50%] translate-x-[-50%] bg-[#43af43] text-[18px] text-[#fff] font-[600] rounded-[10px] uppercase ' >Join Now</h2>
        </div>
      </div>
    </section>
  );
};

export default Login;
