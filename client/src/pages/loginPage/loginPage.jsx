import React,{useState} from 'react';
import Login from '../../components/login/login';
import Signup from '../../components/signup/signup';

import './loginPage.css';

const LoginPage = ({Setuser,setAutoLogout}) => {
    const [signup,Setsignup] = useState(false);
  return (
      <div className='loginPage'>
           {
               signup ?
               <Signup Setsignup={Setsignup}/> :
               <Login  Setsignup={Setsignup} Setuser={Setuser} setAutoLogout={setAutoLogout}/> 
           } 
      </div>
  )
}

export default LoginPage;