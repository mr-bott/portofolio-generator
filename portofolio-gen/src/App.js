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
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    // 1️⃣ If token comes from OAuth redirect
    if (urlToken) {
      Cookies.set("token", urlToken, {
        secure: true,
        sameSite: "lax",
        expires: 7,
      });

      // Clean URL
      window.history.replaceState({}, document.title, "/");
      navigate("/home");
      return;
    }

    // 2️⃣ If token already exists in cookies
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      navigate("/home");
      return;
    }

    // 3️⃣ No token at all
    navigate("/login");
  }, [navigate]);

  return null;
};

export default App;
