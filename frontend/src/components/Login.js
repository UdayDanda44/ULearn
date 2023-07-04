import React from 'react'
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../App.css"
import { login } from '../actions/authactions';
import {useDispatch} from 'react-redux'

const Login = () => {
  const dispatch = useDispatch();
    const [credentials,setCredentials] = useState({email:"",password:""});
  const navigate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    dispatch(login({email: credentials.email,password: credentials.password},navigate))
  }
  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <>
    <div className="flex items-center justify-center h-[100vh] flex-col bg-login_bg text-white">
            <h3 className="text-3xl">LOGIN</h3>
        
            <form className="flex flex-col items-center" onSubmit = {handleSubmit}>
                <label className="my-3 text-xl"><b>Email</b></label>
                <input className = 'border-2 rounded w-80 text-black p-1' name = "email" id="email" type="email" value={credentials.email} onChange = {onChange} placeholder="myemail@gmail.com" />
                <label className="my-3 text-xl"><b>Password</b></label>
                <input className = 'border-2 rounded w-80 text-black p-1' name = "password" type="password" value={credentials.password} placeholder="" onChange = {onChange}/>
                <button className="bg-blue-700 rounded py-1 px-3 my-3 hover:shadow-lg hover:shadow-blue-300 " >Login</button>
                <Link to="/createuser" className="text-blue-500 underline" >Create new Account</Link>
            </form>
        </div>
    </>
  )
}

export default Login