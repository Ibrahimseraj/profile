import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/addCourse.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Loading/function/Loading';

function AddCourse() {
  const { portfolioId } = useParams();
  const [organization, setOrganization] = useState('');
  const [course, setCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrganizationChange = (e) => {
    setOrganization(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const handleAddCourse = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/add/licenses/certificates`,
        { organization, course },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('profile_token')}`,
          },
        }
      );

      toast.success(response.data.message);
      navigate('/');
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
    <div className='add-course-page-con'>
      <div className='add-course-page'>
        <div className='nav-bar-adding'>
          <h1 className='adding-logo'>PROFILE</h1>
          <h1 className='what-are-you-adding'>Course</h1>
        </div>
        <div className='add-course-details'>
          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={handleAddCourse}>
              <div>
                <input 
                  placeholder='Organization' 
                  type="text" 
                  value={organization} 
                  onChange={handleOrganizationChange} 
                  required 
                />
              </div>
              <div>
                <input 
                  placeholder='Course' 
                  type="text" 
                  value={course} 
                  onChange={handleCourseChange} 
                  required 
                />
              </div>
              <button type="submit">Save</button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddCourse;