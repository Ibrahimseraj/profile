import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../style/deleteLicensesAndCertificates.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Loading/function/Loading';


function DeleteLicensesAndCertificates() {
    const { portfolioId, licensesAndCertificatesId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handelDeleteLicensesAndCertificates = async () => {
        setLoading(true);

        try {
            const response = await axios.delete(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/delete/licensesAndCertificates/${licensesAndCertificatesId}`, {
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
        <div className='delete-course-page-con'>
            <div className='delete-course-page'>
                <div className='nav-bar-delete'>
                    <Link to={'/'} className='home-refresh-link'><h1 className='delete-logo'>PROFILE</h1></Link>
                    <h1 className='what-are-you-delete'>Course</h1>
                </div>
                <div className='delete-course-details'>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <p>Are you sure you want to delete this course?</p>
                            <div className='delete-course-buttons'>
                                <button onClick={handleCancel}>Discard</button>
                                <button onClick={handelDeleteLicensesAndCertificates}>Delete</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default DeleteLicensesAndCertificates;