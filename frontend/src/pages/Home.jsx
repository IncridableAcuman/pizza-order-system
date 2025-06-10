import React, { useEffect } from 'react'
import MainNavbar from '../components/MainNavbar'
import { PlusCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate();
  const data=[
    {name:"Pizza Italiano",size:"Small",price:80,image:"./pizza.png"},
    {name:"Pizza Americano",size:"Medium",price:100,image:"./pizza.png"},
    {name:"Pizza Italiano",size:"Large",price:120,image:"./pizza.png"},
    {name:"Pizza Americano",size:"Large",price:150,image:"./pizza.png"}
  ]

  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      navigate("/auth");
    }
  },[navigate]);

  return (
    <>
    <MainNavbar/>
    <div className="pt-24">
      <div className="flex flex-col md:flex-row items-center justify-between paddinging">
        <div className="">
          <h2 className='text-3xl lg:text-8xl font-extrabold
         bg-clip-text tracking-tight text-transparent bg-gradient-to-br from-green-600 to-green-900 text-shadow-md'>Are you hungry?</h2>
          <h2 className='text-3xl lg:text-8xl font-extrabold
         bg-clip-text tracking-tight text-transparent bg-gradient-to-br from-green-600 to-green-900 text-shadow-md'>Don't wait!</h2>
         <button className='mt-5 bg-green-600 px-5 py-2 text-white rounded-full
          shadow-md cursor-pointer hover:bg-green-700 transition duration-300'>Order Now</button>
        </div>
        <div className="">
          <img src="./hero-pizza.png" alt="" />
        </div>
      </div>
      {/*  */}
      <div className="pt-5">
        <h1 className='text-3xl font-extrabold text-center pb-5'>It's very Delicus</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4 text-center pb-5">
          {
          data.map((item,index)=>(
            <div className="" key={index}>
             <div className="">
               <img src={item.image} alt={item.name} className='w-40 mx-auto' />
              <h3 className='text-lg font-semibold pb-2'>{item.name}</h3>
                <p className='mb-3'>{item.size}</p>
              <div className="flex items-center justify-center gap-8">
                <p> {item.price}$</p>
                <a href="#" className='flex items-center gap-2
                 border-2 text-green-600 border-green-500 px-3 py-1 rounded-2xl
                  shadow hover:bg-green-600 transition duration-300 hover:text-white'>
                  +
                  <PlusCircle size={20}/>
                </a>        
              </div>
             </div>
            </div>
          ))
        }
        </div>
        
      </div>
      {/*  */}
      <div className="">
        <div className=""></div>
        <div className=""></div>
      </div>
    </div>
    </>
  )
}

export default Home