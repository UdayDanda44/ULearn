import React from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Home}></Route>
          <Route path = '/login' exact Component={Login}></Route>
          <Route path = '/createuser' exact Component={Register}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
