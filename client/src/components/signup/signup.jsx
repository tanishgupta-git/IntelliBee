import React,{useState} from 'react';
import axios from 'axios';

const Signup = ({Setsignup}) => {
    const [error,Seterror] = useState('')
    const [username,Setusername] = useState("");
    const [email,Setemail] = useState("")
    const [password,Setpassword] = useState("");
    const [confirmPassword,SetconfirmPassword] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      if(!username && !email && !password && !confirmPassword) {
          Seterror('All fields are required');
      }
      if (password !== confirmPassword) {
          Seterror("Password dosen't match");
          return;
      }
      axios.put('http://localhost:8080/auth/signup',{
        username : username,
        email : email,
        password : password  
      })
       .then(res => console.log(res)).catch(error => Seterror(error.response.data.message)
       )
    }
 
 return (
    <div className='user-form'>
    <span className='user-form-changeComponent' onClick={() => {Setsignup(false)}}>Already have an account</span>
    <h1>Signup</h1>
    <span className='user-form-error'>{error}</span>
    <form onSubmit={handleSubmit}>
        <input type='text' name='username' placeholder="username" value={username} onChange={(e) => {Setusername(e.target.value)}}/>
        <input type='email' name='email' placeholder="email" value={email} onChange={(e) => {Setemail(e.target.value)}}/>
        <input type='password' name='password' placeholder="password" value={password} onChange={(e) => {Setpassword(e.target.value)}}/>
        <input type='password' name='confirmPassword' placeholder="confirm password" value={confirmPassword} onChange={(e) => {SetconfirmPassword(e.target.value)}}/>
        <button type='submit'>Sign Up</button>
    </form>
</div>
 )
}

export default Signup;