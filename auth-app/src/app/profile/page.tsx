'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react";
import toast from "react-hot-toast";

const Profile = () =>{
    const router = useRouter();
    const [data , setData] = useState("")

    const getUserDetails = async  () =>{
        const res = await axios.post("/api/users/profile")
        setData(res.data.data._id)
    }
        const logout = async () =>{
            try {
                await axios.get("/api/users/logout")
                toast.success("logout success")
                router.push('/login')
            } catch (error:any) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    return(
       <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile Page</h1>
        <hr/>
        <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr/>
         <button className="bg-red-500 mt-4 hover:bg-red-700 text-white font-bold pt-2 px-4 rounded" onClick={getUserDetails}>Get Data</button>
        <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold pt-2 px-4 rounded" onClick={logout}>Log out</button>
       </div>
    )
}
export default Profile;
