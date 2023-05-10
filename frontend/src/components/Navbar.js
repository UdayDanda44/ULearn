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
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-3">
      <Link className="navbar-brand" to="#">Navbar</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span> 
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="#">Home </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">About</Link>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Catoegires
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="#">Action</Link>
              <Link className="dropdown-item" to="#">Another action</Link>
            </div>
          </li>
        </ul>

    </div>
      {currentUser.success?<button onClick = {handleLogout} type="button" className="btn btn-primary mx-2">Logout</button>:<><Link to = '/login'><button type="button" className="btn btn-primary mx-2">Login</button></Link>
      <Link to = '/createuser'><button type="button" className="btn btn-primary">Signup</button></Link></>}
    </nav>
    
    </>
  )
}

export default Navbar