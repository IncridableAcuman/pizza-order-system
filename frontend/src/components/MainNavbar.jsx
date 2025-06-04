import { ShoppingCart, UserCircle } from 'lucide-react'
const MainNavbar = () => {
    const data=[
        {name:"Home",path:"#"},
        {name:"My Order",path:"#"},
        {name:"Pizzas",path:"#"},
    ]
  return (
    <div className='fixed top-0 left-0 w-full flex items-center justify-between py-4 px-8 bg-gray-50 border-b'>
        <img src="./logo.png" alt="logo" />
        
        <div className="flex items-center gap-3">
            {
                data.map((item,index)=>(
                    <a href={item.path} key={index}
                     className='hover:text-green-800 transition duration-300'>{item.name}</a>
                ))
            }
            <div className="flex items-center gap-3">
                <ShoppingCart className='text-green-950 cursor-pointer relative'/>
                <UserCircle/>
            </div>
        </div>
    </div>
  )
}

export default MainNavbar