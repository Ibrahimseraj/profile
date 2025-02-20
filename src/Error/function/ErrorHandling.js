import React from 'react';
import '../style/ErrorHandling.css';
import { BiErrorAlt } from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';



function ErrorHandling() {
    const location = useLocation();
    const { status, message } = location.state || { status: 'Unknown Error', message: 'An unexpected error occurred.' };

    return (
        <div className='error-handling-con'>
            <div className='error-handling'>
                <div className='error-handling-error-icon-con'>
                    <BiErrorAlt className='error-handling-error-icon' />
                </div>
                <div className='error-handling-info-con'>
                    <h3>{status}</h3>
                    <h4>{message}</h4>
                    <button><Link to="/" className='Link-to-another-com'>Home page</Link></button>
                </div>
            </div>
        </div>
    );
}


export default ErrorHandling;