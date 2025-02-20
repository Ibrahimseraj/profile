import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../style/deleteExperience.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Loading/function/Loading';


function DeleteExperience() {
    const { portfolioId, experienceId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleExperienceDelete = async () => {
        setLoading(true);

        try {
            const response = await axios.delete(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/delete/experience/${experienceId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('profile_token')}`
                }
            });
            
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

    const handleCancel = () => {
        navigate('/');
    }

    return (
        <div className='delete-experience-page-con'>
            <div className='delete-experience-page'>
                <div className='nav-bar-delete'>
                    <Link to={'/'} className='home-refresh-link'><h1 className='delete-logo'>PROFILE</h1></Link>
                    <h1 className='what-are-you-delete'>Experience</h1>
                </div>
                <div className='delete-experience-details'>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <p>Are you sure you want to delete this experience?</p>
                            <div className='delete-experience-buttons'>
                                <button onClick={handleCancel}>Discard</button>
                                <button onClick={handleExperienceDelete}>Delete</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default DeleteExperience;