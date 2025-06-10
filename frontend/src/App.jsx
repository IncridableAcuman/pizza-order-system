import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Menu from './pages/Menu'
import MyOrders from './pages/MyOrders'
import Offers from './pages/Offers'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <>
    <ToastContainer position='bottom-right'/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
      <Route path='/menu' element={<Menu/>} />
      <Route path='/orders' element={<MyOrders/>} />
      <Route path='/offers' element={<Offers/>} />
    </Routes>
    </>
  )
}

export default App