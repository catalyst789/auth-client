import React, { useEffect } from 'react';
import StyleSingIn from '../SignIn/SigIn.module.css';
import Avatar from '@mui/material/Avatar';
import DefaultUserAvatar from '../../assets/ic_user.svg';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SingIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setInterval(() => {
      const token = localStorage.getItem('token');
      if(!token) navigate('/');
        console.log('cheking');
          axios.get('http://localhost:8989/home', {headers: {token}}).then((res) => {
            if(res.status !== 200){
              localStorage.removeItem('token');
              localStorage.removeItem('id');
              navigate('/');
            }
          }).catch((error) => {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            navigate('/');
          })
    }, 3000);
  })
  return (
    <div className={StyleSingIn.SingInBox}>
        <div className={StyleSingIn.avatar}>
        <Avatar src={DefaultUserAvatar} />        
        </div>
        <h1 style={{color: '#0B3558'}}>Welcome, {localStorage.getItem('id')}</h1>
    </div>
  )
}

export default SingIn