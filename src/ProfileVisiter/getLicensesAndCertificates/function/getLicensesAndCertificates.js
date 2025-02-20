import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/getLicensesAndCertificates.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../Loading/function/Loading';
import ScaleLoader from "react-spinners/ScaleLoader";


function GetLicensesAndCertificates() {
    const { portfolioId, licensesAndCertificatesId } = useParams();
    const [organization, setOrganization] = useState('');
    const [course, setCourse] = useState('');
    const [certificate, setCertificate] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://profile-backend-hv7u.onrender.com/portfolio/${portfolioId}/licenses/certificates/${licensesAndCertificatesId}`);
                setOrganization(response.data.organization);
                setCourse(response.data.course);
                setCertificate(response.data.certificates.url);
            } catch (error) {
                navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [portfolioId, licensesAndCertificatesId]);

    return (
        <div className='get-licensesAndCertificates-container'>
            <div className='get-licensesAndCertificates'>
                <div className='nav-bar-getting'>
                    <h1 className='get-logo'>PROFILE</h1>
                    <h1 className='what-are-you-getting'>Course</h1>
                </div>
                <div className='get-licensesAndCertificates-details'>
                    {loading ? (
                        <Loading />
                    ) : (
                        <img src={certificate} alt={course} />
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default GetLicensesAndCertificates;