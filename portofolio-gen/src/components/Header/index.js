import { Link } from "react-router-dom";
import React from "react"; // Ensure React is also imported
import { MdOutlineLogout } from "react-icons/md";
import "./header.css";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate=useNavigate();
  const handleLogout=()=>{
     Cookies.remove("id");
     Cookies.remove("token");
     navigate("/login");
  }
  return (
    <header className="main-head-header">
      <div className="main-head-header-container">
        <div className="main-head-logo-container">
          <a href="/" className="main-head-logo-link">
            <span className="main-head-logo-icon"></span>
            <span className="main-head-logo-text">PortZen</span>
          </a>
        </div>

        {/* Right side - Navigation and Profile */}
        <div className="main-head-nav-profile-container">
          <nav className="main-head-nav-container">
            <ul className="main-head-nav-list">
              <li className="main-head-nav-item">
                <Link to="/user-details/prozen" className="main-head-nav-link">
                  Modify Data
                </Link>
              </li>
              <li className="main-head-nav-item">
                <Link to="/temp" className="main-head-nav-link">
                  Templates
                </Link>
              </li>

            </ul>
          </nav>
          
            <div className="main-head-profile-container" onClick={()=>handleLogout()}>
              <button className="main-head-profile-button" >

                <MdOutlineLogout className="main-head-profile-icon" />
              </button>
            </div>
     
        </div>
      </div>
    </header>
  );
}

export default Header;
