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
    <center>
        <div className="login_container">
            <h3 className="login_head">LOGIN</h3>
        
            <form className="forms" onSubmit = {handleSubmit}>
                <label className="gmail"><b>Email</b></label><br/>
                <input className = 'login_email' name = "email" id="email" type="email" value={credentials.email} onChange = {onChange} placeholder="myemail@gmail.com" /><br/>
                <label className="gmail"><b>Password</b></label><br/>
                <input className = 'login_password' name = "password" type="password" value={credentials.password} placeholder="" onChange = {onChange}/><br/>
                <button className="login_b" >Login</button><br/>
                <span className="CNA">Don't have an account?</span> <Link to="/createuser" className="cna" >Create new Account</Link>
            </form>
        </div>
    </center> 
    </>
  )
}

export default Login