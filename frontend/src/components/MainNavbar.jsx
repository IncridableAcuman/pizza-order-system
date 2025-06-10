import { LogOutIcon, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
const MainNavbar = () => {
    const data=[
        {name:"Menu",path:"/menu"},
        {name:"Offers",path:"/offers"},
        {name:"My Orders",path:"/orders"},
    ]
    const navigate=useNavigate();

    const handleSubmit=async ()=>{
        try {
           const {data}=await axiosInstance.post("/auth/logout");
           if(data){
            localStorage.removeItem("accessToken");
            toast.success("Logged out");
            navigate("/auth");
           }

        } catch (error) {
            console.log(error);
            toast.error(error?.message || error?.response?.message || "Something wen wrong!");
            localStorage.removeItem("accessToken");
        }
    }

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
                <LogOutIcon className='cursor-pointer' onClick={handleSubmit}/>
            </div>
        </div>
    </div>
  )
}

export default MainNavbar