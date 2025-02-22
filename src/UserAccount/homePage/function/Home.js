import React, { useEffect, useState, useRef } from 'react';
import '../style/Home.css';
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { IoCopySharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from 'axios';


function Home() {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [portfolioId, setPortfolioId] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://profile-backend-hv7u.onrender.com/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('profile_token')}`
          }
        });
        setName(response.data.name);
        setOccupation(response.data.occupation);
        setPortfolioId(response.data._id);
      } catch (error) {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [navigate]);

  const textToCopy = `https://get-profile.vercel.app/profile/${portfolioId}`;
  const tempInputRef = useRef(null);

  const handleCopy = () => {
    tempInputRef.current = document.createElement('input');
    document.body.appendChild(tempInputRef.current);
    tempInputRef.current.value = textToCopy;

    tempInputRef.current.select();
    document.execCommand('copy');

    document.body.removeChild(tempInputRef.current);
    toast.success('URL copied successfully');
  };

  return (
    <div className='home'>
      {loading ? (
        <ScaleLoader className='loading-ani-mani' />
      ) : (
        <div className='home-info'>
          <h4>Only copy this URL for sharing <IoCopySharp className='copy-url' onClick={handleCopy} /></h4>
          <h1>{name}</h1>
          <h3>{occupation}</h3>
          <Link to={`/update/name/occupation/${portfolioId}`}>
            <button className='update-name-occupation'><MdEdit /></button>
          </Link>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;