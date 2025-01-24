import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Landing/Header.jsx";
import Hero from "./Components/Landing/Hero.jsx";
import Footer from "./Components/Landing/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CompanionPage from "./pages/CompanionPage.jsx";
// import Reservation from "./pages/Reservation.jsx";
import AppointmentPage from './Components/Appointment/AppointmentPage'
import Navbar from "./NavBar.jsx";
import OwnerAppointments from "./Components/Appointment/OwnerAppointment.jsx";
import SignUp from "./Components/Session/SignUpPage.jsx";
import LogInPage from "./Components/Session/LogInPage.jsx";
import UserProfile from "./Components/Session/UserProfile.jsx";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./QueryHelpers/sessionQuery.js";

function App() {

  const {data} = useQuery({queryKey:['user'],queryFn:getUser})
  return (
    <div>
    <Header user={data?.user}/>

      {/* <Hero />
      <Footer /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/reservation" element={<AppointmentPage/>} />
          <Route path="/companion" element={<CompanionPage />} />
          <Route path="/schedule" element={<OwnerAppointments/>}/>
          <Route path='/signup' element = {<SignUp/>}/>
          <Route path='/login' element = {<LogInPage/>}/>
          <Route path="/profile" element = {<UserProfile user={data?.user}/>}/>
          <Route path="/about" element = {<h1>About</h1>}/>

        </Routes>
      <Footer />


    </div>
  );
}

export default App;
