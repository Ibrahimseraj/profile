import React, { useState } from 'react';
import '../style/addProfile.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/function/Loading';


function AddProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleProfileAdd = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://profile-backend-hv7u.onrender.com/portfolio/add/portfolio',
        {},
        {
          headers: {
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
    <div className='add-profile'>
      <div className='add-profile-con'>
        <div className='add-profile-navbar'>
          <h1 className='add-profile-logo'>PROFILE</h1>
          <h1 className='what-are-you-adding'>Add Profile</h1>
        </div>
        <div className='add-profile-details'>
          {loading ? (
            <Loading />
          ) : (
            <button onClick={handleProfileAdd}>Add your profile</button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddProfile;