import React, { useState, useEffect } from 'react';
import '../style/About.css';
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";

function About() {
  const [aboutme, setAboutMe] = useState('');
  const [image, setImage] = useState();
  const [portfolioId, setPortfolioId] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://profile-backend-hv7u.onrender.com/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('profile_token')}`
          }
        });
        setAboutMe(response.data.aboutMe);
        setImage(response.data.userImage.url);
        setPortfolioId(response.data._id);
      } catch (error) {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1 className='about-me' id='about'>About ME</h1>
      
      {loading ? (
        <ScaleLoader className='loading-ani-mani' />
      ) : (
        <div className='about'>
          <div className='about-me-description'>
            <h3>{aboutme}</h3>
            <Link to={`/update/aboutme/${portfolioId}`}>
              <button className='about-update-link'><MdEdit /></button>
            </Link>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default About;