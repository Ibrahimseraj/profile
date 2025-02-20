import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/updateNameAndOccupation.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Loading/function/Loading';

function UpdateNameAndOccupation() {
    const { portfolioId } = useParams();
    const [name, setName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleOccupationChange = (e) => {
        setOccupation(e.target.value);
    };

    useEffect(() => {
        const fetchAboutMe = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://profile-backend-hv7u.onrender.com/portfolio/get/${portfolioId}`);
                setName(response.data.name);
                setOccupation(response.data.occupation);
            } catch (error) {
                navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
            } finally {
                setLoading(false);
            }
        };

        fetchAboutMe();
    }, [portfolioId]);

    const handleNameAndOccupationUpdate = async () => {
        try {
            await axios.put(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/update/name/occupation`, {
                name: name,
                occupation: occupation
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('profile_token')}`
                }
            });

            toast.success('Update successful!');
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
        <div className='update-name-and-occupation-con'>
            <div className='update-name-and-occupation'>
                <div className='nav-bar-updating'>
                    <h1 className='updating-logo'>PROFILE</h1>
                    <h1 className='what-are-you-updating'>Name & Occupation</h1>
                </div>
                <div className='updating-details-Name-occupation'>
                    <input placeholder='Name' value={name} onChange={handleNameChange} />
                    <input placeholder='Occupation' value={occupation} onChange={handleOccupationChange} />
                    <button onClick={handleNameAndOccupationUpdate}>Save</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default UpdateNameAndOccupation;