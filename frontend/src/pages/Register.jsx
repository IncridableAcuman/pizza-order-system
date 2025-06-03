import { Lock, Mail, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate=useNavigate();
  const mailData=[
    {icon:<User size={20}/>,holder:"Username",type:"text"},
    {icon:<Mail size={20}/>,holder:"Email",type:"email"},
    {icon:<Lock size={20}/>,holder:"Password",type:"password"},
  ]
  const oauthData=[
    {name:"Google",icon:"https://www.google.com/favicon.ico"},
    {name:"Github",icon:"https://www.github.com/favicon.ico"},
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
          {
            oauthData.map((item,index)=>(
              <div className="pb-2" key={index}>
            <button className='flex items-center gap-3 bg-white w-full justify-center p-2.5
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
