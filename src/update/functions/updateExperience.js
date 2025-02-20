import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/updateExperience.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Loading/function/Loading';



function UpdateExperience() {
  const { portfolioId, experienceId } = useParams();
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [type, setType] = useState('');
  const [locationType, setLocationType] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleLocationTypeChange = (e) => {
    setLocationType(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFromChange = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setFrom(formattedDate);
  };

  const handleToChange = (date) => {
    const toFormat = moment(date).format('YYYY-MM-DD');
    setTo(toFormat);
  };

  useEffect(() => {
    const fetchExperience = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/experience/${experienceId}`);
        setCompanyName(response.data.companyName);
        setRole(response.data.role);
        setType(response.data.type);
        setLocationType(response.data.locationType);
        setDescription(response.data.description);
        setFrom(response.data.from);
        setTo(response.data.to);
      } catch (error) {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [portfolioId, experienceId]);

  const handleExperienceUpdateChange = async () => {
    try {
      await axios.put(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/update/experience/${experienceId}`, {
        companyName,
        role,
        type,
        locationType,
        description,
        from,
        to
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('profile_token')}`
        }
      });
      toast.success('Experience updated successfully!');
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
    <div className='update-experience-page-con'>
      <div className='update-experience-page'>
        <div className='nav-bar-updating'>
          <h1 className='updating-logo'>PROFILE</h1>
          <h1 className='what-are-you-updating'>Experience</h1>
        </div>
        <div className='updating-details-experience'>
          <input placeholder='Where you work' value={companyName} onChange={handleCompanyNameChange} />
          <input placeholder='Role' value={role} onChange={handleRoleChange} />
          <select id="employment-type" value={type} onChange={handleTypeChange}>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="temporary">Temporary</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
            <option value="remote">Remote</option>
          </select>
          <select id="location-type" value={locationType} onChange={handleLocationTypeChange}>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
            <option value="remote">Remote</option>
          </select>
          <div className='date-add-exp'>
            <DatePicker
              selected={from}
              onChange={handleFromChange}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              placeholderText="From"
            />
            <DatePicker
              selected={to}
              onChange={handleToChange}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              placeholderText="To"
            />
          </div>
          <textarea placeholder='Description' value={description} onChange={handleDescriptionChange} className='desc-update-experience' />
          <button onClick={handleExperienceUpdateChange} className='update-experience-submit'>Save</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdateExperience;