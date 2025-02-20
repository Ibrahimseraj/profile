import React from 'react'
import { BiErrorAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';


function NotFoundErrorHandling() {
  return (
    <div className='error-handling-con'>
        <div className='error-handling'>
            <div className='error-handling-error-icon-con'>
                <BiErrorAlt className='error-handling-error-icon' />
            </div>
            <div className='error-handling-info-con'>
                <h3>404</h3>
                <h4>Page not Found</h4>
                <button><Link to="/" className='Link-to-another-com'>Home page</Link></button>
            </div>
        </div>
    </div>
  )
}

export default NotFoundErrorHandling