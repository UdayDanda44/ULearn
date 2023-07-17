import React from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import About from './components/About'
import LikedVideos from './components/LikedVideos'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Home}></Route>
          <Route path = '/login' exact Component={Login}></Route>
          <Route path = '/createuser' exact Component={Register}></Route>
          <Route path='/about' exact Component={About}></Route>
          <Route path='/likedvideos' exact Component={LikedVideos}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
