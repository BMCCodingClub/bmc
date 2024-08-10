"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtpmDisabled] = React.useState(false)
const [loading,setloading] = React.useState(false)


    const onSignup = async () => {
try {
    setloading(true)
    const response = await axios.post("/api/users/signup",user)
    console.log("done",response.data)
    router.push("/login")
    
} catch (error:any) {
    console.log("signup"+error)

    
}finally {
    setloading(false);
}

        };

    useEffect(()=>{
    if(user.email.length>0&& user.password.length>0){
        setButtpmDisabled(false)
        
    }else{
        setButtpmDisabled(true)
    }
        },[user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">{loading?"processing":"signup"}</h1>
                <hr className="mb-6" />

                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    type="text"
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                    className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 text-black"
                />

                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 text-black"
                />

                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                    className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 text-black"
                />

                <button
                    onClick={onSignup}
                    className="w-full py-2 mb-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                     {buttonDisabled?"no signup":"signup"}
                </button>

                <div className="text-center">
                    <a href="/login" className="text-indigo-500 hover:text-indigo-700">visit login page</a>
                </div>
            </div>
        </div>
    );
}
