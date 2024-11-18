


import React from "react";
import "./login.css";

function Login() {
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
    console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
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
