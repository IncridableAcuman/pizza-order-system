import { Lock, Mail, User } from 'lucide-react'
const Register = () => {
  const mailData=[
    {icon:<User size={20}/>,holder:"Username",type:"text"},
    {icon:<Mail size={20}/>,holder:"Email",type:"email"},
    {icon:<Lock size={20}/>,holder:"Password",type:"password"},
  ]
  return (
    <>
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center  gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <div className="w-full">
          <h1 className='text-2xl font-semibold pb-8'>Get Started Now</h1>
          <form className='space-y-4'>
            {
              mailData.map((item,index)=>(
              <div className="flex items-center gap-3 border border-gray-600 p-3 rounded" key={index}>
              {item.icon}
              <input type={item.type} placeholder={item.holder} className='outline-none w-full' />
            </div>
              ))
            }
            <p className='cursor-pointer text-sm hover:text-green-900'>Forgot Password</p>
            <button className='bg-green-600 text-white w-full mx-auto p-2.5
             rounded shadow cursor-pointer  hover:bg-green-800 transition duration-300'>Sign Up Now</button>           
          </form>
          <p className='text-center pt-4'>or</p>
          <div className="">
            <a href="#" className=''>Google</a>
            <a href="#">Github</a>
          </div>
        </div>
        <div className="">
          <img src="./hero-pizza.png" alt="hero" className='w-[800px]' />
        </div>
      </div>
      </div>
    </div>
    
    </>
  )
}

export default Register
