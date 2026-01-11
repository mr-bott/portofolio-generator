


import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";


function Login() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(null);
  const [message, setMessage] = useState("Loading...");
   useEffect(() => {
    if (countdown===null){
      return ;
    }
    if (countdown <= 0) {
      setMessage("Check your internet connection or try again later.");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    setMessage(countdown);

    return () => clearTimeout(timer);
  }, [countdown]);
  const mockupImages = [
    '/images/port3.jpg',
    '/images/port4.jpg',
    '/images/port7.jpg',
    '/images/port6.jpg',
    '/images/port8.jpg',
    '/images/port9.jpg',
  ];
  const handleGoogle = () => {
    const url = process.env.REACT_APP_BACKEND_URL
    setCountdown(45);
    console.log("Redirecting to backend for Google login... urkl:", url);
    window.location.href = `${url}/auth/google`; // Redirect to your backend for Google login
  };

  return (

    <div className="landing-container">
      <div className="content-wrapper">
        {/* Left side content */}
        <div className="left-content">
          <div className="logo">
            <span className="gradient-text">Portfolio</span>
            <span className="white-text">Generator</span>
          </div>

          <h1 className="main-heading">
            Fastest Way To Your Portfolio
          </h1>


          <div className="buttonlogin-wrapper">
            <button className="buttonlogin" onClick={handleGoogle}>
              <span className="buttonlogin_lg">
                <span className="buttonlogin_sl" />
                <span className="buttonlogin_text">Continue with Google</span>
              </span>
            </button>
            <p>Beta version</p>
            <p>...</p>
          </div>
          <div>
          <p className="server-delay" > {`-->`} Our servers rely on free resources,</p>
            <p> so the first request might take up to <span className="countdown-small">{countdown}</span> sec to wake Server up.  Just give it a moment, and we’ll be good to go!</p>
          </div>

        </div>

        {/* Right side with floating phones */}
        <div className="right-content">
          <div className="phones-grid">
            {mockupImages.map((img, index) => (
              <div key={index} className="phone-mockup">
                <div className="phone-frame">
                  <img
                    src={img}
                    alt={`Portfolio example ${index + 1}`}
                  className="phone-screen"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}

export default Login;
