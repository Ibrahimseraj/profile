import React, { useState, useEffect } from 'react';
import '../style/licensesAndCertificates.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";

function LicensesAndCertificates() {
  const [courses, setCourses] = useState([]);
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
        setPortfolioId(response.data._id);
        setCourses(response.data.licensesAndCertificates);
      } catch (error) {
        navigate('/error', { state: { status: error.response?.status, message: error.response?.data.message || 'An error occurred' } });
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [navigate]);

  const projects = courses.map((certificate) => {
    return (
      <div key={certificate._id} className="course-item">
        <div id="courses">
          <div className="course-details">
            <h1 id="course-organization">{certificate.organization}</h1>
            <h1 id="course-type">{certificate.course}</h1>
          </div>  
          <Link to={`/delete/licenses/certificates/${portfolioId}/${certificate._id}`}>
            <button 
              className="delete-course" 
              aria-label={`Delete ${certificate.course} from ${certificate.organization}`}
            >
              <RiDeleteBinFill />
            </button>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 className='project' id='Course'>Courses</h1>
      {loading ? (
        <ScaleLoader className='loading-ani-mani' />
      ) : (
        <div>
          {projects}
          <Link to={`/add/course/${portfolioId}`}>
            <button className='add-course'>Add Course</button>
          </Link>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default LicensesAndCertificates;