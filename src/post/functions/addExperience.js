import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/addExperience.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Loading/function/Loading';


function AddExperience() {
    const { portfolioId } = useParams();
    const [companyName, setCompanyName] = useState('');
    const [role, setRole] = useState('');
    const [type, setType] = useState('');
    const [locationType, setLocationType] = useState('');
    const [description, setDescription] = useState('');
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCompanyNameChange = (e) => {
        setCompanyName(e.target.value);
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    const handleTypeChange = (e) => {
        setType(e.target.value);
    }

    const handleLocationTypeChange = (e) => {
        setLocationType(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleFromChange = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setFrom(formattedDate);
    };

    const handleToChange = (date) => {
        const toFormatted = moment(date).format('YYYY-MM-DD');
        setTo(toFormatted);
    }

    const handleAddExperience = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/add/experience`, {
                companyName: companyName,
                role: role,
                type: type,
                locationType: locationType,
                description: description,
                from: from,
                to: to
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('profile_token')}`,
                }
            });

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
    }

    return (
        <div className='add-experience-page-con'>
            <div className='add-experience-page'>
                <div className='nav-bar-adding'>
                    <h1 className='adding-logo'>PROFILE</h1>
                    <h1 className='what-are-you-adding'>Experience</h1>
                </div>
                <div className='add-experience-details'>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <input placeholder='Where you work' value={companyName} onChange={handleCompanyNameChange} />
                            <input placeholder='Role' value={role} onChange={handleRoleChange} />
                            <select id="employment-type" value={type} onChange={handleTypeChange}>
                                <option value="">Select Employment Type</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="temporary">Temporary</option>
                                <option value="internship">Internship</option>
                                <option value="freelance">Freelance</option>
                                <option value="remote">Remote</option>
                            </select>
                            <select id="location-type" value={locationType} onChange={handleLocationTypeChange}>
                                <option value="">Select Location Type</option>
                                <option value="on-site">On-site</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="remote">Remote</option>
                            </select>
                            <textarea placeholder='Description' value={description} onChange={handleDescriptionChange} />
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
                            <button onClick={handleAddExperience} className='add-experience-button'>Save</button>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddExperience;