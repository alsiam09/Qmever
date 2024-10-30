import React, { useEffect, useRef, useState } from 'react'
import { FaBars } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail, MdClose, MdCall } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut , signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout, userUidLogin } from './slice/AllSlice';


const Menu = () => {
  let userLoginUid = useSelector((item)=>item.counter.user)
  let [ userData , setUserdata ] = useState([])
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const auth = getAuth();
  const db = getDatabase();
  let [ userDelivery , setuserDelivery ] = useState({})
  const provider = new GoogleAuthProvider();
  let MenuRef = useRef()
  let SupportRef = useRef()
  let [MenuShow, setMenuShow] = useState(false)
  // let [SupportShow, setSuppoutShow] = useState(false)
  let [ useruid , setUseruid ] = useState('')
  useEffect(()=>{
    userLoginUid.map((item)=>{
      setUseruid(item);
    })
  },[userLoginUid])

  useEffect(() => {

    let HandleCon = (e) => {
      setMenuShow(MenuRef.current.contains(e.target))
      // setSuppoutShow(SupportRef.current.contains(e.target))
    }

    document.addEventListener("click", HandleCon);
    return () => document.removeEventListener("click", HandleCon)

  })
  
  
  let handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        // setDBemail(user.email);
        // Setname(user.displayName);
        // Setimg(user.photoURL);
        // setuserId(user.uid);
        if (user !== null) {
          set(ref(db, 'users/' + user.uid), {
            username: user.displayName,
            email: user.email,
            profile_picture: user.photoURL,
            uid: user.uid,
            Delivery_address:{
              username: user.displayName,
              email: user.email,
              Phone_Number : `${userDelivery.Phone_Number !== "" ? userDelivery.Phone_Number :""}`,
              Division : `${userDelivery.Division !== "" ? userDelivery.Division :""}`,
              District : `${userDelivery.District !== "" ? userDelivery.District :""}`,
              unions : `${userDelivery.unions !== "" ? userDelivery.unions :""}`,
              upazila : `${userDelivery.upazila !== "" ? userDelivery.upazila :""}`,
              local_address : `${userDelivery.local_address !== "" ? userDelivery.local_address :""}`,
            }
          });
          dispatch(userUidLogin(user.uid))
          console.log(user, "done");

        } else {
          console.log("error datadase");

        }
      })
      .then(() => {
        navigate('/Login')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        console.log(errorCode);
        console.log(error);
        
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

  let handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(userLogout(userLoginUid))
      setUseruid('')
      navigate("/")
    }).catch((error) => {
      console.log(error);
      
    });
  }
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
  useEffect(()=>{
    const starCountRef = ref(db, 'users/' + userLoginUid);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val().Delivery_address;
        setuserDelivery(data)        
      });
  },[db])
  return (
    <section>
      <section className='w-[100%] h-[60px] sm:h-[70px] md:h-[80px]'>
        <div className=' z-[999] px-[10px] bg-[#081939] fixed top-0 left-[50%] translate-x-[-50%] w-[100%] '>
          <div className=" relative container mx-auto h-[60px] sm:h-[70px] md:h-[80px]">
            <div className="webLogo cursor-pointer w-[100%] flex justify-center items-center h-[60px] sm:h-[70px] md:h-[80px] lg:justify-start">
            <h1 className='text-[gold] uppercase text-[30px] font-[700]'>rupkotha</h1>
            </div>
            <div ref={MenuRef} className="MenuBar cursor-pointer absolute top-[50%] right-[0px] translate-y-[-50%]">
              <icon className='text-[38px] text-[gold]' ><FaBars /></icon>
            </div>
          </div>
        </div>
      </section>
      {MenuShow === true ?
        <div className="fixed w-[200px] sm:w-[300px] md:w-[400px] 2xl:w-[600px] h-[100%] bg-[#fff] duration-300 right-0 top-0 z-[999]">
        
          <ul className='w-[100%] mt-[60px]'>
          {
              useruid === ""
            ? <li className=' font-sans text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] flex justify-between font-[700]'>Nice to meet you.will you be my friend</li>
            : <div className=' bg-[#081939] cursor-pointer py-[30px] gap-[10px] items-center font-sans h-[50px] flex text-[22px] px-[20px] rounded-[10px] m-[10px] group font-[700]'>
              <img className=' rounded-[50%] w-[45px] border-[3px] border-[gold] h-[45px]' src={userData.profile_picture} alt="" />
              <h2 className=' group-hover:underline text-[15px] text-[gold] font-[600]'>{userData.username}</h2>
            </div>
            }
           
            {
              useruid === ""
              ?  <li onClick={handleLogin} className=' font-sans absolute left-[50%] translate-x-[-50%] bottom-[200px] text-[22px] px-[20px] py-[5px] text-[#fff] bg-[green] rounded-[10px] font-[700]'>Login</li>
              : <div className="">
  <Link to={'/'}><li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Home</li></Link>
            <li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Products</li>
            <li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Notification</li>
            <Link to={'/Orders'}><li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>My Order</li></Link>
            <Link to={'/CartPage'}><li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Cart</li></Link>
                <li onClick={handleLogout} className=' font-sans absolute left-[50%] translate-x-[-50%] bottom-[200px] text-[17px] md:text-[22px] px-[20px] py-[5px] text-[#fff] bg-[red] rounded-[10px] font-[700]'>Logout</li>
              </div>  
            }
          </ul>
        </div>
        :
        <div className="fixed w-[200px] sm:w-[300px] md:w-[400px] 2xl:w-[600px] h-[100%] bg-[#fff] duration-300 right-[-60%] top-0 z-[999]">
        
        <ul className='w-[100%] mt-[60px]'>
        {
            useruid === ""
          ? <li className=' font-sans text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] flex justify-between font-[700]'>Nice to meet you.will you be my friend</li>
          : <div className=' bg-[#081939] cursor-pointer py-[30px] gap-[10px] items-center font-sans h-[50px] flex text-[22px] px-[20px] rounded-[10px] m-[10px] group font-[700]'>
            <img className=' rounded-[50%] w-[45px] border-[3px] border-[gold] h-[45px]' src={userData.profile_picture} alt="" />
            <h2 className=' group-hover:underline text-[15px] text-[gold] font-[600]'>{userData.username}</h2>
          </div>
          }
         
          {
            useruid === ""
            ?  <li onClick={handleLogin} className=' font-sans absolute left-[50%] translate-x-[-50%] bottom-[200px] text-[22px] px-[20px] py-[5px] text-[#fff] bg-[green] rounded-[10px] font-[700]'>Login</li>
            : <div className="">
<Link to={'/'}><li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Home</li></Link>
          <li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Products</li>
          <li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Notification</li>
          <Link to={'/Orders'}><li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>My Order</li></Link>
          <Link to={'/CartPage'}><li className=' font-sans text-[17px] md:text-[22px] px-[20px] py-[5px] rounded-[10px] m-[10px] hover:bg-[#00000013] font-[700]'>Cart</li></Link>
              <li onClick={handleLogout} className=' font-sans absolute left-[50%] translate-x-[-50%] bottom-[200px] text-[17px] md:text-[22px] px-[20px] py-[5px] text-[#fff] bg-[red] rounded-[10px] font-[700]'>Logout</li>
            </div>  
          }
        </ul>
      </div>
      }
      {/* <div ref={SupportRef} className="  support border-[3px] border-[#000] flex justify-center items-center w-[60px] h-[60px] rounded-[50%] bg-[#fff] fixed z-[999] bottom-[20px] right-[20px]">
        <icon className='text-[30px] font-[700] text-[red]'>{SupportShow === true ? <MdClose /> : <BiSupport />}</icon>
      </div>
      {
        SupportShow === true
          ?
          <div className=" duration-300">

            <div ref={SupportRef} className=" support border-[3px] border-[#000] flex justify-center items-center duration-300 w-[60px] h-[60px] rounded-[50%] bg-[#fff] fixed z-[998] bottom-[110px] right-[20px]">
              <a href="https://api.whatsapp.com/send?phone=01813904257">
                <icon className='text-[30px] font-[700] text-[#0bd80b]'><IoLogoWhatsapp /></icon>
              </a>
            </div>
            <div ref={SupportRef} className=" support border-[3px] border-[#000] flex justify-center items-center duration-300 w-[60px] h-[60px] rounded-[50%] bg-[#fff] fixed z-[998] bottom-[20px] right-[110px]">
              <a href="tel:+8801813904257">
                <icon className='text-[30px] font-[700] text-[#000]'><MdCall /></icon>
              </a>
            </div>
            <div ref={SupportRef} className=" support border-[3px] border-[#000] flex justify-center items-center duration-300 w-[60px] h-[60px] rounded-[50%] bg-[#fff] fixed z-[998] bottom-[80px] right-[80px]">
              <a href="mailto:rupkotha.official.bd@gmail.com">
                <icon className='text-[30px] font-[700] text-[#ff9a17]'><MdEmail /></icon>
              </a>
            </div>
          </div>
          :
          <div className="">
            <div ref={SupportRef} className=" support border-[3px] border-[#000] flex justify-center items-center w-[60px] h-[60px] duration-300 rounded-[50%] bg-[#fff] fixed  z-[999] bottom-[20px] right-[20px]">
              <icon className='text-[30px] font-[700] text-[red]'><BiSupport /></icon>
            </div>
            <div ref={SupportRef} className=" support border-[3px] border-[#000] flex justify-center items-center w-[60px] h-[60px] duration-300 rounded-[50%] bg-[#fff] fixed  z-[999] bottom-[20px] right-[20px]">
              <icon className='text-[30px] font-[700] text-[red]'><BiSupport /></icon>
            </div>
            <div ref={SupportRef} className=" support border-[3px] border-[#000] flex justify-center items-center w-[60px] h-[60px] duration-300 rounded-[50%] bg-[#fff] fixed  z-[999] bottom-[20px] right-[20px]">
              <icon className='text-[30px] font-[700] text-[red]'><BiSupport /></icon>
            </div>
          </div>

      } */}
      <div className=" md:hidden z-[990] fixed bottom-0 left-0 w-[100%] h-[50px] bg-[#081939] "></div>
    </section>
  )
}

export default Menu