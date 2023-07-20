import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import Student from './Student'
import Teacher from './Teacher'
import {useSelector} from 'react-redux'
import Mainpage from './Mainpage'

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
    const {data} = await axios('https://minip-seven.vercel.app/api/auth/getuser',config)
    setuser(data);
    
  }
  const suc=currentUser?.success?true:false
  useEffect(()=>{
    if(suc){
      getuser();
      
    }
  },[currentUser])
  return (
    <div>
      <Navbar/>
      {user ? user?.role==="student"?<Student/>:<Teacher/> : <Mainpage/>}
    </div>
  ) 
}

export default Home