import React from 'react';
import "./footer.css";

const Footer = () => {
  return (
    <footer className="main-foot-footer">
      <div className="main-foot-footer-container">
        <div className="main-foot-footer-brand">
          <div className="main-foot-footer-logo">
            <span role="img" aria-label="logo">🐱</span>
            Portzen
          </div>
          <p className="main-foot-footer-description">
            Your portfolio is the story of your growth, a showcase of your skills, and a glimpse into your future potential.
          </p>
        </div>

        <div className="main-foot-footer-section">
          <h3 className="main-foot-footer-heading">Quick links</h3>
          <ul className="main-foot-footer-links">
            <li className="main-foot-footer-link-item">
              <a href="/components" className="main-foot-footer-link">Components</a>
            </li>
            <li className="main-foot-footer-link-item">
              <a href="/temp" className="main-foot-footer-link">Templates</a>
            </li>
            <li className="main-foot-footer-link-item">
              <a href="/contact" className="main-foot-footer-link">Contact us</a>
            </li>
          </ul>
        </div>

        <div className="main-foot-footer-section">
          <h3 className="main-foot-footer-heading">Developers</h3>
          <ul className="main-foot-footer-links">
            <li className="main-foot-footer-link-item">
              <a href="/components" className="main-foot-footer-link">Keerthana</a>
            </li>
            <li className="main-foot-footer-link-item">
              <a href="https://muralikrishna-ten.vercel.app/" target="_blank" className="main-foot-footer-link">Murali Krishna</a>
            </li>
            <li className="main-foot-footer-link-item">
              <a href="/contact" className="main-foot-footer-link">Roshan Sameer</a>
            </li>
          </ul>
        </div>

        <div className="main-foot-footer-section">
          <h3 className="main-foot-footer-heading">Resources</h3>
          <ul className="main-foot-footer-links">
            <li className="main-foot-footer-link-item">
              <a href="/documentation" className="main-foot-footer-link">Documentation</a>
            </li>
            <li className="main-foot-footer-link-item">
              <a href="/credits" className="main-foot-footer-link">Credits</a>
            </li>
            <li className="main-foot-footer-link-item">
              <a href="https://github.com" className="main-foot-footer-link">Star us on GitHub</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="main-foot-footer-social">
        <a href="/email" className="main-foot-social-icon">📧</a>
        <a href="/twitter" className="main-foot-social-icon">🐦</a>
        <a href="/github" className="main-foot-social-icon">🐱</a>
        <a href="/discord" className="main-foot-social-icon">💬</a>
      </div>

      <div className="main-foot-footer-copyright">
        ©2024 All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
