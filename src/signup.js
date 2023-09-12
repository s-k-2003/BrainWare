import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar1.css';
import "./signup.css";
import RegisterSuccessPopup from "./RegisterSuccessPopup";
import logo from "./img-brainware.png";
import axios from "axios";


const SignupForm = () => {
  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupStyle, showPopup1] = useState("hide")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const navigate = useNavigate();

 
  
  const handleSumbit = (event)=>{
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      pasword: password
    };

    


    
    const newdata = {
      username: username,
      pasword:password,
      password: ""
    }
    if(!firstName && !lastName && !email && !username && !password){
      showPopup1("login-popup")
     setTimeout(() => showPopup1("hide"), 3000)
      event.preventDefault();
    }else{
      axios.post('http://localhost:8080/api/logindata', newdata)
      axios.post('http://localhost:8080/api/registerdata', data)
      
      setShowPopup(true);
      
      
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/login")
  };
    
  useEffect(()=>{
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user);
  },[]);

  if(isLoggedIn){
    navigate("/services");
  }

    

    return (
        <>
        <div className="navbar1">

        <p></p>
        <Link to="/services">
          <p>Category</p>
        </Link>
        <p>Faq</p>

        <Link to="/">
          <p>Home</p>
        </Link>
        <img src={logo} alt="Logo" onClick={()=>navigate("/")} />
      </div>
        <div className="signupcover">
            <h1>Register</h1>
            <input type="text" placeholder="FirstName" value={firstName} onChange={(event) => setFname(event.target.value)}/>
            <input type="text" placeholder="LastName" value={lastName} onChange={(event) => setLname(event.target.value)}/>
            <input type="email" placeholder="Email Address" value={email} onChange={(event) => setEmail(event.target.value)}/>
            <input type="text" placeholder="username" value={username} onChange={(event) => setName(event.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
             <div>
             
             <div class="signup-btn" onClick={handleSumbit}>Register</div>

                 {showPopup && <RegisterSuccessPopup onClose={handleClosePopup} />}
              </div>
            <br/>
            <Link to ="/login">
              <p className="text">Or Login</p>
            </Link>

            <div className={popupStyle}>
              <h2>Register Failed</h2>
              <h3>Enter all Details</h3>
            </div>

            
            
        </div>
        </>
    )
}

export default SignupForm
