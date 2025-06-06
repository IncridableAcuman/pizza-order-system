import { ShoppingCart, UserCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const MainNavbar = () => {
    const data=[
        {name:"Menu",path:"/menu"},
        {name:"Offers",path:"/offers"},
        {name:"My Orders",path:"/orders"},
    ]
    const navigate=useNavigate();
  return (
    <div className='fixed top-0 left-0 w-full flex items-center justify-between py-4 px-8 bg-gray-50 border-b'>
        <img src="./logo.png" alt="logo"
         className='cursor-pointer' onClick={()=>navigate("/")} />
        
        <div className="flex items-center gap-3">
            {
                data.map((item,index)=>(
                    <a href={item.path} key={index}
                     className='hover:text-green-800 transition duration-300'>{item.name}</a>
                ))
            }
            <div className="flex items-center gap-3">
                <div className="flex items-center bg-green-600 text-white px-1 rounded">
                    <p>0</p>
                    <ShoppingCart size={20} className='cursor-pointer'/>
                </div>
                <UserCircle/>
            </div>
        </div>
    </div>
  )
}

export default MainNavbar