import React  from "react";
import { useState } from "react";

const Forgot=()=>{

    const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsEmailSent(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };
    return(
        <>
        {isEmailSent ? (
            <div>
              <p>An email with instructions to reset your password has been sent to {email}.</p>
              <p>Please check your inbox and follow the instructions provided.</p>
            </div>
          ) : (
              <div className="cover">
            <h1>Reset Password</h1>
            <input type="email" placeholder="Enter yout Email" value={email} onChange={handleEmailChange} required/>
            <div className="login-btn" onClick={handleSubmit}>Send Email</div>
            {error && <p>{error}</p>}
        </div>
        )}
    </>
    )
}


export default Forgot