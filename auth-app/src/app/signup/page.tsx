"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./Username.module.css";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

const SignUp = () =>{
    const router = useRouter()
    const [user, setUser] = useState({
        email:"",
        password:"",
        username:"",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    console.log("🚀 ~ SignUp ~ buttonDisabled:", buttonDisabled)
    const [loading, setLoading] = useState(false)
    const onSumbit = async () =>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            toast.success("Signup success")
            console.log("🚀 ~ onSumbit ~ response:", response.data)
            router.push('/login')
        } catch (error:any) {
            console.log("Signup failed")
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    },[user])
    return(
        <>
        <div className="container mx-auto">
            <Toaster position="top-right" reverseOrder={false} />
                <div className="flex justify-center items-center h-screen">
                    <div className={styles.glass}>
                        <div className="title flex flex-col items-center">
                            <h4 className="text-3xl font-bold">Hello Again!</h4>
                            <span className="py-4 text-xl text-center text-gray-500">
                                Explore More by connecting with us.
                            </span>
                        </div>
                            <div className="textbox flex flex-col items-center gap-6">
                                <input
                                    className={styles.textbox}
                                    type="text"
                                    placeholder="Username"
                                    value={user.username}
                                    onChange={(e) => setUser({...user, username: e.target.value})}
                                    />
                                    <input
                                    className={styles.textbox}
                                    type="text"
                                    placeholder="Email"
                                    value={user.email}
                                    onChange={(e) => setUser({...user, email: e.target.value})}
                                    />
                                    <input
                                    className={styles.textbox}
                                    type="password"
                                    placeholder="Password"
                                    value={user.password}
                                    onChange={(e) => setUser({...user, password: e.target.value})}
                                    />
                                <button className={styles.btn} type="submit" onClick={onSumbit} disabled={buttonDisabled ? true : false}>
                                    Sign UP
                                </button>
                                <Link href='/login'>Visit login Page</Link>
                            </div>
                    </div>
                </div>
            </div>
            </>
    )
}
export default SignUp;
