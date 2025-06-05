import axios from 'axios'
import { toast } from 'react-toastify';

const axiosInstance=axios.create({
    baseURL:"http://localhost:8080/api",
    withCredentials:true
});

axiosInstance.interceptors.request.use(
    config=>{
        const token=localStorage.getItem("accessToken");
        if(token){
            config.headers['Authorization']=`Bearer ${token}`;
        }
    }
);

axiosInstance.interceptors.response.use(
    config=>config,
    async error=>{
        const originalRequest=error.config;
        try {
            const {data}=await axiosInstance.get("/auth/refresh");
            localStorage.setItem("accessToken",data?.accessToken);
        } catch (error) {
            console.log(error);
            toast.error(error?.message || error?.response?.message || "Something went wrong!");
            window.location.href="/login";
            localStorage.removeItem("accessToken");
        }
    }
);


export default axiosInstance;