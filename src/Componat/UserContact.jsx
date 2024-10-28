import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue , set } from "firebase/database";

const UserContact = ({userDelivery}) => {
    const db = getDatabase();
    let userUid = useSelector((item)=>item.counter.user)
    let [ Edit , setEdit ] = useState(false)
    let [ userNameup , setuserNameup ] = useState('')
    let [ userNumber  , setuserNumber  ] = useState('')
    let [ userNumberUp  , setuserNumberup  ] = useState('')
    let [ userCity , setuserCity  ] = useState('')
    let [ userCityup , setuserCityup  ] = useState('')
    let [ userDivision , setuserDivision  ] = useState('')
    let [ userDivisionup , setuserDivisionup  ] = useState('')
    let [ userAddress  , setuserAddress   ] = useState('')
    let [ userAddressup  , setuserAddressup   ] = useState('')
    let [ undefended , setundefended ] = useState('undefended')

    useEffect(()=>{
        setuserNumber(userDelivery.Phone_Number)
        setuserCity(userDelivery.City)
        setuserDivision(userDelivery.Division)
        setuserAddress(userDelivery.local_address)
    },[userDelivery , db])
    let HandleEdit = () => {
        setEdit(true)
    }
    
    let Handleupload = () => {
        set(ref(db, 'users/' + `${userUid}/` + 'Delivery_address/'), {
          username: userNameup === "" ? userDelivery.username : userNameup ,
          Phone_Number: userNumberUp === "" ? userDelivery.Phone_Number : userNumberUp ,
          local_address: userAddressup === "" ? userDelivery.local_address : userAddressup,
          City: userCityup === "" ? userDelivery.City : userCityup,
          email: userDelivery.email,
          Division: userDivisionup === "" ? userDelivery.Division : userDivisionup,
        })
        .then(()=>{
            console.log(userDelivery);
        }).catch(()=>{
            console.log("error");
            
        })
        setEdit(false)
    }
    let HandleName = (e) => {
        setuserNameup(e.target.value)
    }
    let HandleNumber = (e) => {
        setuserNumberup(e.target.value)
    }
    let HandleDivision = (e) => {
        setuserDivisionup(e.target.value)
    }
    let HandleCity = (e) => {
        setuserCityup(e.target.value)
    }
    let HandleAddress = (e) => {
        setuserAddressup(e.target.value)
    }    
  return (
    <div className="contact w-[100%] md:w-[60%]">
            {
            Edit === true
            ? <div className="yourCon w-[100%]">
            <div className="Name justify-between my-[10px]">
                <h2 className='text-[#000] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your Name :</h2>
                <input placeholder={`${userDelivery.username}`} onChange={HandleName} type="text" className='text-[#000] bg-[#fff] px-[10px] w-[100%] h-[50px] outline-none border-b-[2px] border-b-[#ffffff91]'/>
            </div>
            <div className="PhoneNumber justify-between my-[10px]">
                <h2 className='text-[#000] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your Phone Number :</h2>
                <input placeholder={`${userDelivery.Phone_Number}`} onChange={HandleNumber} type="text" className='text-[#000] bg-[#fff] px-[10px] w-[100%] h-[50px] outline-none border-b-[2px] border-b-[#ffffff91]'/>
            </div>
            <div className="Division justify-between my-[10px]">
                <h2 className='text-[#000] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your Division :</h2>
                <input placeholder={`${userDelivery.Division}`} onChange={HandleDivision} type="text" className='text-[#000] bg-[#fff] px-[10px] w-[100%] h-[50px] outline-none border-b-[2px] border-b-[#ffffff91]'/>
            </div>
            <div className="City justify-between my-[10px]">
                <h2 className='text-[#000] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your City :</h2>
                <input placeholder={`${userDelivery.City}`} onChange={HandleCity} type="text" className='text-[#000] bg-[#fff] px-[10px] w-[100%] h-[50px] outline-none border-b-[2px] border-b-[#ffffff91]'/>
            </div>
            <div className="localAddress justify-between my-[10px]">
                <h2 className='text-[#000] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your local Address :</h2>
                <input placeholder={`${userDelivery.local_address}`} onChange={HandleAddress} type="text" className='text-[#000] bg-[#fff] px-[10px] w-[100%] h-[50px] outline-none border-b-[2px] border-b-[#ffffff91]'/>
            </div>
            </div>
            : <div className="yourCon w-[100%]">
            <div className="Name my-[10px]">
                <h2 className='text-[#000] my-[5px] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your Name :</h2>
                <h2 className='text-[#000] my-[5px] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>{userDelivery.username}</h2>
            </div>
            <div className="Name my-[30px]">
                <h2 className='text-[#000] my-[5px] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your email :</h2>
                <h2 className='text-[#000] my-[5px] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>{userDelivery.email}</h2>
            </div>
            <div className="Name my-[30px]">
                <h2 className='text-[#000] my-[5px] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your Phone Number :</h2>
                <h2 className='text-[#000] my-[5px] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>{ userDelivery.Phone_Number !== "" ? userDelivery.Phone_Number : undefended }</h2>
            </div>
            <div className="Name my-[30px]">
                <h2 className='text-[#000] my-[5px] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your Division :</h2>
                <h2 className='text-[#000] my-[5px] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>{ userDelivery.Division !== "" ? userDelivery.Division : undefended }</h2>
            </div>
            <div className="Name my-[30px]">
                <h2 className='text-[#000] my-[5px] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your City :</h2>
                <h2 className='text-[#000] my-[5px] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>{ userDelivery.City !== "" ? userDelivery.City : undefended }</h2>
            </div>
            <div className="Name my-[30px]">
                <h2 className='text-[#000] my-[5px] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your local Address :</h2>
                <h2 className='text-[#000] my-[5px] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>{ userDelivery.local_address !== "" ? userDelivery.local_address : undefended }</h2>
            </div>
            </div>
            }
        <div className="btn w-[100%] my-[20px] flex justify-between">
            {
                Edit === false &&  <h2 onClick={HandleEdit} className='w-[100px] sm:w-[150px] sm:h-[40px] sm:text-[20px] h-[40px] bg-[#139e13] text-[#fff] rounded flex justify-center items-center text-[16px]' >Edit</h2>
            }
            {
                Edit === true &&   <h2 onClick={Handleupload} className='w-[100px] sm:w-[150px] sm:h-[40px] sm:text-[20px] h-[40px] bg-[#139e13] text-[#fff] rounded flex justify-center items-center text-[16px]' >upload</h2>
            }
        </div>
    </div>
  )
}

export default UserContact