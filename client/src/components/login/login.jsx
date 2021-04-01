import React,{useState} from 'react';
import axios from 'axios';

const Login = ({Setsignup,Setuser,setAutoLogout}) => {
    const [error,Seterror] = useState('')
    const [email,Setemail] = useState("")
    const [password,Setpassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if( !email && !password) {
            Seterror('All fields are required');
        }
        axios.post('http://localhost:8080/auth/login',{
          email : email,
          password : password  
        })
         .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('username', res.data.username);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
              new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString());
            Setuser({token:res.data.token,userId:res.data.userId,username:res.data.username});
            setAutoLogout(remainingMilliseconds);
         }).catch(
             error => {
                console.log(error)
            }
         )
      }
 return ( 
     <div className='user-form'>
     <span className='user-form-changeComponent' onClick={() => {Setsignup(true)}}>create a new account</span>
         <h1>Login</h1>
         <span className='user-form-error'>{error}</span>
         <form onSubmit={handleSubmit}>
         <input type='email' name='email' placeholder="email" value={email} onChange={(e) => {Setemail(e.target.value)}}/>
        <input type='password' name='password' placeholder="password" value={password} onChange={(e) => {Setpassword(e.target.value)}}/>
        <button type='submit'>Sign In</button>
         </form>
     </div>
 )
}

export default Login;