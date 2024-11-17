import React from 'react'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const RootLayout = () => {
  return (
    <>
    <Menu/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default RootLayout