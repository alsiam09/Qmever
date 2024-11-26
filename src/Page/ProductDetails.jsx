import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Slider from "react-slick";
import "../Css/banner.css"
import { IoIosArrowForward, IoIosArrowBack, IoMdClose } from "react-icons/io";
import { AddToCart, BuyItemDelete, userBuyItem } from '../Componat/slice/AllSlice';
import { IoCheckmarkDoneCircle } from "react-icons/io5";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className='sm:block hidden'
      onClick={onClick}
    ><h2 className='flex justify-center items-center rounded-[50%] text-[27px] w-[50px] h-[50px] absolute top-[50%] translate-y-[-50%] z-[990] left-[10px] bg-[#ffffff49] hover:bg-[#fff]'><IoIosArrowBack /></h2></div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className='sm:block hidden'
      onClick={onClick}
    ><h2 className='  flex justify-center items-center rounded-[50%] text-[27px] w-[50px] h-[50px] absolute top-[50%] translate-y-[-50%] z-[990] right-[10px] bg-[#ffffff49] hover:bg-[#fff]'><IoIosArrowForward /></h2></div>
  );
}

const ProductDetails = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let LoginInfo = useSelector((item) => item.counter.user)
  let [userUID, setUserUID] = useState('')
  let [logErr, setLogErr] = useState(false)
  let productId = useParams()
  let [showSlick, setShowSlick] = useState(false)
  let [info, setInfo] = useState([])
  let [info2, setInfo2] = useState([])
  let [info3, setInfo3] = useState([])
  let [modleaddicon, setmodleaddicon] = useState('')
  let [modlePrice, setmodlePrice] = useState('')
  let [ProdectQun, setProdectQun] = useState(1)
  let [Lodingon, setLodingOn] = useState(false)
  let [Loding, setLoding] = useState(false)
  let [modelselect, setModelselect] = useState(false)
  let [addsucess, setaddsucess] = useState(false)
  let productData = () => axios.get(`https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId.id}.json`).then((res) => {
    setInfo(res.data);
    setInfo2(res.data.thumbnail)
    setInfo3(res.data.addModle);
  })
  useEffect(() => {
    productData()
  })

  useEffect(() => {
    LoginInfo.map((item) => {
      setUserUID(item)
    })
  })


  let handleBuyNow = () => {
    if (userUID !== "") {
      if (info3 !== "") {
        if (modleaddicon !== "") {
          dispatch(BuyItemDelete({ ...info, size: modleaddicon, Pricesub: modlePrice, ProdectQun }))
          setLodingOn(true)
          setTimeout(() => {
            setLoding(true)
          }, 30);
          setTimeout(() => {
            dispatch(userBuyItem({ ...info, size: modleaddicon, Pricesub: modlePrice, ProdectQun }))
            window.scrollTo(0,0)
            navigate('/CheckOut')
          }, 1000);
        } else {
          setModelselect(true)
          setTimeout(() => {
            setModelselect(false)
          }, 1000);
        }
      } else {
        dispatch(BuyItemDelete({ ...info, size: modleaddicon, Pricesub: modlePrice, ProdectQun }))
        setTimeout(() => {
          dispatch(userBuyItem({ ...info, ProdectQun }))
          window.scrollTo(0,0)
          navigate('/CheckOut')
        }, 500);
      }
    } else {
      setLogErr(true)
    }
  }
  let handleAddTocart = () => {
    if (userUID !== "") {
      if (info3 !== "") {
        if (modleaddicon !== "") {
          dispatch(AddToCart({ ...info, size: modleaddicon, Pricesub: modlePrice, ProdectQun }))
          setaddsucess(true)
          setTimeout(() => {
            setaddsucess(false)
          }, 1000);
        } else {
          setModelselect(true)
          setTimeout(() => {
            setModelselect(false)
          }, 1000);
        }
      } else {
        dispatch(AddToCart({ ...info, ProdectQun }))
        console.log(info);
        setaddsucess(true)
        setTimeout(() => {
          setaddsucess(false)
        }, 1000);
      }
    } else {
      console.log("errror");
      setLogErr(true)

    }
  }
  let handleErrCodeClose = () => {
    setLogErr(false)
  }

  let handleModel = ({ index, addModle }) => {
    setmodleaddicon(addModle.Model)
    setmodlePrice(addModle.Price)

  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  let handleImgSlick = () => {
    setShowSlick(true)
  }
  let handleSlickClose = () => {
    setShowSlick(false)
  }


  return (
    <section>
      <div className="container mx-auto px-[10px] py-[10px]">
        {
          modelselect === true
            ? <div className="bg-[#d31212] text-[#fff] text-[18px] w-[200px] rounded duration-500 h-[34px] fixed top-[100px] left-[50%] translate-x-[-50%] flex justify-center items-center">{info.ModelName} not select </div>
            : <div className="bg-[#d31212] text-[#fff] text-[18px] w-[200px] rounded duration-500 h-[34px] fixed top-0 left-[50%] translate-x-[-50%] flex justify-center items-center">you can do it</div>
        }
        <div className={`loging fixed ${Lodingon === true ? " block " : "hidden"} border-[4px] border-[#fff] rounded z-[999] duration-100 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[200px] h-[40px] bg-[#fff]`}>
          {
            Loding === true
              ? <div className="bg-[#00ff00] w-[100%] rounded duration-500 h-[34px] absolute top-0 left-0 text-[16px] flex justify-center items-center">Processing...</div>
              : <div className="bg-[#00ff00] w-[1%] rounded h-[34px] duration-500 absolute top-0 left-0"></div>
          }
        </div>


        {
          showSlick === true &&
          <div className="showImg fixed top-[50%] bg-[#000] left-[50%] translate-x-[-50%] translate-y-[-50%]  z-[999] w-[100%] h-[100%] ">
            <icon onClick={handleSlickClose} className=" m-[30px] cursor-pointer justify-end flex p-[10px] text-[#fff] text-[30px]"><IoMdClose /></icon>
            <Slider className='w-[90%] flex items-center md:w-[60%] lg:w-[50%] xl:w-[600px] top-[50%] absolute left-[50%] translate-x-[-50%] translate-y-[-50%] ' {...settings}>
              <div className="imgBox w-[100%]">
                <img className='w-[100%]' src={info.imgurl} alt="" />
              </div>
              <div className="imgBox w-[100%]">
                <img className='w-[100%]' src={info2.productimg} alt="" />
              </div>
              <div className="imgBox w-[100%]">
                <img className='w-[100%]' src={info2.productimg2} alt="" />
              </div>
              <div className="imgBox w-[100%]">
                <img className='w-[100%]' src={info2.productimg3} alt="" />
              </div>
            </Slider>
          </div>
        }
        {
          logErr === true ?
            <div className="logerr fixed top-[50%] left-[50%] duration-150 translate-x-[-50%] translate-y-[-50%] w-[100%] rounded h-[100%] bg-[#0000008a]">
              <div className="mes absolute px-[20px] py-[10px] top-[50%] left-[50%] duration-150 translate-x-[-50%] translate-y-[-50%] w-[60%] rounded h-[60%] bg-[#fff]">
                <icon onClick={handleErrCodeClose} className=" cursor-pointer justify-end flex text-[red] text-[30px]"><IoMdClose /></icon>
                <h2 className='text-[red] text-[20px] font-[600]'>error</h2>
                <p className='pt-[20px] capitalize '>you have not an account</p>
                <h2 className='mt-[30px] text-[green] text-[16px] font-[600]'><u>login now</u></h2>
              </div>
            </div>
            :
            <div className="logerr fixed top-[-100%] duration-150 left-[50%] translate-x-[-50%] w-[100%] rounded h-[100%] bg-[#00000059]"></div>
        }
        <div className="productdetailsBox gap-[20px] flex flex-wrap">
          <div className="imgbox w-[100%] flex gap-[10px] lg:w-[55%]">
            <div onClick={handleImgSlick} className=" cursor-pointer leftImg flex flex-wrap gap-y-[10px] w-[23%]">
              <div className="w-[100%] ">
              <img className='mb-[10px]' src={info2.productimg} alt="" />
              <img className='my-[10px]' src={info2.productimg2} alt="" />
              <img className='my-[10px]' src={info2.productimg3} alt="" />
              </div>
            </div>
            <div onClick={handleImgSlick} className=" cursor-pointer overflow-hidden rightimg w-[77%]">
              <img className=" hover:scale-125 duration-200 cursor-pointer w-[100%] " src={info.imgurl} alt="" />
            </div>
          </div>
          <div className="details w-[100%] lg:w-[43%]">
            <h2 className='text-[#000] font-[600] text-[20px] lg:text-[30px] 2xl:text-[40px] uppercase my-[5px]'>{info.Prodectname}</h2>
            <h2 className='text-[#000] font-[600] text-[20px] my-[5px]'>Price : <span className='text-[#cf0cbf] font-[500]'>{modlePrice !== "" ? modlePrice : info.Price}৳</span></h2>
            <h2 className='text-[#000] noselect font-[600] text-[20px] my-[5px]'>{info.ModelName}</h2>

            {
              info3 !== ""
                ?
                <div className="modles noselect mb-[30px] flex-wrap flex gap-[10px]">
                  {info3.map((addModle, index) => (
                    <h2 onClick={() => handleModel({ index, addModle })} className={` ${modelselect === true && "border-[red]"} flex border-[1px] py-[10px] px-[20px] rounded justify-center items-center cursor-pointer ${modleaddicon === addModle.Model ? "bg-[#000] text-[#fff]" : "border-[#000] text-[#000]"}  font-[600] text-[20px] my-[5px]`}>{addModle.Model}</h2>
                  ))}
                </div>
                : ""
            }
            <div className="BTnCaBy noselect flex gap-[10px] w-[100%]">
              <h2 onClick={handleBuyNow} className='cursor-pointer text-[#fff] bg-[#062919] h-[40px] rounded-[5px] justify-center flex items-center font-[600] w-[50%]'>Buy Now</h2>
              <h2 onClick={handleAddTocart} className='cursor-pointer text-[#fff] bg-[#062919] h-[40px] rounded-[5px] justify-center flex items-center font-[600] w-[50%]'>{addsucess === true ? <h2 className='text-[24px] text-[#188918]'><IoCheckmarkDoneCircle /></h2> : <h2>Add To Cart</h2>} </h2>
            </div>
            <div className="description mt-[50px] border-t-[2px] border-t-[#fff]">
              <p className='text-[#000000a4] text-[16px] font-[400] my-[30px]'>{info.description}</p>
              <iframe className=' w-[100%] sm:h-[315px]' src={info.VideoURL} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails