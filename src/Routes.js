import React from 'react'
import {BrowserRouter ,Route, Routes , Navigate} from "react-router-dom"
import Home from './core/Home'
import SignIn from './pages/Candidate/SignIn'
import SignUp from './pages/Candidate/Signup'
import Signin from './pages/user/SignIn'
import ForgotPassword from './pages/Candidate/ForgotPassword'
import CandidateNavigation from './Components/layouts/candidateNavigation'
import CandidateHome from './pages/candidateDashboard/index'
import CandidateDetails from './pages/candidateDashboard/CanddiateDetails'





const App = () => {
    return (
      <BrowserRouter>

        <Routes>
           <Route path="/CandidateDashboard" element={<CandidateHome/>} />
           <Route path="/candidateDetails/:_id" element={<CandidateDetails/>} />

          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/user/signin" element={<Signin/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />




        </Routes>
      </BrowserRouter>
    )
  }
  
  export default App;