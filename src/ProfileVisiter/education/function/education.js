import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import '../style/education.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";

function Education({ portfolioId }) {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://profile-backend-hv7u.onrender.com/portfolio/get/${portfolioId}`);
        setEducation(response.data.education);
      } catch (error) {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [portfolioId]);

  const educationList = education.map((edu) => {
    return (
      <div key={edu._id} className='kokoko'>
        <div>
          <h1>{edu.school}</h1>
          <h3>{edu.universitySpecialization}</h3>
        </div>
      </div>
    );
  });

  const shouldRender = !loading && education.length > 0;

  return (
    <div>
      {shouldRender && (
        <>
          <h1 className='education' id='education'>Education</h1>
          <div className='education-container'>
            {educationList}
          </div>
        </>
      )}
      {loading && <ScaleLoader className='loading-education-visiter' />}
      <ToastContainer />
    </div>
  );
}

export default Education;