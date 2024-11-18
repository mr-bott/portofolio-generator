import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DetailsForm from './components/DetailsForm';
import Login from './components/Login';
import FirstPortifolio from './components/FirstPortifolio';
import ImageSpinner from './components/ImageSpinner';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from "./components/Home"
import Templates from './components/Templates';
import SecondPortfolio from './components/SecondPortfolio';
import Share from "../src/components/Share"
import Loading from './components/Loading';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/loading" element={<Loading />} />
        <Route path="/share" element={<Share />} />
          <Route path="/temp" element={<Templates />} />
          <Route path="/header" element={<Header />} />
          <Route path="/home" element={<Home />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/spinner" element={<ImageSpinner />} />
          <Route path="/" element={<TokenHandler />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-details/:page" element={<DetailsForm />} />
          <Route path="/prozen/:id" element={<FirstPortifolio />} />
          <Route path="/dicord/:id" element={<SecondPortfolio />} />
        </Routes>
      </Router>
    </div>
  );
}

const TokenHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      // Store the JWT token in cookies
      Cookies.set('jwt', token, { expires: 7 });
      // Redirect to the user details page after storing the token
      navigate('/home');
      // Clear the token from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // If there is no token, check if the user is authenticated
      const jwt = Cookies.get('jwt');
      if (!jwt) {
        // If the user is not authenticated, redirect to the login page
        navigate('/login');
      } else {
        // Redirect to the user details page
        navigate('/home');
      }
    }
  }, [navigate]);

  return null;
};

export default App;
