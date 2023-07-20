import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const { currentUser }=useSelector(state=>state.auth);
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }
  return (
    <>
    <div className='flex flex-row justify-between p-3 bg-slate-700 items-center text-slate-300 font-mono '>
      <Link className="text-3xl" to="#">ULearn</Link>
      <ul>
        <Link className="li-items " to="#">Home </Link>
        <Link className="li-items" to="/about">About</Link>
      </ul>
      <div>
        {currentUser.success?<button onClick = {handleLogout} type="button" className=" buttons">Logout</button>:<><Link to = '/login'><button type="button" className="buttons">Login</button></Link>
        <Link to = '/createuser'><button type="button" className="buttons">Signup</button></Link></>}
        </div>
    </div>
    </>
  )
}

export default Navbar