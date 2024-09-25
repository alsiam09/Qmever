import React, { useEffect } from 'react'
import AllProductsHome from '../Componat/AllProductsHome'
import Banner from '../Componat/Banner'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
    <Banner/>
    <AllProductsHome/>
    </>
  )
}

export default Home