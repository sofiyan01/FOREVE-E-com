import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify';



function Login({setToken}) {


    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false)


    const submitHandler=async(e)=>{
        try {
            e.preventDefault();
            setLoading(true)   
            const response=await axios.post(backendUrl + "/api/user/admin",{email,password})
            
            console.log(response);
            if (response.data.success) {
                setToken(response.data.token)
            }else{
                toast.error(response.data.message)
            }
            setLoading(false)   
            

        } catch (error) {
            console.log("error in Login",error);
            toast.error(error.message)
            
        }
    }


    return (
    <div className="min-h-screen flex items-center justify-center w-full">
        <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md ">
            <h1 className="text-2xl font-bold mb-4" >Admin Panel</h1>
            <form onSubmit={submitHandler} >
                <div className="mb-3 min-w-72" >
                    <p className="text-sm font-medium text-gray-700 mb-2"> Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type='email'  placeholder='Enter email' required />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                    <input  onChange={(e)=>setPassword(e.target.value)} value={password} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type='password'  placeholder='Enter password' required />
                </div>
                <button disabled={loading} className="mt-4 w-full py-2 px-4 rounded-md bg-black text-white" type='submit'>{loading?"Loading..." :"Login"}</button>
            </form>
        </div>
    </div>
  )
}

export default Login