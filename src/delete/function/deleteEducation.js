import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../style/deleteEducation.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Loading/function/Loading';

function DeleteEducation() {
    const { portfolioId, educationId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleEducationDelete = async () => {
        setLoading(true);

        try {
            const response = await axios.delete(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/delete/education/${educationId}`, {
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
        <div className='delete-education-page-con'>
            <div className='delete-education-page'>
                <div className='nav-bar-delete'>
                    <Link to={'/'} className='home-refresh-link'><h1 className='delete-logo'>PROFILE</h1></Link>
                    <h1 className='what-are-you-delete'>Education</h1>
                </div>
                <div className='delete-education-details'>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <p>Are you sure you want to delete this education?</p>
                            <div className='delete-education-buttons'>
                                <button onClick={handleCancel}>Discard</button>
                                <button onClick={handleEducationDelete}>Delete</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default DeleteEducation;