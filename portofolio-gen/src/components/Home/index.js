import React from 'react'
import { useNavigate } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer"
import { GoProjectSymlink } from "react-icons/go";
import { SiAltiumdesigner } from "react-icons/si";
import { SiStackshare } from "react-icons/si";
import "./home.css"
import GenerateButton from "../GenerateButton"

const Home = () => {
    const navigate = useNavigate();
    const handlecreateportifolio = () => {
        navigate("/temp")
    }
    return (
        <div className='main-container-home'>
            <Header />
            <div className="container">
                <div className="mainHead">
                    <h1>Portfolio is a part in building your future </h1>
                    <p>A portfolio is more than a showcase of work—it tells your story, highlighting your skills, growth, and dedication.</p>
                    {/* <button >Create Your Portfolio</button> */}
                    <GenerateButton className="create-btn" data={handlecreateportifolio}/>
                </div>
                <div className="main-content">
                    <div className="main-contentheader">
                        <h4 className="title">Welcome to Portfolio Builder</h4>
                    </div>

                    <div className="features">
                        <div className="feature-box">
                            <h2 className="feature-title">Showcase Your Work</h2>
                            <p className="feature-text">Display your projects and achievements in a professional layout.</p>
                            <GoProjectSymlink className="projectIcon" />
                        </div>

                        <div className="feature-box">
                            <h2 className="feature-title">Customize Design</h2>
                            <p className="feature-text">Choose from multiple themes and customize colors to match your style.</p>
                            <SiAltiumdesigner className="projectIcon" />
                        </div>

                        <div className="feature-box">
                            <h2 className="feature-title">Share Easily</h2>
                            <p className="feature-text">Get a unique URL to share your portfolio with potential clients.</p>
                            <SiStackshare className="projectIcon" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-subscribe-section">
                <div className="main-subscribe-container">
                    <div className="main-subscribe-text">
                        <h1 className="main-subscribe-title">Stay in the loop</h1>

                    </div>
                    <div className="main-subscribe-input-container">
                        <div className="loader1">
                            <div className="loader1-square"></div>
                            <div className="loader1-square"></div>
                            <div className="loader1-square"></div>
                            <div className="loader1-square"></div>
                            <div className="loader1-square"></div>
                            <div className="loader1-square"></div>
                            <div className="loader1-square"></div>
                        </div>

                    </div>
                </div>
            </div>




            <Footer />
        </div>
    )
}

export default Home
