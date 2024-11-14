import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaBars } from "react-icons/fa";

import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut , signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout, userUidLogin } from './slice/AllSlice';
import { IoIosArrowDropdownCircle } from "react-icons/io";

import { IoSearchOutline , IoCloseOutline  } from "react-icons/io5";
import { apiData } from './ContextApi';

const Menu = () => {
  let userLoginUid = useSelector((item)=>item.counter.user)
  let ItemApiData = useContext(apiData)
  console.log(userLoginUid);
  
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
  let [ Year , setYear ] = useState([])
  let [ useruid , setUseruid ] = useState('')
  let [ SEXSelet , setSEXSelet ] = useState(false)
  let [ DaySelet , setDaySelet ] = useState(false)
  let [ MounthSelet , setMounthSelet ] = useState(false)
  let [ YearSelet , setYearSelet ] = useState(false)
  let [ userSEXdata , setuserSEXdata ] = useState({})
  let [ userDaydata , setuserDaydata ] = useState({})
  let [ userMounthdata , setuserMounthdata ] = useState({})
  let [ userYeardata , setuserYeardata ] = useState('')
  let [ mounth_id_CODE , setmounth_id_CODE ] = useState('')
  let [ Login_Boxclose , setLogin_Boxclose ] = useState(true)
  
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
  useEffect(() => {
    const yearArray = [];
    for (let i = 2024 ; i > 1900; i--) {
      yearArray.push(i); // Push the year directly
    }
    setYear(yearArray); // Set the state
  }, []); // Empty dependency array, so this runs only once after the component mounts

  console.log(Year); 
  
  let handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        if (user !== null) {
          set(ref(db, 'users/' + user.uid), {
            username: user.displayName,
            email: user.email,
            profile_picture: user.photoURL,
            uid: user.uid,
            gender: `${userData.gender !== "" ? userData.gender : ""}`,
            dateOfBirth :`${userData.dateOfBirth !== "" ? userData.dateOfBirth : ""}`,
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
        navigate('/')
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

  },[useruid])
  useEffect(()=>{
    userLoginUid.map((useruid)=>{
      return onValue(ref(db, '/users/' + useruid), (snapshot) => {
        const userDetails = snapshot.val()
        setUserdata(userDetails);
      }, {
        onlyOnce: true
      })

    })

  },[userLoginUid , useruid])
  useEffect(()=>{
    const starCountRef = ref(db, 'users/' + userLoginUid);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val().Delivery_address;
        setuserDelivery(data)        
      });
  },[db])
  const [search, setSearch] = useState("");


  const handleSearch = (e) => {
      setSearch(e.target.value); 
      
  };
  const GoSearchEnter = (e) => {
    if (e.key === "Enter") {
    navigate(`/search_query?query=${encodeURIComponent(search)}`)
    }
  }
  let GoSearchPage = () => {
    navigate(`/search_query?query=${encodeURIComponent(search)}`)
  }
  let valueDelet = () => {
    setSearch("")
  }
  let sex = [
    {"Gender":"Male" , "Main_category": "man" },
    {"Gender":"Female" , "Main_category": "woman" },
    {"Gender":"Transgender" , "Main_category": "transgender" },
  ]

  let Day = [
    {"day":"01" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"02" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"03" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"04" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"05" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"06" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"07" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"08" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"09" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"10" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"11" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"12" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"13" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"14" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"15" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"16" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"17" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"18" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"19" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"20" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"21" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"22" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"23" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"24" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"25" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"26" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"27" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"28" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"29" , "mounth_id":"0" , "January":"January" , "February":"February" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"30" , "mounth_id":"0" , "January":"January" , "March":"March" , "April":"April" , "May":"May" , "June":"June" , "July":"July" , "August":"August" , "September":"September" , "October":"October" , "November":"November" , "December":"December"},
    {"day":"31" , "mounth_id":"0" , "January":"January" , "March":"March" , "May":"May" , "July":"July" , "August":"August" , "October":"October" , "December":"December"},
  ]

  console.log(Day);
  

  let Mounth = [
    {"mounth":"January" , "mounth_id":"0" , "mounth_level":"01" },
    {"mounth":"February" , "mounth_id":"1" , "mounth_level":"02" },
    {"mounth":"March" , "mounth_id":"2" , "mounth_level":"03" },
    {"mounth":"April" , "mounth_id":"3" , "mounth_level":"04" },
    {"mounth":"May" , "mounth_id":"4" , "mounth_level":"05" },
    {"mounth":"June" , "mounth_id":"5" , "mounth_level":"06" },
    {"mounth":"July" , "mounth_id":"6" , "mounth_level":"07" },
    {"mounth":"August" , "mounth_id":"7" , "mounth_level":"08" },
    {"mounth":"September" , "mounth_id":"8" , "mounth_level":"09"},
    {"mounth":"October" , "mounth_id":"9" , "mounth_level":"10" },
    {"mounth":"November" , "mounth_id":"10" , "mounth_level":"11" },
    {"mounth":"December" , "mounth_id":"11" , "mounth_level":"12" },

  ]

  let handleSelectSEX = () => {
    if (SEXSelet !== true) {
      setSEXSelet(true)
    }else{
      setSEXSelet(false)
    }
  }

  let handleSEX = (item) => {
    setSEXSelet(false)
    setuserSEXdata(item)
  }
  
  let HandleSelectDay = () => {
    
  }
  let handleDay = (item) => {
    setuserDaydata(item)
    setDaySelet(false)
    setmounth_id_CODE(item)
    
  }
  let HandleSelectMounth = () => {
    
  }
  let handleMounth = (item) => {
    setuserMounthdata(item)
    setMounthSelet(false)
    setDaySelet(true)
  }
  console.log();

  let HandleSelectYear = () => {
    if (YearSelet !== true) {
      setYearSelet(true)
    }else{
      setYearSelet(false)
    }
  }
  let handleYear = (item) => {
    setuserYeardata(item)
    setMounthSelet(true)
    setYearSelet(false)
  }
  console.log(userMounthdata.sd);
  
  let handleupData = () => {

    set(ref(db, 'users/' + `${useruid}/`), {
      username: userData.username,
      email: userData.email,
      profile_picture: userData.profile_picture,
      uid: userData.uid,
      gender: userSEXdata.Gender  ,
      dateOfBirth :`${userDaydata.day}/${userMounthdata.mounth}/${userYeardata}`,
      Delivery_address:{
        username: userData.username,
        email: userData.email,
        Phone_Number : `${userDelivery.Phone_Number !== "" ? userDelivery.Phone_Number :""}`,
        Division : `${userDelivery.Division !== "" ? userDelivery.Division :""}`,
        District : `${userDelivery.District !== "" ? userDelivery.District :""}`,
        unions : `${userDelivery.unions !== "" ? userDelivery.unions :""}`,
        upazila : `${userDelivery.upazila !== "" ? userDelivery.upazila :""}`,
        local_address : `${userDelivery.local_address !== "" ? userDelivery.local_address :""}`,
      }
    }).then(()=>{
      window.location.reload()
    })
}
  console.log(userSEXdata);
  return (
    <section>
      <section className='w-[100%] h-[100px] sm:h-[120px] '>
        {
          userData.gender === "undefined" || userData.dateOfBirth === "undefined" ?
          <div className=" fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-[#0000007e] flex justify-center items-center w-[100%] h-[100%] z-[999]">
              <div className=" relative rounded w-[60%] h-[50%] p-[20px] flex flex-wrap bg-[#fff] ">
                <div className=" w-[70%] bg-[#062919] p-[20px] rounded-[10px] ">
                  <img className=' mb-[30px] w-[170px] mx-auto h-[170px] rounded-[50%]' src={userData.profile_picture} alt="" />
                  <h5 className='text-[#cf0cbf] text-[20px] my-[20px]' ><span className='text-[#f7f5f5] mr-[7px]' >Name :</span>{userData.username}</h5>
                  <h5 className='text-[#cf0cbf] flex text-center text-[20px] my-[20px]' ><span className='text-[#f7f5f5] flex mr-[7px]' >Gmail :</span>{userData.email}</h5>
                </div>
                <div className="w-[30%]  pl-[20px]">
                  <div className="relative">
                  <h5 onClick={handleSelectSEX} className={` ${SEXSelet !== false ? "!bg-[#062919] text-[#fffdf8]" : "" } bg-[#fffdf8] px-[20px] hover:text-[#fffdf8] flex justify-between text-[20px] items-center hover:bg-[#062919] py-[5px] rounded text-[#062919] `}>Sex {userSEXdata.Gender ? userSEXdata.Gender : "select"} <span className='text-[23px]'><IoIosArrowDropdownCircle/></span> </h5>
                  {
                    SEXSelet !== false
                    ?
                    <div className=" z-[901] absolute mt-[5px] left-[50%] translate-x-[-50%] bg-[#fff] w-[100%] ">
                      {sex.map((item)=>(
                        <h5 onClick={()=>handleSEX(item)} className='w-[100%] px-[20px] h-[30px] items-center my-[1px] bg-[#f3f3f3] flex justify-end text-[16px]' >{item.Gender}</h5>
                      ))}
                      </div>
                    :""
                  }
                  </div>
                  <div className="dateOfBirth relative mt-[7px] flex gap-1 justify-between">
                 
                  <h5 onClick={HandleSelectYear} className=" bg-[#062919] w-[32%] px-[14px] text-[17px] flex justify-center py-[2px] rounded text-[#fffdf8] ">{userYeardata > 0 ? userYeardata : "Year"}</h5>
                  {
                    YearSelet !== false
                    ?
                    <div className=" absolute z-[900] h-[300px] overflow-scroll bg-[#fff]">
                    {Year.map((item)=>(
                      <h5 onClick={()=>handleYear(item)} className={` text-[#000] bg-[#f3f3f3] my-[1px] p-[6px] text-[16px]`} >{item}</h5>
                    ))}
                  </div>
                    :""
                  }
                  <h5 onClick={HandleSelectMounth} className=" bg-[#062919] w-[32%] px-[14px] text-[17px] flex justify-center py-[2px] rounded text-[#fffdf8] ">{userMounthdata.mounth ? userMounthdata.mounth_level : "Mounth"}</h5>
                  {
                    MounthSelet !== false
                    ?
                    <div className=" absolute z-[900] h-[300px] overflow-scroll bg-[#fff]">
                    {Mounth.map((item)=>(
                      <h5 onClick={()=>handleMounth(item)} className={` text-[#000] bg-[#f3f3f3] my-[1px] p-[6px] text-[16px]`} >{item.mounth}</h5>
                    ))}
                  </div>
                    :""
                  }
                  <h5 onClick={HandleSelectDay} className=" bg-[#062919] w-[32%] px-[14px] text-[17px] flex justify-center py-[2px] rounded text-[#fffdf8] ">{userDaydata.day ? userDaydata.day : "Day"}</h5>
                  {
                    DaySelet !== false
                    ?
                  <div className=" absolute z-[900] h-[300px] overflow-scroll bg-[#fff]">
                    {Day.map((item)=>(
                    <h5 onClick={()=>handleDay(item)} className={` ${item[userMounthdata.mounth] !== userMounthdata.mounth ? "hidden" : "block"} text-[#000] bg-[#f3f3f3] my-[1px] p-[6px] text-[16px]`} >{item.day}</h5>
                  ))}
                  </div>
                :""
              }
                </div>
                
                <div className="absolute bottom-[20px] right-[20px]">
                  <h5 onClick={handleupData} className='px-[20px] py-[3px] bg-[#062919] text-[17px] cursor-pointer flex justify-center rounded text-[#fffdf8]'>Done</h5>
                </div>
              </div>
            </div>
            </div>
            : ""
        }
        <div className=' z-[999] px-[10px] bg-[#062919] fixed top-0 left-[50%] translate-x-[-50%] w-[100%] '>
          <div className=" relative container mx-auto h-[60px] sm:h-[70px] md:h-[80px]">
            <div className="webLogo cursor-pointer w-[100%] flex justify-center items-center h-[60px] sm:h-[70px] md:h-[80px] lg:justify-start">
            <h1 className='text-[#fff] uppercase text-[30px] font-[700]'>rupkotha</h1>
            </div>
            <div className="Search my-[10px] lg:my-[0px] w-[100%] lg:w-[50%] h-[40px] justify-center flex lg:top-[50%] relative lg:translate-y-[-50%] lg:left-[50%] lg:translate-x-[-50%] lg:absolute">
              <input value={search} onKeyDown={GoSearchEnter} onChange={handleSearch} type="text" className='w-[100%] px-[20px] outline-none rounded-l-[5px] h-[40px]  text-[#000000a9] ' placeholder='Search Rupkotha' />
              <h5 onClick={valueDelet} className={` ${search !== "" ? "block" : "hidden"} h-[40px] w-[40px] top-0 right-[15%] lg:right-[10%] absolute z-[999] rounded-[50%] flex justify-center items-center text-[19px] bg-[#f0f0f0] text-[#000] font-[600] cursor-pointer`} ><IoCloseOutline/></h5>
              <h5 onClick={GoSearchPage} className='h-[40px] w-[50px] flex justify-center items-center text-[19px] bg-[#f0f0f0] text-[#000] font-[600] cursor-pointer'><IoSearchOutline/></h5>
            </div>
            <div ref={MenuRef} className="MenuBar cursor-pointer absolute top-[50%] right-[0px] translate-y-[-50%]">
              <icon className='text-[38px] text-[#fff]' ><FaBars /></icon>
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
            : <div className=' bg-[#062919] cursor-pointer py-[30px] gap-[10px] items-center font-sans h-[50px] flex text-[22px] px-[20px] rounded-[10px] m-[10px] group font-[700]'>
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