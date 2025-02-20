import React, { useEffect, useState } from 'react';
import '../style/landingPage.css';
import { Link, useNavigate } from 'react-router-dom';
import full_logo from '../../../images/full_logo_.png';
import exm from '../../../images/LinkedIn-exm.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <div className='landing-page-con'>
        <div className='landing-page'>
          <div className='lading-page-navbar'>
            <h1>PROFILE 📜</h1>
            <div>
              <Link to={'/login'} className='login-lading-page'>Login</Link>
              <Link to={'/register'} className='register-lading-page'>Create Profile</Link>
            </div>
          </div>
          <div className='landing-page-home'>
            <div className='landing-page-title'>
              <h3>bulid your online CV and share it on LinkedIn</h3>
            </div>
            <div className='landing-page-image-logo'>
              <img src={full_logo} />
            </div>
          </div>
          <div className='linkedin-how-to-share'>
            <div className='landing-page-share-linkedin-image'>
              <img src={exm} />
            </div>
            <div className='landing-page-share-linkedin-title'>
              <h3>Build it and Share it</h3>
            </div>
          </div>
          <div className=''></div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default LandingPage;