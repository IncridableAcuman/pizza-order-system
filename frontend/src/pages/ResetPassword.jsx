import { Lock } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const location=useLocation();
  const quary=new URLSearchParams(location.search);
  const token=quary.get("token");
  const navigate=useNavigate();
    const handleSubmit=async (e)=>{
    e.preventDefault();
    if(password!==confirmPassword){
      toast.error("Password must be equal");
      return;
    }
    try {
       await axiosInstance.put("/auth/reset-password",{token,password});
        toast.success("Password reseted successfully!");
        navigate("/login");
      
    } catch (error) {
      console.log(error);
      toast.error("Password must be equal");
    }
  }
  return (
    <>
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-md text-center">
        <h1 className='text-2xl font-semibold pb-5'>Reset Password</h1>
        <form className='space-y-6'
         onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 border p-3 rounded">
            <Lock size={20} className='text-gray-500' />
            <input type="password" placeholder='Password' className='w-full outline-none'
             value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className="flex items-center gap-3 border p-3 rounded">
            <Lock size={20} className='text-gray-500' />
            <input type="password" placeholder='Confirm Password' className='w-full outline-none'
             value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
          </div>
          <button className='bg-green-600 text-white p-2.5 w-full
           rounded shadow cursor-pointer hover:bg-green-700 transition duration-300'>Reset Password</button>
           <p></p>
        </form>
      </div>
    </div>
    </>
  )
}

export default ResetPassword