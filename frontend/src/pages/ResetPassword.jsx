import { Lock } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

const ResetPassword = () => {
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
    const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      const {data}=await axiosInstance.put("/auth/reset-password",{password,confirmPassword});
      if(data){
        toast.success(data?.message || "Password reseted successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || error?.response?.message || "Something wen wrong!");
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