import React from 'react'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
    <Menu/>
    <Outlet/>
    </>
  )
}

export default RootLayout