import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/myPhoto.css';
import { BiSolidImageAdd } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyPhoto() {
  const { portfolioId } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
        
  const handlePhotoUpload = async () => {
    if (!selectedPhoto) return;
        
    setLoading(true);
    setError(null);
        
    try {
      const formData = new FormData();
      formData.append('images', selectedPhoto);
        
      const response = await axios.post(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/update/userImage`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('profile_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
        
      if (response.status === 200) {
        navigate('/');
      } else {
        throw new Error('Upload failed');
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
        
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedPhoto(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewPhoto(reader.result);
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file.');
    }
  };
        
  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };
        
  return (
    <div className="profile-pic-con">
      <div className='profile-pic'>
        <div className='nav-bar-adding'>
          <h1 className='adding-logo'>PROFILE</h1>
          <h1 className='what-are-you-adding'>Photo</h1>
        </div>
        <div className="profile-pic-details">
          {previewPhoto ? (
            <img src={previewPhoto} alt="Preview" className='previewphoto-pic' />
          ) : (
            <div className='iiiii'>
              <input
                id="fileInput"
                className='imginut'
                type="file"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
                accept="image/*"
                aria-label="Upload Image"
              />
              <BiSolidImageAdd
                className='addimageicon'
                onClick={handleIconClick}
                style={{ cursor: 'pointer' }}
                aria-hidden="true"
              />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          <button onClick={handlePhotoUpload} className='profile-pic-button' disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
  export default MyPhoto;