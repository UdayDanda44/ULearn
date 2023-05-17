import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import Register from './Register'
import Student from './Student'
import Teacher from './Teacher'
import {useSelector} from 'react-redux'

const Home = () => {
  const [user, setuser] = useState()
  const { currentUser }=useSelector(state=>state.auth);
  const getuser = async()=>{
    const config={
      headers:{
          'Content-Type':'application/json',
          'auth-token':currentUser.authtoken
      }
  }
    const {data} = await axios('http://localhost:5000/api/auth/getuser',config)
    setuser(data);
    
  }
  const suc=currentUser?.success?true:false
  console.log(user,"user");
  useEffect(()=>{
    if(suc){
      getuser();
      
    }
  },[currentUser])
  return (
    <div>
      <Navbar/>
      {user ? user?.role==="student"?<Student/>:<Teacher/> : <Register/>}
    </div>
  ) 
}

export default Home