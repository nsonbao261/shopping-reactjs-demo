import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './global.css'
import { CustomerHome, LoginPage, SignupPage } from './pages'
import { CartPage } from './pages/Customer/Cart'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/home' element={<CustomerHome />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/home' element={<CustomerHome />} />
      <Route path='/cart' element={<CartPage />} />
    </Routes>
  )
}
export default App
