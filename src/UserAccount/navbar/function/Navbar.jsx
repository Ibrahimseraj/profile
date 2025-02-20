import React from 'react';
import '../style/Navbar.css';
import { SiCoursera } from "react-icons/si";
import { SiAboutdotme } from "react-icons/si";
import { MdCastForEducation } from "react-icons/md";
import { Link } from 'react-router-dom';

function Navbar() {
  const renderLinks = () => {
    const token = localStorage.getItem('profile_token');
    if (token) {
      return (
        <div className='links'>
          <Link to='#experience' className='click' aria-label="Experience Section">exp</Link>
          <Link to='#Course' className='click' aria-label="Courses Section"><SiCoursera /></Link>
          <Link to='#education' className='click' aria-label="Education Section"><MdCastForEducation /></Link>
          <Link to='#about' className='click' aria-label="About Section"><SiAboutdotme /></Link>
        </div>
      );
    } else {
      return (
        <div className='links'>
          <Link to='/register' className='click' aria-label="Register Page">Register</Link>
          <Link to='/login' className='click' aria-label="Login Page">Login</Link>
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