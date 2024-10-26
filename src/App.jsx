import { createBrowserRouter , createRoutesFromElements , Route , RouterProvider } from "react-router-dom"
import RootLayout from "./Componat/RootLayout"
import Home from "./Page/Home"
import Login from "./Page/Login"
import ProductDetails from "./Page/ProductDetails"
import CheckOut from "./Page/CheckOut"
import Cartpage from "./Page/Cartpage"
import Order from "./Page/Order"
function App() {
  let router = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayout/>}>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/Login" element={<Login/>} ></Route>
      <Route path="/productDetails/:id" element={<ProductDetails/>} ></Route>
      <Route path="/CheckOut" element={<CheckOut/>} ></Route>
      <Route path="/CartPage" element={<Cartpage/>} ></Route>
      <Route path="/Orders" element={<Order/>} ></Route>
    </Route>
  ))
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
