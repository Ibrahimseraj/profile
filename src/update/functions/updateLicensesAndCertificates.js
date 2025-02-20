import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/updateLicensesAndCertificates.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Loading/function/Loading';


function UpdateLicensesAndCertificates() {
  const { portfolioId, licensesAndCertificatesId } = useParams();
  const [organization, setOrganization] = useState('');
  const [course, setCourse] = useState('');
  const [certificates, setCertificates] = useState('');
  const [previewCertificates, setPreviewCertificates] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleOrganizationChange = (e) => {
    setOrganization(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const handleCertificatesPhotoChange = (event) => {
    const file = event.target.files[0];
    setCertificates(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewCertificates(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchLicensesAndCertificates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/licenses/certificates/${licensesAndCertificatesId}`);
        setOrganization(response.data.organization);
        setCourse(response.data.course);
        setCertificates(response.data.certificates.url);
      } catch (error) {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      } finally {
        setLoading(false);
      }
    };

    fetchLicensesAndCertificates();
  }, [portfolioId, licensesAndCertificatesId]);

  const handleLicensesAndCertificatesUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('organization', organization);
    formData.append('course', course);

    if (certificates instanceof File) {
      formData.append('certificates', certificates);
    }

    try {
      const response = await axios.put(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/update/licenses/certificates/${licensesAndCertificatesId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('profile_token')}`,
        }
      });

      if (response.status === 200) {
        navigate('/');
        toast.success('Update successful!');
      } else {
        toast.error('Update request was not successful.');
      }
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
    <div className='courses-update-con'>
      <div className='courses-update'>
        <div className='nav-bar-updating'>
          <h1 className='updating-logo'>PROFILE</h1>
          <h1 className='what-are-you-updating'>Courses</h1>
        </div>
        <div className='courses-update-details'>
          <form onSubmit={handleLicensesAndCertificatesUpdate}>
            <div>
              <input placeholder='Organization' type="text" value={organization} onChange={handleOrganizationChange} />
            </div>
            <div>
              <input placeholder='Course' type="text" value={course} onChange={handleCourseChange} />
            </div>
            <div>
              {previewCertificates ? (
                <img src={previewCertificates} alt="Certificates Preview" className='certificate-img' />
              ) : (
                <img src={certificates} alt="Existing Certification" className='certificate-img' />
              )}
              <input type="file" onChange={handleCertificatesPhotoChange} />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdateLicensesAndCertificates;