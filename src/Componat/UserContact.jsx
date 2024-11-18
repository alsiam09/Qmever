import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const UserContact = ({ userDelivery }) => {
    const db = getDatabase();
    const selectDivRef = useRef();
    const selectDisRef = useRef();
    const selectupaRef = useRef();
    const selectuniRef = useRef();
    let userUid = useSelector((item) => item.counter.user)
    let [DivSelect, SetDivSelect] = useState(false)
    let [DisSelect, SetDisSelect] = useState(false)
    let [upaSelect, SetupaSelect] = useState(false)
    let [uniSelect, setuniSelect] = useState(false)
    let [userNameup, setuserNameup] = useState('')
    let [userNumber, setuserNumber] = useState('')
    let [userNumberUp, setuserNumberup] = useState('')
    let [userCity, setuserCity] = useState('')
    let [userCityup, setuserCityup] = useState('')
    let [userDivision, setuserDivision] = useState('')
    let [userDivisionup, setuserDivisionup] = useState('')
    let [userAddress, setuserAddress] = useState('')
    let [userupazilaup, setuserupazilaup] = useState('')
    let [userunionsup, setuserunionsup] = useState('')
    let [userAddressup, setuserAddressup] = useState('')
    let [undefended, setundefended] = useState('undefended')
    let [indexArea, setindexArea] = useState('undefended')
    let [districtid, setdistrictid] = useState('undefended')
    let [upazilsID, setupazilsID] = useState('undefended')
    let [divisions, setdivisions] = useState([])
    let [district, setdistrict] = useState([])
    let [upazila, setupazila] = useState([])
    let [unions, setunions] = useState([])

    useEffect(() => {
        setuserNumber(userDelivery.Phone_Number)
        setuserCity(userDelivery.City)
        setuserDivision(userDelivery.Division)
        setuserAddress(userDelivery.local_address)
    }, [userDelivery, db])


    let Handleupload = () => {
        set(ref(db, 'users/' + `${userUid}/` + 'Delivery_address/'), {
            username: userNameup === "" ? userDelivery.username : userNameup,
            Phone_Number: userNumberUp === "" ? userDelivery.Phone_Number : userNumberUp,
            local_address: userAddressup === "" ? userDelivery.local_address : userAddressup,
            email: userDelivery.email,
            Division: userDivisionup === "" ? userDelivery.Division : userDivisionup,
            District: userCityup === "" ? userDelivery.District : userCityup,
            upazila: userupazilaup === "" ? userDelivery.upazila : userupazilaup,
            unions: userunionsup === "" ? userDelivery.unions : userunionsup,
        })
            .then(() => {
                console.log(userDelivery);
            }).catch(() => {
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
    let HandleDiv = ({ item, index }) => {
        setuserDivisionup(item.name);
        setindexArea(item.id);
    }
    let HandleDis = ({ item, index }) => {
        setuserCityup(item.name)
        setdistrictid(item.id)
    }
    let HandleUpa = ({ item, index }) => {
        setupazilsID(item.id)
        setuserupazilaup(item.name)
    }
    let HandleUni = ({ item, index }) => {
        setuserunionsup(item.name)
    }
    useEffect(() => {
        if (window.location.pathname === "/CheckOut") {
            const starCountRef = ref(db, 'bangladesharea/');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setdivisions(data?.divisions?.map((item) => item))
                setdistrict(data?.district?.map((item) => item))
                setupazila(data?.upazila?.map((item) => item))
                setunions(data?.unions?.map((item) => item))
            });
        }
    }, [window.location.pathname])
    useEffect(() => {

        let HandleSel = (e) => {
            if (DivSelect !== true) {
                SetDivSelect(selectDivRef.current.contains(e.target))
            } else {
                SetDivSelect(false)
            }
            if (DisSelect !== true) {
                SetDisSelect(selectDisRef.current.contains(e.target))
            } else {
                SetDisSelect(false)
            }
            if (upaSelect !== true) {
                SetupaSelect(selectupaRef.current.contains(e.target))
            } else {
                SetupaSelect(false)
            }
            if (uniSelect !== true) {
                setuniSelect(selectuniRef.current.contains(e.target))
            } else {
                setuniSelect(false)
            }
        }
        document.addEventListener("click", HandleSel);
        return () => document.removeEventListener("click", HandleSel);
    })

    return (
        <div className="contact w-[100%] md:w-[60%]">
            <div className="yourCon w-[100%]">
                <div className="Name justify-between my-[10px]">
                    <h2 className='text-[#000] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your Name :</h2>
                    <input placeholder={`${userDelivery.username}`} onChange={HandleName} type="text" className='text-[#000] bg-[#fff] px-[10px] w-[100%] h-[50px] outline-none border-b-[2px] border-b-[#ffffff91]' />
                </div>
                <div className="PhoneNumber justify-between my-[10px]">
                    <h2 className='text-[#000] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your Phone Number :</h2>
                    <input placeholder={`${userDelivery.Phone_Number}`} onChange={HandleNumber} type="text" className='text-[#000] bg-[#fff] px-[10px] w-[100%] h-[50px] outline-none border-b-[2px] border-b-[#ffffff91]' />
                </div>
                <div className="w-[100%] flex flex-wrap justify-between">
                <div className="Division w-[47%] justify-between my-[10px]">
                            <h4 ref={selectDivRef} className=' rounded-[10px] text-[#fff] px-[20px] bg-[#062919] text-[11px] py-[10px] font-[600] md:text-[20px] lg:text-[20px] font-sans flex justify-between items-center '><h5> Select Your Division</h5><h5 className='pt-[3px]'>{DivSelect === true ?<h5 className=''><IoIosArrowUp /></h5>: <h5 className=''><IoIosArrowDown /></h5> }</h5></h4>
                            {DivSelect === true ?
                            divisions.map((item, index) => (
     
                                <h5 onClick={() => HandleDiv({item , index})} className=' px-[20px] py-[20px] my-[3px] bg-[#f4f4f4] w-[100%] h-[30px] flex justify-end items-center text-[11px]  lg:text-[20px]' >{item.name}</h5 >
                            ))
                            :
                            ""
                            }
                            
                            <input value={userDivisionup} placeholder={`${userDelivery.Division}`} onChange={HandleDivision} type="text" className='text-[#000] bg-[#fff] px-[10px] w-[100%] h-[50px] outline-none border-b-[2px] border-b-[#ffffff91]' />
                        </div>
                        <div className="District w-[47%] justify-between my-[10px]">
                        <h4 ref={selectDisRef} className=' rounded-[10px] text-[#fff] px-[20px] bg-[#062919] text-[11px] py-[10px] font-[600] md:text-[20px] lg:text-[20px] font-sans flex justify-between items-center '><h5> Select Your District</h5><h5 className='pt-[3px]'>{DisSelect === true ?<h5 className=''><IoIosArrowUp /></h5>: <h5 className=''><IoIosArrowDown /></h5> }</h5></h4>
                            {DisSelect === true ?
                            district.map((item, index) => (
                                
                                <h5 onClick={() => HandleDis({item , index})} className={` px-[20px] py-[20px] my-[3px] bg-[#f4f4f4] ${item.division_id === indexArea ? "block" : "hidden"} w-[100%] text-[11px]  lg:text-[20px] h-[30px] flex justify-end items-center my-[1px]`} >{item.name}</h5>
                            ))
                            :
                            ""
                            }
                            <input value={userCityup} placeholder={`${userDelivery.District}`} onChange={HandleCity} type="text" className='text-[#000] bg-[#fff] px-[10px] w-[100%] h-[50px] outline-none border-b-[2px] border-b-[#ffffff91]' />
                        </div>
                        <div className="District w-[47%] justify-between my-[10px]">
                        <h4 ref={selectupaRef} className=' rounded-[10px] text-[#fff] px-[20px] bg-[#062919] text-[11px] py-[10px] font-[600] md:text-[20px] lg:text-[20px] font-sans flex justify-between items-center '><h5> Select Your upazila</h5><h5 className='pt-[3px]'>{upaSelect === true ?<h5 className=''><IoIosArrowUp /></h5>: <h5 className=''><IoIosArrowDown /></h5> }</h5></h4>
                            {upaSelect === true ?
                            upazila.map((item , index) => (
                                
                                <h5 onClick={() => HandleUpa({item , index})} className={` px-[20px] py-[20px] my-[3px] bg-[#f4f4f4] ${item.district_id === districtid ? "block" : "hidden"} w-[100% text-[11px] lg:text-[20px]  h-[30px] flex justify-end items-center my-[1px]`} >{item.name}</h5>
                            ))
                            :
                            ""
                            }
                            <input value={userupazilaup} placeholder={`${userDelivery.upazila}`} onChange={HandleCity} type="text" className='text-[#000] bg-[#fff] px-[10px] w-[100%] h-[50px] outline-none border-b-[2px] border-b-[#ffffff91]' />
                        </div>
                        <div className="District w-[47%] justify-between my-[10px]">
                        <h4 ref={selectuniRef} className=' rounded-[10px] text-[#fff] px-[20px] bg-[#062919] text-[11px] py-[10px] font-[600] md:text-[20px] lg:text-[20px] font-sans flex justify-between items-center '><h5> Select Your union</h5><h5 className='pt-[3px]'>{uniSelect === true ?<h5 className=''><IoIosArrowUp /></h5>: <h5 className=''><IoIosArrowDown /></h5> }</h5></h4>
                            {uniSelect === true ?
                            unions.map((item , index) => (
                                
                                <h5 onClick={() => HandleUni({item , index})} className={` px-[20px] py-[20px] my-[3px] bg-[#f4f4f4] ${item.upazilla_id === upazilsID ?"block": "hidden" }  w-[100%] text-[11px]  lg:text-[20px] h-[30px] flex justify-end items-center my-[1px]`} >{item.name} </h5>
                            ))
                            :
                            ""
                            }
                            <input value={userunionsup} placeholder={`${userDelivery.unions}`} onChange={HandleCity} type="text" className='text-[#000] bg-[#fff] px-[10px] w-[100%] h-[50px] outline-none border-b-[2px] border-b-[#ffffff91]' />
                        </div>

                </div>
                <div className="localAddress justify-between my-[10px]">
                    <h2 className='text-[#000] text-[15px] md:text-[20px] lg:text-[26px] font-sans'>Your local Address :</h2>
                    <input placeholder={`${userDelivery.local_address}`} onChange={HandleAddress} type="text" className='text-[#000] bg-[#fff] px-[10px] w-[100%] h-[50px] outline-none border-b-[2px] border-b-[#ffffff91]' />
                </div>
                <div className="my-[20px]">
                    <h4 onClick={Handleupload} className='py-[7px] text-[#fff] text-[15px] md:text-[18px] uppercase md:h-[50px] bg-[#169416] hover:bg-[#081939] rounded flex justify-center items-center'>upload you address</h4>
                </div>
            </div>

            <div className="btn w-[100%] my-[20px] flex justify-between">

            </div>
        </div>
    )
}

export default UserContact