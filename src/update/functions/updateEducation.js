import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/updateEducation.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Loading/function/Loading';


function UpdateEducation() {
  const { portfolioId, educationId } = useParams();
  const [school, setSchool] = useState('');
  const [universitySpecialization, setUniversitySpecialization] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
  };

  const handleUniversitySpecializationChange = (e) => {
    setUniversitySpecialization(e.target.value);
  };

  useEffect(() => {
    const fetchEducation = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/education/${educationId}`);
        const { school, universitySpecialization } = response.data;
        setSchool(school);
        setUniversitySpecialization(universitySpecialization);
      } catch (error) {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [portfolioId, educationId]);

  const handleEducationUpdateChange = async () => {
    try {
      await axios.put(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/update/education/${educationId}`, {
        school: school,
        universitySpecialization: universitySpecialization
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('profile_token')}`
        }
      });

      toast.success('Education updated successfully!');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='update-education-page-con'>
      <div className='update-education-page'>
        <div className='nav-bar-updating'>
          <h1 className='updating-logo'>PROFILE</h1>
          <h1 className='what-are-you-updating'>Education</h1>
        </div>
        <div className='updating-details-education'>
          <input 
            value={school} 
            onChange={handleSchoolChange} 
            className='updating-details-education-input' 
            placeholder='School Name' 
          />
          <input 
            value={universitySpecialization} 
            onChange={handleUniversitySpecializationChange} 
            className='updating-details-education-input' 
            placeholder='Specialization' 
          />
          <button onClick={handleEducationUpdateChange}>Save</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdateEducation;