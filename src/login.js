import React, { useEffect, useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import './navbar1.css';
import "./login.css"
import LoginSuccessPopup from "./LoginSuccessPopup";
import logo from "./img-brainware.png";
import axios from "axios";


const LoginForm = () => {

  const [username, setName] = useState('');
  const [pasword, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [error, setError] = useState("");

    const [popupStyle, showPopup1] = useState("hide")
    
    const navigate = useNavigate();

  
    
    
     
  
    

    const handleSumbit = async (event)=>{
      
      if(!username || !pasword){
        setError("Enter all Details");
        showPopup1("login-popup")
        setTimeout(() => showPopup1("hide"), 3000)
        event.preventDefault();
      }else{

        
        try {
          const response = await axios.post('http://localhost:8080/api/logindata/auth', {username, pasword});
          
          if (response.data === "Login Successful") {
            sessionStorage.setItem('username', username);
            
            setShowPopup(true);
            localStorage.setItem("username", username);
            
            
            
            

            
          } else {
            setError("User not Exist");
            showPopup1("login-popup")
            setTimeout(() => showPopup1("hide"), 3000)
            setIsLoggedIn(false);
            event.preventDefault();
            
            
            
          }
        } catch (error) {
          alert(error);
        }

        

        
        setName("");
        setPassword("")
        
        
      }

      
    };


    useEffect(()=>{
      const user = localStorage.getItem("username")
      setIsLoggedIn(!!user);
    },[]);

   


    const handleClosePopup = () => {
      setShowPopup(false);
      
      navigate("/services")
    };
    
    
  if(isLoggedIn){
    navigate("/services")
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
        
        <img src={logo} alt="Logo"  onClick={()=>navigate("/")}/>
      </div>
        <div className="cover">
            <h1>Login</h1>
            <input type="text" placeholder="username" value={username} onChange={(event) => setName(event.target.value)} required/>
            <input type="password" placeholder="password" value={pasword} onChange={(event) => setPassword(event.target.value)} required/>
            <div className="login-btn" onClick={handleSumbit}>Login</div>
            {showPopup && <LoginSuccessPopup onClose={handleClosePopup} />}
            
            <Link to ="/signup">
              <p className="signuptext">Or Register</p>
            </Link>

            

           
            
            <div className={popupStyle}>

                <h3>Login failed</h3>
                <p>{error}</p>
            </div>
        </div>
        </>
    )
}

export default LoginForm