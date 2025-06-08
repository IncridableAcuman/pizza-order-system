import { Lock, Mail, User } from 'lucide-react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
const Register = () => {
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
  const navigate=useNavigate();
  const oauthData=[
    {name:"Google",icon:"https://www.google.com/favicon.ico"},
    {name:"Github",icon:"https://www.github.com/favicon.ico"},
  ]
      const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      const {data}=await axiosInstance.post("/auth/register",{username,email,password});
      if(data){
        localStorage.setItem("accessToken",data?.accessToken);
        navigate("/");
        toast.success(data?.message || "Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || error?.response?.message || "Something wen wrong!");
      localStorage.removeItem("accessToken");
    }
  }
  return (
    <>
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center  gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <div className="w-full">
          <h1 className='text-2xl font-semibold pb-8'>Get Started Now</h1>
          <form className='space-y-4'
           onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 border border-gray-600 p-3 rounded">
              <User size={20} className='text-gray-600' />
              <input type="text" placeholder="Username" className='outline-none w-full' 
              value={username} onChange={(e)=>setUsername(e.target.value)} />
            </div>
             <div className="flex items-center gap-3 border border-gray-600 p-3 rounded" >
              <Mail size={20} className='text-gray-600' />
              <input type="email" placeholder="Email" className='outline-none w-full' 
              value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
             <div className="flex items-center gap-3 border border-gray-600 p-3 rounded">
              <Lock size={20} className='text-gray-600' />
              <input type="password" placeholder="Password" className='outline-none w-full' 
              value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <p className='cursor-pointer text-sm hover:text-green-900'
             onClick={()=>navigate("/forgot-password")}>Forgot Password</p>
            <button className='bg-green-600 text-white w-full mx-auto p-2.5
             rounded shadow cursor-pointer  hover:bg-green-800 transition duration-300'>Sign Up Now</button>           
          </form>
          <p className='text-center pt-4'>or</p>
          {
            oauthData.map((item,index)=>(
              <div className="pb-2" key={index}>
            <button className='flex items-center gap-3 bg-gray-100 w-full justify-center p-2.5
             cursor-pointer rounded shadow hover:bg-slate-50 transition duration-300'>
              <img src={item.icon} alt={item.name} />
              {item.name}
            </button>
          </div>
            ))
          }
          <p className="text-sm">Already have an account? 
            <span className="cursor-pointer hover:text-green-700" onClick={()=>navigate("/login")}>{" "}Sign In</span></p>    
        </div>
        <div className="w-full">
          <img src="./pizza.png" alt="hero" className=' hidden md:block' />
        </div>
      </div>
      </div>
    </div>
    
    </>
  )
}

export default Register
