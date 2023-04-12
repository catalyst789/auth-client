import React, { useEffect } from 'react';
import StylesApp from './App.module.css';
import SingIn from './components/SignIn/SingIn'
import { Route, Routes, useNavigate } from 'react-router';
import Home from './components/Home/Home';

const App = () => {
const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/home');
    }
  }, [])

  return (
    <div className={StylesApp.appMain}>
      <Routes>
        <Route path='/' element={<SingIn />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App