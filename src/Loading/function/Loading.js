import React from 'react';
import  '../style/Loading.css';
import Logo  from '../../images/logo_only.png';
import ScaleLoader from "react-spinners/ScaleLoader";



function Loading() {
  return (
    <div id='loading'>
        <div className='image-and-loading-con'>
            <img src={Logo} alt='Logo' />
            <ScaleLoader className='loading-animation' />
        </div>
    </div>
  )
}

export default Loading;