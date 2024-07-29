'use client'
import Link from "next/link";
import styles from "../signup/Username.module.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log("🚀 ~ onSubmit ~ user:", response.data);
            if (response.data.success) {
                router.push('/profile');
            } else {
                toast.error(response.data.error);
            }
        } catch (error: any) {
            console.log("Login failed");
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <input
                            className={styles.textbox}
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <button className={styles.btn} type="submit" onClick={onSubmit} disabled={buttonDisabled}>
                            Log In
                        </button>
                        <Link href='/signup'>Visit Sign Up Page</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
