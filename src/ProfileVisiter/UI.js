import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UI.css';
import Home from './homePage/function/home';
import Navbar from './navbar/function/navbar';
import About from './about/function/about';
import Education from './education/function/education';
import LicensesAndCertificates from './licensesAndCertificates/function/licensesAndCertificates';
import Experience from './experience/function/experience';
import Loading from '../Loading/function/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';


function UI() {
  const [portfolioId, setPortfolioId] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://profile-backend-hv7u.onrender.com/portfolio/get/${id}`);
        setPortfolioId(response.data._id);
      } catch (error) {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div id='all-con'>
      <div id='con'>
        <section id='UI'>
          <Navbar />
          <Home portfolioId={portfolioId} />
          <About portfolioId={portfolioId} />
          <Education portfolioId={portfolioId} />
          <LicensesAndCertificates portfolioId={portfolioId} />
          <Experience portfolioId={portfolioId} />
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UI;