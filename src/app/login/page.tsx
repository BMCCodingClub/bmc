"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function loginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtpmDisabled] = React.useState(false)
    const [loading,setloading] = React.useState(false)

    const onlogIn = async () => {
        try {
            setloading(true);
            const response = await axios.post("/api/users/login" , user)
            console.log(response) 
            router.push("/profile")
        } catch (error:any) {
            console.log("login failed",error.message)

            
        }finally{
            setloading(false)
        }
    };
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtpmDisabled(false);
        }else{
            setButtpmDisabled(true)
        }
    })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">{loading?"processing":"login"}</h1>
                <hr className="mb-6" />

              

                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-black">Email</label>
                <input
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 text-black"
                />

                <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-black">Password</label>
                <input
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                    className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 text-black"
                />

                <button
                    onClick={onlogIn}
                    className="w-full py-2 mb-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    loginHere
                </button>

                <div className="text-center">
                    <a href="/signup" className="text-indigo-500 hover:text-indigo-700">visit signup page</a>
                </div>
            </div>
        </div>
    );
}
