import { Mail } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '../api/axiosInstance'
const ForgotPassword = () => {
  const [email,setEmail]=useState('');
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/forgot-password",{email});
        toast.success("Reset password link sent to your email!");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || error?.response?.message || "Email wrong!");
    }
  }
  return (
    <>
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-md text-center">
        <h1 className='text-2xl font-semibold pb-5'>Forgot Password</h1>
        <form className='space-y-6'
         onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 border p-3 rounded">
            <Mail size={20} className='text-gray-600' />
            <input type="email" placeholder='Email' className='w-full outline-none' 
            value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <button className='bg- bg-green-600 text-white p-2.5 w-full
           rounded shadow cursor-pointer hover:bg-green-700 transition duration-300'>Forgot Password</button>
           <p></p>
        </form>
      </div>
    </div>
    </>
  )
}

export default ForgotPassword