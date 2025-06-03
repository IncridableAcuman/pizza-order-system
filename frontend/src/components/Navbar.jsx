import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate=useNavigate();
  return (
    <>
    <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
        <img src="./logo.png" alt="logo" />
      <div className="flex items-center gap-5">
        <button className='bg-green-700 text-white px-5 py-2.5 rounded-2xl shadow cursor-pointer
         text-sm' onClick={()=>navigate("/register")}>Sign Up</button>
        <button className="bg-green-700 text-white px-5 py-2.5 rounded-2xl shadow cursor-pointer
         text-sm" onClick={()=>navigate("/login")}>Sign In</button>
      </div>
    </div>
    </>
  )
}

export default Navbar