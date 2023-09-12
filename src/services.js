import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from "./img-brainware.png";
import { useNavigate } from "react-router-dom";
import './popup.css';
import './services.css';
import './navbar1.css';
import axios from 'axios';

const Service = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [username, setUsername] = useState("");
  const [initId, setinitId] = useState(1);
  // const [date, setDate] = useState("");
  
 
  const [id,setId]=useState(initId);
  const navigate = useNavigate();
  
  
  
  
  function generateRandomNumber(min, max) {
    
    const randomDecimal = Math.random();
    
    
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;

    setinitId(randomNumber);
    
    return randomNumber;
  }

  
  const handleLogout = ()=>{
    localStorage.removeItem("username");
    navigate("/login");
  }
  const handleClick = () => {
    
    const minRange = 1;
    const maxRange = 10;
    setId(generateRandomNumber(minRange, maxRange));
    
  };
  
  window.addEventListener('load', () => {
    const minRange = 1;
    const maxRange = 10;
    const randomNumber = generateRandomNumber(minRange, maxRange);
    setId(randomNumber);
  });
  
  const openModal = () => {
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    setIsLocked(false);
  };
  const [data, setData] = useState([]);
  
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/projects/${id}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
    
    const username = localStorage.getItem("username");
    setIsLoggedIn(!!username);
    setUsername(username);

    
    
  }, [id]);
  
  let description= data.description;
      let usage= data.usageDetail;
      let categoryId= data.categoryId;
      let projectName = data.projectName;
  
  // const handleDate = ()=>{
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear();
  //   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  //   const day = String(currentDate.getDate()).padStart(2, '0');
  //   const formattedDate = `${year}-${month}-${day}`;
  //   setDate(formattedDate);
  // }
  
  const handleLockIdea = async (e) => {
    
    if (isLoggedIn) {
      try {
        const response = await axios.get(`http://localhost:8080/api/locked/${username}`);
        const lockedIdeas = response.data;
        const isIdeaLocked = lockedIdeas.some((idea) => idea.projectName === projectName);
        if (isIdeaLocked) {
          // Display popup message that the idea is already taken by the user
          alert('You have already locked this idea.');
          window.location.reload();
        } else {
          const currentDate = new Date().toLocaleDateString(); 
          
          const newdata={
            categoryId: categoryId,
            projectName: projectName,
            usageDetail: usage,
            description: description,
            username: username,
            createdAt: currentDate
          }
          axios.post('http://localhost:8080/api/locked', newdata);
          setIsLocked(true);
          closeModal();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/login");
    }
  };
  
  
  return (
    <>
      <div className="body2">
        <div className="navbar1">
          <p></p>
          {isLoggedIn ? (
             <>
             <button className="logoutBtn" onClick={handleLogout}>
                    <div className="logoutsign"></div>
                    <div className="logouttext">Logout</div> 
                </button>
             <Link to ="/ProfilePage">
              <p>Hello {username}</p>
             </Link>
             </>
             ) : (
             <>
             <Link to="/login">
              <p>Login</p>
            </Link>
            <p>Welcome</p>
      </>
      )}          
          
          <Link to="/">
            <p>Home</p>
          </Link>
          <img src={logo} alt="Logo" onClick={()=>navigate("/")}/>
        </div>
        <div className="randombtnpos">
            <button className='ideabtn' onClick={handleClick}>New Ideas</button>
          
          <br />
          <br />
          <div className="designtext">
            <div className="color">
              <span className="lock"></span>
            </div>

            <div>
              
              <h1>Design</h1>
              <p className='paraposdesign'>{projectName}</p>
              <h1>for</h1>
              <p className="paraposfor">{usage}</p>
              
              <button className='descrptionbtn' onClick={openModal}>Description</button>
              
              {isOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <h2>Detailed Description</h2>
                    <h3>{description}</h3>
                    
                    <div className="ideapopup-container">
                    <button className='lockbtn' onClick={handleLockIdea}>LockIdea</button>
                    {isLocked && (
                    <div className="ideapopup">
                      <span className="tick-mark">&#10004; idea locked</span>
                    </div>
                  )}
                  </div>
                    
                    
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
