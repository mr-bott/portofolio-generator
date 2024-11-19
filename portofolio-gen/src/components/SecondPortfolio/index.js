import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "./secondportofolio.css"; // You can add your custom styles here
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import Share from "../Share";
import Cookies from "js-cookie"
import Loading from "../Loading";
const SecondPortfolio = () => {
    const [isMenuActive, setMenuActive] = useState(false);
    const [userData, setUserData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const jwt=Cookies.get("id")
    const navigate=useNavigate()
    const handleBuildButton=()=>{
        navigate("/")
    }
    const fetchUserData = async () => {
        try {
            setIsLoading(true)
            const url = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${url}/api/user/${id}`);
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setIsLoading(false); // Stop loader once data is fetched
        
            } else {
                console.error("User not found");
                setIsLoading(false); // Stop loader on error
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setIsLoading(false); // Stop loader on error
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [id]);

    const handleMenuClick = () => {
        setMenuActive(!isMenuActive);
    };

    const handleScroll = () => {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("header nav a");
        const top = window.scrollY;

        sections.forEach((sec) => {
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute("id");

            if (top >= offset && top < offset + height) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });
                document.querySelector(`header nav a[href*=${id}]`).classList.add("active");
            }
        });

        const header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 100);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    if (isLoading){
        return(
           <Loading/>
        )
    }

    return (
        <div className="d-main-container">
            <header className="d-port-header">
                <a href="#home" className="d-port-logo">
                    portfolio
                </a>
                <i className="bx bx-menu" id="menu-icon" onClick={handleMenuClick}></i>

                <nav className={`d-port-navbar ${isMenuActive ? "active" : ""}`}>
                    <a href="#home" className="d-port-active">
                        Home
                    </a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#portfolio">Portfolio</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>
   <Share/>
            <section className="d-port-home" id="home">
                <div className="d-port-home-content">
                    <div className="d-port-home-imag">
                        <img src="images/1.png" alt="" />
                    </div>
                    <div>
                        <h3>hello, it's me</h3>
                        <h1>{userData?.personalInfo?.name || "Murai"}</h1>

                        <h3>
                            And I am a <span>{userData?.personalInfo?.role || "Frontend Dveloper"}</span>
                        </h3>
                        <p>
                            —Tech enthusiast — student of Computer Science —'Explorer — Always
                            learning, always growing—building @proups.in
                        </p>
                        <div className="d-port-social-media">
                           
                            <a href={userData?.personalInfo?.linkedinUrl||null} target="_blank">
                            <CiLinkedin />
                            </a>
                            <a href={userData?.personalInfo?.githubUrl||null} target="_blank">
                                <FaGithub/>
                            </a>
                        </div>
                        <a href="#" className="d-port-btn">
                            RESUME
                        </a>
                    </div>
                </div>
            </section>

            <section className="d-port-about" id="about">
                <div className="d-port-about-container">
                    <div className="d-port-about-img">
                        <img src="images/1.png" alt="" />
                    </div>
                    <div className="d-port-about-content">
                        <h2 style={{ fontSize: "32px" }}>
                            About <span style={{ fontSize: "32px" }}>ME</span>
                        </h2>
                        <p style={{ fontSize: "19px" }}>
                            {userData?.aboutMe || "Murai"}
                        </p>
                        <a href="#" className="d-port-btn">
                            READ MORE
                        </a>
                    </div>
                </div>
            </section>

            <section className="d-port-services" id="services">
                <h2 style={{ fontSize: "36px" }}>
                    our <span>services</span>
                </h2>

                <div className="d-port-services-container">
                    {userData?.services?.map((service, index) => (
                        <div className="d-port-services-box" key={index}>
                            <i className="bx bx-code-alt"></i>
                            <h2>
                                {service?.name.split(" ")[0]}
                                <span> {service?.name.split(" ")[1] || "</>"}</span>
                            </h2>
                            <p style={{ fontSize: "15px" }}>
                                {service?.description || "We specialize in creating customized websites and mobile applications that are user-friendly, responsive, and tailored to your specific business needs"}
                            </p>
                            <a href="" className="d-port-btn">
                                read more
                            </a>
                        </div>
                    ))}
                </div>

            </section>

            <section className="d-port-portfolio" id="portfolio">
                <h2 className="d-port-heading" style={{ fontSize: "36px" }}>
                    Latest <span>projects</span>
                </h2>

                <div className="d-port-services">
                    <div className="d-port-services__wrapper">
                        {userData?.projects?.map((project) => (
                            <div className="d-port-services__card" key={project._id}>
                                <img src={project.imageUrl || "images/default.png"} alt={project.name || "Project Image"} />
                                <h2>{project.name || "Untitled Project"}</h2>
                                <p>{project.projectLink || "No link available"}</p>
                                {/* <div className="d-port-services__btn">
                                    <button onClick={() => window.open(project.projectLink, "_blank")}>
                                        Learn More
                                    </button>
                                </div> */}
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <section className="d-port-contact" id="contact">
                <h2 style={{ fontSize: "36px" }}>
                    contact <span>us</span>
                </h2>
                <div className="d-port-contact-wrapper">
                    <div className="d-port-contact-container">
                        <div className="d-port-contact-info">
                            <h3>Need help or have a question? Contact us!</h3>
                            <form action="">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    className="d-port-contact-input"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    className="d-port-contact-input"
                                />
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    className="d-port-contact-textarea"
                                ></textarea>
                                <button type="submit" className="ui-btn">
                                    SEND MESSAGE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {jwt == undefined ? (<div className="credit">
                <h1>Create your Portofolio</h1>
                <button className="ui-btn" onClick={()=>handleBuildButton()}>
                    <span>
                        Lets Build
                    </span>
                </button>
            </div>) : (null)}
        </div>
    );
};

export default SecondPortfolio;
