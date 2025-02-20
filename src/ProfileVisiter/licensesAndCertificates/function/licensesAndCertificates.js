import React, { useState, useEffect } from 'react';
import '../style/licensesAndCertificates.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";

function LicensesAndCertificates({ portfolioId }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://profile-backend-hv7u.onrender.com/portfolio/get/${portfolioId}`);
        setCourses(response.data.licensesAndCertificates);
      } catch (error) {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [portfolioId]);

  const projects = courses.map((certificate) => {
    return (
      <div key={certificate._id} className="course-item">
        <div id="courses">
          <div className="course-details">
            <h1 id="course-organization">{certificate.organization}</h1>
            <h1 id="course-type">{certificate.course}</h1>
          </div>  
        </div>
      </div>
    );
  });

  const shouldRender = !loading && projects.length > 0;

  return (
    <div>
      {shouldRender && (
        <>
          <h1 className='project' id='Course'>Courses</h1>
          {loading ? (
            <ScaleLoader className='loading-course-visiter' />
          ) : (
            projects
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default LicensesAndCertificates;