"use client";
import { AppProviderProps,AppContextType ,User, Application } from "@/type";
import axios from "axios";

import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const AppContext = createContext<AppContextType| undefined >(undefined);


const USER_CACHE_KEY = 'ezhire_user';

const loadCachedUser = (): User | null => {
    try {
        const raw = localStorage.getItem(USER_CACHE_KEY);
        return raw ? (JSON.parse(raw) as User) : null;
    } catch {
        return null;
    }
};

const persistUser = (u: User | null) => {
    try {
        if (u) localStorage.setItem(USER_CACHE_KEY, JSON.stringify(u));
        else localStorage.removeItem(USER_CACHE_KEY);
    } catch { }
};


const AppProvider:React.FC<AppProviderProps> = ({children})=>{
    // Start with null/false so SSR and initial client render match exactly.
    // After mount, we hydrate from localStorage — this is safe and avoids hydration errors.
    const [user, setUserState] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);
    const [btnloading,setBtnLoading] = useState<boolean>(false);

    const setUser: React.Dispatch<React.SetStateAction<User | null>> = (value) => {
        setUserState(prev => {
            const next = typeof value === 'function' ? value(prev) : value;
            persistUser(next);
            return next;
        });
    };

    // Restore from localStorage after mount (client-only, avoids SSR mismatch)
    useEffect(() => {
        const cached = loadCachedUser();
        if (cached) {
            setUserState(cached);
            setIsAuth(true);
        }
    }, []);

    const fetchUser = async()=>{
        setLoading(true);
        try{
            const response = await axios.get(`${user_service}/api/user/profile` ,{withCredentials:true});
            console.log("response is ",response);
            const freshUser = response.data.user as User;
            setUser(freshUser);
            setIsAuth(true);
            return;
    }catch(error){
        console.log("error in fetching user ",error);
        return;
    }finally{
        setLoading(false);
    }
    }
    const updateProfilePic = async(formData:any)=>{
        setLoading(true);
        try{
            const {data} = await axios.patch(`${user_service}/api/user/profile/pic`,formData,{withCredentials:true});
            toast.success(data.message);
            fetchUser();  
        }catch(error:any){
            toast.error(error.response.data.message || "Something went wrong");
        }
        finally{
            setLoading(false);
        }
    }
    const updateResume = async(formData:any)=>{
        setLoading(true);
        try{
            const {data} = await axios.patch(`${user_service}/api/user/resume`,formData,{withCredentials:true});
            toast.success(data.message);
            fetchUser();  
        }catch(error:any){
            toast.error(error.response.data.message || 'something went wrong');
        }
        finally{
            setLoading(false);
        }
    }
    const updateUser = async(name:string,phone_number:string,bio:string)=>{
        setBtnLoading(true);
        try{
            const {data} = await axios.patch(`${user_service}/api/user/profile`,{name,phone_number,bio},{withCredentials:true});
            toast.success(data.message);
            fetchUser();    // it will updata the user states to new updated one 
        }catch(error:any){
            console.log(error);
            toast.error(error.response.data.message || 'something went wrong');
        }
        finally{
            setBtnLoading(false);
        }
    }
    const addSkill = async(skill:string,setSkill:React.Dispatch<React.SetStateAction<string | "">>)=>{
        setBtnLoading(true);
        try{
            const {data} = await axios.patch(`${user_service}/api/user/skills`,{skill},{withCredentials:true});
            toast.success(data.message);
            setSkill("");
            fetchUser();   
        }catch(error:any){
            console.log(error);
            toast.error(error.response.data.message || 'something went wrong');
        }finally{
            setBtnLoading(false);
        }
    }
    const removeSkill = async(skill:string)=>{
        setBtnLoading(true);
        try{
            const {data} = await axios.post(`${user_service}/api/user/skills/remove`,{skill},{withCredentials:true});
            toast.success(data.message);
            fetchUser();
        }catch(error:any){
            toast.error(error.response.message || "something went wrong");
        }finally{
            setBtnLoading(false);
        }
    }
    const logout = async()=>{
        setLoading(true);
        try{
            const {data} = await axios.get(`${auth_service}/api/auth/logout`,{withCredentials:true});
            toast.success(data.message)
        }
        catch(error:any){
            console.log(error);
            toast.error(error.response.data.message || 'something went wrong');
        }
        finally{
            setUser(null);  
            setIsAuth(false);
            setLoading(false);
        }
    }
    const applyJob = async(job_id:number)=>{
        setBtnLoading(true);
        try{
            
            const {data} = await axios.post(`${user_service}/api/user/job`,{job_id},{withCredentials:true});
            toast.success(data.message || "Job applied successfully");
            
        }catch(error:any){
            console.log(error);
            toast.error( error.response?.data?.message ||"Something went wrong");
        }finally{
            setBtnLoading(false);
        }
    }
    const [applications,setApplications] = useState<Application[]>([]);

    const fetchApplications = async()=>{
        try{
            const {data} = await axios.get(`${user_service}/api/user/job`,{withCredentials:true});
            setApplications(data.applications);
        }catch(error:any){
            console.log(error);
        }
    }


    useEffect(()=>{
        //fetchUser();
        //fetchApplications();
    },[])
    return(
        <AppContext.Provider value={{user,setUser,btnloading,isAuth,setIsAuth,loading,setLoading,logout,fetchUser,updateProfilePic,updateResume,updateUser,addSkill,removeSkill,applyJob,applications,fetchApplications}}>
            {children}
            <Toaster/>
        </AppContext.Provider>
    )
}

const UseAppData = ():AppContextType =>{
    const context = useContext(AppContext);
    if (!context){
        throw new Error("useAppData must be used within an AppProvider");
    }
    
    return context;
    
}

export  const utils_service = process.env.NEXT_PUBLIC_BACKEND_URI;
export  const auth_service = process.env.NEXT_PUBLIC_BACKEND_URI;
export  const user_service = process.env.NEXT_PUBLIC_BACKEND_URI;
export  const job_service = process.env.NEXT_PUBLIC_BACKEND_URI
export const payment_service =  process.env.NEXT_PUBLIC_BACKEND_URI;

export {AppContext,AppProvider,UseAppData}