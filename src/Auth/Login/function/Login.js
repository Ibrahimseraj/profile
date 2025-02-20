import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Login.css';
import Loading from '../../../Loading/function/Loading';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://profile-backend-hv7u.onrender.com/auth/login', {
        email,
        password,
      });

      localStorage.setItem('profile_token', response.data.token);

      const profileResponse = await axios.get('https://profile-backend-hv7u.onrender.com/user/profile', {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });

      if (profileResponse.data && Object.keys(profileResponse.data).length > 0) {
        navigate('/');
      } else {
        navigate('/addProfile');
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-con'>
      <div className='login'>
        <div className='adding-navbar-login'>
          <h1 className='login-logo'>PROFILE</h1>
          <h1 className='login-header'>Login</h1>
        </div>
        <div className='login-details'>
          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={handleLogin}>
              <input placeholder='Email' type='email' value={email} onChange={handleEmailChange} required />
              <input placeholder='Password' type='password' value={password} onChange={handlePasswordChange} required />
              <button type='submit'>Login</button>
              <Link to={'/register'} className='link-to-register'>Register</Link>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;