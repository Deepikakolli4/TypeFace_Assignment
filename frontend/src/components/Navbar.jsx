import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
  return (
    <nav className='navbar'>
        <Link to='/dashboard' className='nav-link'>Dashboard</Link>
        <Link to='/transcations' className='nav-link'>Transcations</Link>
        <Link to='/upload' className='nav-link'>Upload</Link>
        {token? (
            <button onClick={handlelogout} className='nav-button'>Logout</button>
        ):(
            <>
            <Link to='/register' className='nav-link'>Register</Link>
            <Link to='/login' className='nav-link'>Login</Link>
            </>
        )}
    </nav>
  )
}

export default Navbar