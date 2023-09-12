import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import LandingPage from "./LandingPage";
import LoginForm from "./login";
import Service from "./services";
import Forgot from "./forgot";
import SignupForm from "./signup";
import AboutUs from "./aboutus";
import ProfilePage from "./ProfilePage";
import ChatBot from "./contact";

function RouteApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/services" element={<Service />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/contactus" element={<ChatBot/>}/>
      </Routes>
    </Router>
  );
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<RouteApp />);
