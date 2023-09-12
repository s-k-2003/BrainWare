import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import logo from "./img-brainware.png";
import './navbar1.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clubpopup, setclubPopup] = useState(false);
  const [roomcode, setRoomcode] = useState("");
  const [roomname, setRoomname] = useState("");
  const [roomdescription, setRoomdescription] = useState("");
  const [sharedIdea] = useState(null);
  const [ideaId, setIdeaid] = useState("");
  
  const [filterdata, setFilterdata] = useState([]);
  const [cData, setCdata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        setIsLoggedIn(!!username);
        setUsername(username);
        const response = await axios.get(`http://localhost:8080/api/locked/${username}`);
        const filteredData = response.data.reduce((acc, curr) => {
          if (!acc.find((item) => item.categoryId === curr.categoryId)) {
            curr.createdAt = curr.createdAt.slice(0, 10);
            acc.push(curr);
          }
          return acc;
        }, []);
        setData(filteredData);
        console.log(response.data);
        const res = await axios.get(`http://localhost:8080/api/club/user/${username}`);
        const filteredClubs = res.data.filter((club) => club.username === username);
        setFilterdata(filteredClubs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cData != null) {
      const user = localStorage.getItem("username");
      const Clubdata = {
        username: user,
        roomcode: cData[0].roomcode,
        roomname: cData[0].roomname,
        roomdescription: cData[0].roomdescription,
        ideasshared: cData[0].ideasshared
      };

      axios.post("http://localhost:8080/api/club", Clubdata)
        .then(() => {
          window.location.reload();
        });
    }
  }, [cData, sharedIdea]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleChangePassword = () => {
    setShowModal(true);
  };

  const getDaySimilarity = (createdAt) => {
    if (!createdAt) {
      return "Invalid Date";
    }

    const [day, month, year] = createdAt.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();

    const differenceInTime = today.getTime() - date.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays === 0) {
      return "Today";
    } else if (differenceInDays === 1) {
      return "Yesterday";
    } else if (differenceInDays >= 2 && differenceInDays < 7) {
      return "This Week";
    } 
    else if(differenceInDays >= 7 && differenceInDays < 30){
      return "Previous Weeks";
    }else if (differenceInDays >= 30) {
      return "A Month Ago";
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/locked/delete/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
    window.location.reload();
  };

  const handleSubmit = (e) => {
    if (!newPassword) {
      alert("Password field cannot be empty");
    } else {
      if (oldPassword === newPassword) {
        alert("OldPassword cannot be NewPassword");
      }
      const loginpassworddata = {
        username: username,
        pasword: newPassword,
      };
      axios.put(`http://localhost:8080/api/forgotpassword/login/${username}`, loginpassworddata)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (!isLoggedIn) {
    navigate("/login");
  }
  

  useEffect(() => {
    const roomCode = Math.random().toString(36).substring(2, 7);
    setRoomcode(roomCode);
  }, []);

 

  const handleCreateClub = (Id) => {
    const checkId = Id;
    console.log(checkId);
    const lockedIdea = data.find((idea) => idea.categoryId === parseInt(Id));
  
    if (lockedIdea) {
      const clubdata = {
        username: username,
        roomcode: roomcode,
        roomname: roomname,
        roomdescription: roomdescription,
        ideasshared: lockedIdea.projectName,
      };
  
      axios
        .post("http://localhost:8080/api/club", clubdata)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Selected category ID is not locked by you.");
    }
  };
  

  const handleJoinClub = async () => {
    const clubCode = prompt("Enter the club code:");
    if (clubCode) {
      try {
        const res = await axios.get(`http://localhost:8080/api/club/${clubCode}`);
        const clubData = res.data;
        setCdata(clubData);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  
  return (
    <>
      {/* Navbar */}
      <div className='navbar1'>
        <p></p>
        <button className="logoutBtn" onClick={handleLogout}>
          <div className="logoutsign"></div>
          <div className="logouttext">Logout</div>
        </button>
        <Link to='/services'>
          <p>Category</p>
        </Link>
        <Link to='/'>
          <p>Home</p>
        </Link>
        <img src={logo} alt="Logo" onClick={()=>navigate("/")}/>
      </div>

      {/* Change Password Modal */}
      {showModal && (
        <div className="pmodal">
          <div className="pmodal-content">
            <span className="pclose" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
              <div className='p'>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled
                />

              </div>
              <div className='p'>
                <label>Old Password:</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className='p'>
                <label>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button className='changepassword-button' type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Idea List */}
      <div className="idea-list">
        <h3>Your Ideas</h3>

        {data.length > 0 ? (
          <ul className="idea-history">

            {/* Today */}
            <li>
              <div className="group">
                <h4>Today</h4>
                {data
                  .filter((user) => getDaySimilarity(user.createdAt) === "Today")
                  .map((user) => (
                    <div key={user.user_id} onClick={() => handleUserClick(user)}>
                      🟢 {user.projectName}
                    </div>
                  ))}
              </div>
            </li>

            {/* Yesterday */}
            <li>
              <div className="group">
                <h4>Yesterday</h4>
                {data
                  .filter((user) => getDaySimilarity(user.createdAt) === "Yesterday")
                  .map((user) => (
                    <div key={user.user_id} onClick={() => handleUserClick(user)}>
                      🟠 {user.projectName}
                    </div>
                  ))}
              </div>
            </li>

            <li>
              <div className="group">
                <h4>This Week</h4>
                {data
                  .filter((user) => getDaySimilarity(user.createdAt) === "This Week")
                  .map((user) => (
                    <div key={user.user_id} onClick={() => handleUserClick(user)}>
                      🟡 {user.projectName}
                    </div>
                  ))}
              </div>
            </li>

            {/* Previous Weeks */}
            <li>
              <div className="group">
                <h4>Previous Week</h4>
                {data
                  .filter((user) => getDaySimilarity(user.createdAt) === "Previous Weeks")
                  .map((user) => (
                    <div key={user.user_id} onClick={() => handleUserClick(user)}>
                      🔵 {user.projectName}
                    </div>
                  ))}
              </div>
            </li>

            {/* A Month Ago */}
            <li>
              <div className="group">
                <h4>A Month Ago</h4>
                {data
                  .filter((user) => getDaySimilarity(user.createdAt) === "A Month Ago")
                  .map((user) => (
                    <div key={user.user_id} onClick={() => handleUserClick(user)}>
                      🔴 {user.projectName}
                    </div>
                  ))}
              </div>
            </li>

            {/* Username and Change Password */}
            <div className="username-container">
              <span className="username">{username}</span>
              <button className="edit-button" onClick={handleChangePassword}>Change Password</button>
            </div>

          </ul>
        ) : (
          <div className="username-container">
            <p>
              No ideas found<br/>
              To add new ideas<br/>
              Go to Category page.
            </p>
            <label className='username'>{username}</label>
            <button className="edit-button" onClick={handleChangePassword}>Change Password</button>
          </div>
        )}
      </div>

      {/* Lock Modal */}
      {selectedUser && (
        <div className="lockmodal">
          <div className="lockmodal-content">
            <span className="lockclose" onClick={() => setSelectedUser(null)}>
              &times;
            </span>
            <h2>{selectedUser.projectName}</h2>
            <p>CategoryId: {selectedUser.categoryId}</p>
            <p>Usage: {selectedUser.usageDetail}</p>
            <p>Description: {selectedUser.description}</p>
            <p>Locked Date: {selectedUser.createdAt}</p>
            <button className="delete-button" onClick={() => handleDelete(selectedUser.user_id)}>
              Delete
            </button>
            
          </div>

        </div>


    
        )}
     

        <div className='clubcontainer'>
        <button className='createclub_btn' onClick={() => setclubPopup(true)}>
          + Create Club
        </button>
        <button className='joinclubbtn' onClick={handleJoinClub}>
          JoinClub
        </button>
        <div>
          <h2>Your Clubs</h2>
          {filterdata.map((club) => (
          <div key={club.username} className="club">
            <h3>{club.roomname}</h3>
            <p>Room Code : {club.roomcode}</p>
          </div>
          ))}
</div>

        </div>
         {clubpopup && (
        <div className="clubpopup">
        <div className="clubpopup-content">
        <span className="createclose" onClick={() => setclubPopup(false)}>
        &times;
        </span>
        <h2>Create Club</h2>
        <form>
        <p>Room Code: {roomcode}</p>
        <div>
        <input type="text" value={roomname} onChange={(e) => setRoomname(e.target.value)} placeholder='Room Name:'/>
        </div>
        <div>
        <input type="text" value={roomdescription} onChange={(e) => setRoomdescription(e.target.value)} placeholder='Room Description:'/>
        </div>
        <div>
        <input type="text" value={ideaId} onChange={(e) => setIdeaid(e.target.value)} placeholder='Enter your categoryId:'/>
        </div>
        <div>
        <button type="submit" onClick={()=>handleCreateClub(ideaId)}>Create</button>
        </div>
        </form>
        <div>
        </div>
        </div>
        </div>
        )}
        
    </>
  );
};

export default ProfilePage;
