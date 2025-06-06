import React from 'react'
import MainNavbar from '../components/MainNavbar'
import { PlusCircle } from 'lucide-react'

const Home = () => {
  const data=[
    {name:"Pizza Italiano",size:"Small",price:80,image:"./pizza.png"},
    {name:"Pizza Americano",size:"Medium",price:100,image:"./pizza.png"},
    {name:"Pizza Italiano",size:"Large",price:120,image:"./pizza.png"},
    {name:"Pizza Americano",size:"Large",price:150,image:"./pizza.png"}
  ]
  return (
    <>
    <MainNavbar/>
    <div className="pt-24">
      <div className="flex flex-col md:flex-row items-center justify-between paddinging">
        <div className="text-3xl lg:text-8xl font-extrabold
         bg-clip-text tracking-tight text-transparent bg-gradient-to-br from-green-600 to-green-900 text-shadow-md">
          <h2 className=''>Are you hungry?</h2>
          <h2>Don't wait!</h2>
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
              <div className="flex items-center justify-center gap-3">
                <p>{item.size}</p>
                <p> {item.price}$</p>
                <PlusCircle/>
              </div>
             </div>
            </div>
          ))
        }
        </div>
        
      </div>
    </div>
    </>
  )
}

export default Home