import React, { useState, useEffect } from 'react';
import '../style/experience.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";

function Experience({ portfolioId }) {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://profile-backend-hv7u.onrender.com/portfolio/get/${portfolioId}`);
        setExperience(response.data.experience);
      } catch (error) {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [portfolioId]);

  const experienceList = experience.map((exp) => {
    return (
      <div key={exp._id} className='job-experience-container'>
        <div className='job-details-container'>
          <h1>{exp.role}</h1>
          <p>{exp.companyName}</p>
          <div className='job-details'>
            <p className='company-name'>{exp.locationType}</p>
            <p className='spriting'>|</p>
            <p className='job-type'>{exp.type}</p>
          </div>
          <p>{(new Date(exp.from)).toLocaleString('en-US', { month: 'short', year: 'numeric' })}</p>
          <p>{exp.to ? (new Date(exp.to)).toLocaleString('en-US', { month: 'short', year: 'numeric' }) : 'present'}</p>
        </div>
        <div className='job-description'>
          <p>{exp.description}</p>
        </div>
      </div>
    );
  });

  const shouldRender = !loading && experience.length > 0;

  return (
    <div className='experience-all-con'>
      {shouldRender && (
        <>
          <h1 className='experience' id='experience'>Experience</h1>
          <div className='experience-container'>
            {experienceList}
          </div>
        </>
      )}
      {loading && <ScaleLoader className='loading-experience-visiter' />}
      <ToastContainer />
    </div>
  );
}

export default Experience;