import React, { useState, useEffect } from 'react';
import '../style/about.css';
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";

function About({ portfolioId }) {
  const [aboutme, setAboutMe] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://profile-backend-hv7u.onrender.com/portfolio/get/${portfolioId}`);
        setAboutMe(response.data.aboutMe);
      } catch (error) {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [portfolioId]);

  const shouldRender = !loading && aboutme;

  return (
    <div>
      {shouldRender && (
        <>
          <h1 className='about-me' id='about'>About ME</h1>
          <div className='about'>
            <div className='about-me-description'>
              <h3>{aboutme}</h3>
            </div>
          </div>
        </>
      )}
      {loading && <ScaleLoader className='loading-about-visiter' />}
      <ToastContainer />
    </div>
  );
}

export default About;