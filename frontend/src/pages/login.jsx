import React,{useState} from 'react'
import { loginUser } from '../api/api'
import { useNavigate } from 'react-router-dom'
import '../App.css'
const Login = () => {
  const[formData , setFormData] = useState({
    email : '',
    password : ''
  })
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(e) =>{
     e.preventDefault();
     try{
         const response = await loginUser(formData);
         localStorage.setItem('token',response.data.token);
         navigate('/dashboard');
     }catch(err){
        setError(err.response?.data?.messeage);
     }
  }
  return (
    <div className='form-container'>
        <h2 className='page-title'>Login</h2>
        {error && <p className='error-message'>{error}</p>}
        <form onSubmit={handleSubmit}>
        <div className='form-group'>
           <label htmlFor='email' className='form-label'>Email</label>
           <input
             type = "email"
             id = "email"
             name = "email"
             value={formData.email}
             onChange = {handlechange}
             placeholder='Enter email'
             className='form-input'
             required
           >
           </input>
        </div>
         <div className='form-group'>
           <label htmlFor='password' className='form-label'>Password</label>
           <input
             type = "password"
             id = "password"
             name = "password"
             value={formData.password}
             onChange = {handlechange}
             placeholder='Enter password'
             className='form-input'
             required
           >
           </input>
        </div>
        <button type="submit" className='form-button'>
            Login
        </button>
        </form>
    </div>
  )
}

export default Login