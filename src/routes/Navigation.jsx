import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { useSelector } from 'react-redux'

export const Navigation = () => {

  const { user } = useSelector((state) => state.userLogged)

  console.log(user)

  return (
    <div className='dark' >
    <BrowserRouter>
            <Routes>
              <Route exact path='/' element={ <Home /> }  />
              <Route path='/login' element={ <Login /> } />
              <Route path='/register' element={ <Register /> } />
              <Route path='/*' element={ <Navigate to='/' replace /> } />
            </Routes>
    </BrowserRouter>
    </div>
  )
}
