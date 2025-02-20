import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/navbar.css';
import { SiCoursera } from "react-icons/si";
import { SiAboutdotme } from "react-icons/si";
import { MdCastForEducation } from "react-icons/md";
import Loading from '../../../Loading/function/Loading';

function Navbar() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem('profile_token');
      setToken(storedToken);
      setLoading(false);
    };
    checkToken();
  }, []);

  const renderLinks = () => {
    if (loading) {
      return <Loading />;
    }

    if (token) {
      return (
        <div className='links'>
          <a href='#experience' className='click'>exp</a>
          <a href='#Course' className='click'><SiCoursera /></a>
          <a href='#education' className='click'><MdCastForEducation /></a>
          <a href='#about' className='click'><SiAboutdotme /></a>
        </div>
      );
    } else {
      return (
        <div className='links'>
          <Link to='/login' className='click'>Login</Link>
          <Link to='/register' className='click'>Create Profile</Link>
        </div>
      );
    }
  };

  return (
    <div className='nav' id='nav'>
      {renderLinks()}
      <h1>PROFILE 📜</h1>
    </div>
  );
}

export default Navbar;