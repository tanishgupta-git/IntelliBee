import React,{useState,useEffect, useCallback} from 'react';
import './App.css';
import HomePage from './pages/homePage/homePage';
import LoginPage from './pages/loginPage/loginPage';

const App = () => {
  const [user,Setuser] = useState({token:null,userId:"",username:""});

  const logoutHandler = () => {
    Setuser({token: null});
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  const setAutoLogout = useCallback(milliseconds => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds) 
  },[])

  useEffect(()=> {
    const token =     localStorage.getItem('token');
    const expiryDate =localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const remainingMilliseconds =
    new Date(expiryDate).getTime() - new Date().getTime();
    Setuser({userId : userId,token : token,username : username}); 
    setAutoLogout(remainingMilliseconds);
  },[setAutoLogout])

  return (
    <div className="App">

      {
        user.token ? (<HomePage user={user} logoutHandler={logoutHandler}/>) :
        (<LoginPage Setuser={Setuser} setAutoLogout={setAutoLogout} />)
      }
    
    </div>
  );
}

export default App;