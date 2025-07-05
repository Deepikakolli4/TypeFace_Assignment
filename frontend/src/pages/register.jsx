import React,{use, useState} from 'react'
import { registerUser } from '../api/api'
import { useNavigate } from 'react-router-dom'
import '../App.css'
const Register = () => {
  const [formData,setFormData] = useState({
    username : '',
    email:'',
    password:''
  })
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
        await registerUser(formData);
        navigate('/login');
    }catch(err){
        setError(err.response?.data?.message);
    }
  }
  const handleChange = async(e) =>{
     setFormData({
        ...formData,[e.target.name] : [e.target.value]
     });
  }
  return (
    <div className='form-container'>
        <h2 className='page-title'>Register</h2>
        {error && <p className='error-message'>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='Username' className='form-label'>Username</label>
                <input
                  type = "text" 
                  id = "username"
                  name = "username"
                  value = {formData.username}
                  onChange={handleChange}
                  placeholder='Enter username'
                  className='form-input'
                  required
                >
                </input>
            </div>
            <div className='form-group'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input
                  type = "text" 
                  id = "email"
                  name = "email"
                  value = {formData.email}
                  onChange={handleChange}
                  placeholder='Enter email'
                  className='form-input'
                  required
                >
                </input>
            </div>
             <div className='form-group'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input
                  type = "text" 
                  id = "password"
                  name = "password"
                  value = {formData.password}
                  onChange={handleChange}
                  placeholder='Enter password'
                  className='form-input'
                  required
                >
                </input>
            </div>
            <button type = "submit" className='form-button'>Register</button>
        </form>
    </div>
  )
}

export default Register