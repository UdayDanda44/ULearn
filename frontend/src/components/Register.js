import React from 'react'
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css"

const Register = () => {
    const [credentials,setCredentials] = useState({username:"",email:"",password:"",role:"student"});
    let navigate = useNavigate();
    const onSubmit = async(e)=>{  
        console.log(credentials); 
        e.preventDefault() 
        const response = await fetch("http://minip-seven.vercel.app/api/auth/createuser",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username:credentials.username,email: credentials.email,password: credentials.password,role:credentials.role})
      })
      
      const json = await response.json()
      
      console.log(json)
      if(json.success){
        localStorage.setItem('token',json.authtoken)
        navigate("/login");
      }
      else{
        alert(json.error)
      }
    }

      const onChange = (e)=>{
        console.log(e.target.name);
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }
    
  return ( 
    <>
       
      <form className = 'bg-sky-300 flex flex-col items-end justify-center h-[100vh] bg-sign_up bg-no-repeat' onSubmit={onSubmit}>
        <div className='bg-slate-100 flex flex-col items-center justify-center border-2 p-10 rounded-2xl shadow-xl mx-10'>
        <h1 className='my-3 text-2xl'>Create new Account</h1>
            <div className="mb-3">
                <label htmlFor="name" className="my-7">Username</label><br/>
                <input name = 'username' type = 'text' className="border-2 hover:rounded-xl my-2 w-80 h-9 p-1 transition" id="username" value={credentials.username} onChange = {onChange}/>
            </div>
            <div className="mb-3">

                <label htmlFor="exampleInputEmail1" className="my-2">Email address</label><br/>
                <input name = 'email' type="email" className="border-2 hover:rounded-xl my-2 w-80 h-9 p-1 transition" id="exampleInputEmail1" value={credentials.email} aria-describedby="emailHelp" onChange = {onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="my-2">Password</label><br/>
                <input name = 'password' type="password" className="border-2 hover:rounded-xl my-2 w-80 h-9 p-1 transition" id="exampleInputPassword1" value={credentials.password} onChange = {onChange}/>
            </div>
            <p>Select your role</p>
            <select className="border-2 rounded my-1" aria-label="Default select example" name="role" onChange = {onChange} >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              
            </select><br/>
            <button type="submit" className="my-3 text-slate-50 bg-blue-700 rounded py-1 px-3 hover:shadow-lg hover:shadow-black content-center">Submit</button>
            </div>
        </form>
    </>
  )
}

export default Register