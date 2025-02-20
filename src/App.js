import './App.css';
import UI from './UserAccount/UI';
import Ui from './ProfileVisiter/UI';
import Login from './Auth/Login/function/Login';
import Register from './Auth/Register/function/Register';
import { Routes, Route } from 'react-router-dom';
import AddEducation from './post/functions/addEducation';
import AddCourse from './post/functions/addCourse';
import AddExperience from './post/functions/addExperience';
import UpdateEducation from './update/functions/updateEducation';
import UpdateExperience from './update/functions/updateExperience';
import UpdateAbout from './update/functions/updateAbout'
import UpdateNameAndOccupation from './update/functions/updateNameAndOccupation';
import UpdateLicensesAndCertificates from './update/functions/updateLicensesAndCertificates'
import DeleteEducation from './delete/function/deleteEducation';
import DeleteExperience from './delete/function/deleteExperience';
import DeleteLicensesAndCertificates from './delete/function/deleteLicensesAndCertificates';
import MyPhoto from './post/functions/myPhoto';
import GetLicensesAndCertificatesById from './ProfileVisiter/getLicensesAndCertificates/function/getLicensesAndCertificates';
import LandingPage from './UserAccount/landingPage/function/landingPage';
import AddProfile from './post/functions/addProfile';
import ErrorHandling from './Error/function/ErrorHandling'
import NotFoundErrorHandling from './Error/function/NotFoundErrorHandling'
import Loading from './Loading/function/Loading';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/landing/page' element={<LandingPage />} />
        <Route exact path='/' element={<UI />} />
        <Route exact path='/profile/:id' element={<Ui />} />
        <Route path='/addProfile' element={<AddProfile />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/add/education/:portfolioId' element={<AddEducation />} />
        <Route path='/add/course/:portfolioId' element={<AddCourse />} />
        <Route path='/add/experience/:portfolioId' element={<AddExperience />} />
        <Route path='/update/name/occupation/:portfolioId' element={<UpdateNameAndOccupation />} />
        <Route path='/update/aboutme/:portfolioId' element={<UpdateAbout />} />
        {/*
        <Route path='/my/photo/:portfolioId' element={<MyPhoto />} />
        not working online
        to be done
        */}
        <Route path='/update/education/:portfolioId/:educationId' element={<UpdateEducation />} />
        <Route path='/update/experience/:portfolioId/:experienceId' element={<UpdateExperience />} />
        <Route path='/update/licenses/certificates/:portfolioId/:licensesAndCertificatesId' element={<UpdateLicensesAndCertificates />} />
        <Route path='/get/:portfolioId/:licensesAndCertificatesId/licenses/certificates' element={<GetLicensesAndCertificatesById />} />
        <Route path='/delete/education/:portfolioId/:educationId' element={<DeleteEducation />} />
        <Route path='/delete/experience/:portfolioId/:experienceId' element={<DeleteExperience />} />
        <Route path='/delete/licenses/certificates/:portfolioId/:licensesAndCertificatesId' element={<DeleteLicensesAndCertificates />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/error' element={<ErrorHandling />} />
        <Route path='/*' element={<NotFoundErrorHandling />} />
      </Routes>
    </div>
  );
}


export default App;