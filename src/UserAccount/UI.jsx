import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UI.css';
import Navbar from './navbar/function/Navbar';
import Home from './homePage/function/Home';
import About from './about/function/About';
import Education from './education/function/Education';
import Projects from './licensesAndCertificates/function/licensesAndCertificates';
import Experience from './experience/function/experience';
import LandingPage from './landingPage/function/landingPage'


function UI() {
  if (!localStorage.getItem('profile_token')) {
    return (
      <LandingPage />
    )
  }

  return (
    <div id='all-con'>
      <div id='con'>
        <section id='UI'>
          <Navbar />
          <Home />
          <About />
          <Education />
          <Projects />
          <Experience />
        </section>
      </div>
    </div>
  )
}

export default UI;