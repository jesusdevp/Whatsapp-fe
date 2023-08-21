import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { useSelector } from 'react-redux'

export const Navigation = () => {

  const { user } = useSelector((state) => state.user)
  const { token } = user
  
  return (
    <div className='dark' >
    <BrowserRouter>
            <Routes>
              <Route exact path='/' element={ token ?  <Home /> : <Navigate to='/login' /> }  />
              <Route path='/login' element={ !token ? <Login /> : <Navigate to='/' /> } />
              <Route path='/register' element={ !token ? <Register /> : <Navigate to='/' />} />
              <Route path='/*' element={ <Navigate to='/' replace /> } />
            </Routes>
    </BrowserRouter>
    </div>
  )
}
