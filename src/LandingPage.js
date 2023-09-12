import React, { useEffect } from "react";
import "./navbar1.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./img-brainware.png";
import { useState } from "react";
import "./LandingPage.css";

function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    setIsLoggedIn(!!username);
    setUsername(username);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="landing-page-container">
      <div className="bg-image">
        <div className="navbar1">
          <p></p>
          {isLoggedIn ? (
            <>
              <button className="logoutBtn" onClick={handleLogout}>
                <div className="logoutsign"></div>
                <div className="logouttext">Logout</div>
              </button>
              <Link to="/Profilepage">
                <p>Hello {username}</p>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <p>Login</p>
              </Link>
              <p>Contact Us</p>
            </>
          )}
          <Link to="/aboutus">
            <p>About Us</p>
          </Link>
          <img src={logo} alt="Logo" onClick={()=>navigate("/")} />
        </div>
        <div className="get-started">
            <button className="lg" onClick={()=>navigate("/services")}>GET STARTED</button>
        </div>
        <div className="text-img">
          <h1>Unleash Your Creative Potential!</h1>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
