import React , {Component} from 'react'
import Slider from "react-slick";
import "../Css/banner.css"
import { IoIosArrowForward , IoIosArrowBack} from "react-icons/io";
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
const Banner = () => {
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
  return (
    <section className=' px-[10px] py-[20px]'>
        <div className="container mx-auto">
        <Slider {...settings}>
            <div className="imgBox w-[100%]">
                <img className=' rounded-[20px] w-[100%]' src="https://i.ibb.co.com/SVdpv68/Green-and-Yellow-Simple-Clean-Shoes-Sale-Banner.png" alt="" />
            </div>
            <div className="imgBox w-[100%]">
                <img className=' rounded-[20px] w-[100%]' src="https://i.ibb.co.com/SVdpv68/Green-and-Yellow-Simple-Clean-Shoes-Sale-Banner.png" alt="" />
            </div>
    </Slider>
        </div>
    </section>
  )
}

export default Banner