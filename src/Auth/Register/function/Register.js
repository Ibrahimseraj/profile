import React, { useState } from 'react';
import '../style/Register.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../../../Loading/function/Loading';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://profile-backend-hv7u.onrender.com/auth/register', {
        email,
        password
      });
      
      navigate('/Login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='register-con'>
      <div className='register'>
        <div className='adding-navbar-register'>
          <h1 className='register-logo'>PROFILE</h1>
          <h1 className='register-header'>Register</h1>
        </div>
        <div className='register-details'>
          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={handleRegister}>
              <input placeholder='Email' type='email' value={email} onChange={handleEmailChange} required />
              <input placeholder='Password' type='password' value={password} onChange={handlePasswordChange} required />
              <button type='submit'>Register</button>
              <Link to={'/login'} className='link-to-login'>Login</Link>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;