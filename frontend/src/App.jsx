import Home from "./Modules/Home/Home"
import Product from "./Modules/Product/Product"
import Footer from "./assets/Components/Footer/Footer"
import Header from "./assets/Components/Header/Header"
import { Routes, Route } from 'react-router-dom'
import Products from "./Modules/ProductSec/ProductSec"
import CategoryProducts from "./Modules/CategoryProducts/CategoryProducts"
import Cart from "../src/Cart/Cart"
import About from "./assets/Components/About/About"
import Checkout from "./assets/Components/Checkout/Checkout"
import LoginPage from "./authentication/login"
import SignupPage from "./authentication/signup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  

  return (
    <>
    <ToastContainer />

    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/products" element={<Products />} />
      <Route path="/categories/:name" element={<CategoryProducts />} />
      <Route path="cart" element={<Cart />} />
      <Route path='/about' element={<About />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
