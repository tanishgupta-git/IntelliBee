import React from 'react';
import { Link} from 'react-router-dom'
import './header.css';

const Header = ({logoutHandler,user}) => {

    return (
        <nav className='header'>
          <span className='header-logo'><Link className='logo logo-size' to='/'>IntelliBee</Link> <span className='logo-right'> | </span> <span className='logo-size'>Greetings &lt;{user.username}&gt;</span></span>
          <ul>
          <li>  
           <Link to='/add-article' className='dark nav-listitem'>Write</Link></li>
           <li>
           <Link to='/dashboard' className='reverse-dark nav-listitem'>Your Articles</Link>
           </li>
           <li>
           <button onClick={logoutHandler} className='logout nav-listitem'>Logout</button>
           </li> 
          </ul>
        </nav>
    )
}

export default Header;
