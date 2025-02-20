import React, { useEffect, useState } from 'react';
import '../style/home.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";


function Home({ portfolioId }) {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
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
  
    fetchData();
  }, [portfolioId]);

  return (
    <div className='home'>
      {loading ? (
        <ScaleLoader />
      ) : (
        <div className='home-info'>
          <h4>Welcome</h4>
          <h1>{name}</h1>
          <h3>{occupation}</h3>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;