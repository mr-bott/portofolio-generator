

import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import "./firstportifolio.css";
import { CgMail } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Share from "../Share";
import Cookies from "js-cookie"
import Loading from "../Loading";

function FirstPortifolio() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const jwt = Cookies.get("id")
    const navigate=useNavigate();
    // Fetch user data from API
    const handleBuildButton=()=>{
        navigate("/")
    }
    const fetchUserData = async () => {
        try {
            const url = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${url}/api/user/${id}`);
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setLoading(false); // Stop loader once data is fetched
            } else {
                console.error("User not found");
                setLoading(false); // Stop loader on error
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false); // Stop loader on error
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [id]);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const opentab = (tabname) => {
        const tablinks = document.getElementsByClassName("tab-links");
        const tabcontents = document.getElementsByClassName("tab-contents");

        Array.from(tablinks).forEach((tablink) => tablink.classList.remove("active-link"));
        Array.from(tabcontents).forEach((tabcontent) => tabcontent.classList.remove("active-tab"));

        document.getElementById(tabname)?.classList.add("active-tab");
    };

    const openmenu = () => {
        document.getElementById("sidemenu").style.right = "0";
    };

    const closemenu = () => {
        document.getElementById("sidemenu").style.right = "-200px";
    };

    if (loading) {
        return (
           <Loading/>
        );
    }

    return (
        <div className="first-container">
            {/* Header */}
            <div id="header">
                <div className="containerr">
                    <nav className="fixed-header">
                        <h1>
                            <span className="first-letter">{user?.personalInfo.name.charAt(0)}</span>
                            {user?.personalInfo.name.slice(1)}
                        </h1>

                        <ul id="sidemenu">
                            <li><a href="#">Home</a></li>
                            <li><a href="#about" onClick={() => scrollToSection("about")}>About</a></li>
                            <li><a href="#services" onClick={() => scrollToSection("services")}>Services</a></li>
                            <li><a href="#FirstPortifolio" onClick={() => scrollToSection("FirstPortifolio")}>FirstPortifolio</a></li>
                            <li><a href="#contact" onClick={() => scrollToSection("contact")}>Contact</a></li>
                            <i className="fa-solid fa-square-xmark" onClick={closemenu}></i>
                        </ul>
                        <i className="fa-solid fa-bars" onClick={openmenu}></i>
                    </nav>
                    <Share />

                    <center>
                        <div className="header-text">
                            <h1>{user.personalInfo.role}</h1>
                            <h1>Hi, I'm <span>{user?.personalInfo.name.split(" ")[0]}</span></h1> {/* Use dynamic name */}
                        </div>
                    </center>
                </div>
            </div>

            {/* About Section */}
            <div id="about">
                <div className="containerr">
                    <div className="row">
                        <div className="about-col-1">
                            <img src={user?.projects?.[0]?.imageUrl || "default-image-url.jpg"} alt="Profile" />
                        </div>
                        <div className="about-col-2">
                            <h1 className="sub-title">About Me</h1>
                            <p>{user?.aboutMe}</p>

                            <div className="tab-titles">
                                <p className="tab-links active-link" onClick={() => opentab("skills")}>Skills</p>
                                <p className="tab-links" onClick={() => opentab("experience")}>Experience</p>
                                <p className="tab-links" onClick={() => opentab("education")}>Education</p>
                            </div>

                            <div className="tab-contents active-tab" id="skills">
                                <ul className="ul-skills">
                                    {user?.skills?.technical?.map(skill => (
                                        <li key={skill}><span>Technical:</span> {skill}</li>
                                    ))}
                                    {user?.skills?.soft?.map(skill => (
                                        <li key={skill}><span>Soft:</span> {skill}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="tab-contents" id="experience">
                                <ul className="ul-skills">
                                    {user?.experience?.map(exp => (
                                        <li key={exp._id}><span>{exp.duration}:</span> {exp.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="tab-contents" id="education">
                                <ul className="ul-skills">
                                    {user?.education?.map(edu => (
                                        <li key={edu._id}><span>{edu.duration}:</span> {edu.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div id="services">
                <div className="containerr">
                    <h1 className="sub-title">My Services</h1>
                    <div className="services-list">
                        {user?.services?.map(service => (
                            <div key={service._id}>
                                <i className="fa-solid fa-code"></i>
                                <h2>{service.name}</h2>
                                <p>{service.description}</p>
                                <a href="#">Learn more</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Portfolio Section */}
            <div id="FirstPortifolio">
                <div className="containerr">
                    <h1 className="sub-title">My Work</h1>
                    <div className="work-list">
                        {user?.projects?.map(project => (
                            <div className="work" key={project._id}>
                                <img src={project.imageUrl || ""} alt={project.name} />
                                <div className="layer">
                                    <h3>{project.name}</h3>
                                    <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                                        <i className="fa-sharp fa-solid fa-up-right-from-square"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href="#" className="btn">See more</a>
                </div>
            </div>

            {/* Contact Section */}
            <div id="contact">
                <div className="containerr">
                    <div className="row">
                        <div className="contact-left">
                            <h1 className="sub-title">Contact Me</h1>
                            <p><CgMail /> {user?.personalInfo.email}</p>
                            <p><FaWhatsapp /> {user?.personalInfo.phone}</p>
                            <div className="social-icons">
                                <a href={user?.personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin />
                                </a>
                                <a href={user?.personalInfo.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <FaGithub />
                                </a>
                            </div>
                            <a href="images/Mikal Afewerki CV (1).pdf" download className="btn btn2">Download Resume</a>
                        </div>
                        <div className="contact-right">
                            <form>
                                <input type="text" name="Name" placeholder="Your Name" required />
                                <input type="email" name="email" placeholder="Your Email" required />
                                <textarea name="Message" rows="6" placeholder="Your Message"></textarea>
                                <button type="submit" className="btn btn2">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}

            {jwt == undefined ? (<div className="credit">
                <h1>Create your Portofolio</h1>
                <button className="ui-btn" onClick={()=>handleBuildButton()} >
                    <span>
                        Lets Build
                    </span>
                </button>
            </div>) : (null)}

        </div>
    );
}

export default FirstPortifolio;
