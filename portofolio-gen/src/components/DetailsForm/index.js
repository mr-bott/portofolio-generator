import React, { useState, Link, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './detailsform.css';
import Cookies from "js-cookie"
import { jwtDecode } from 'jwt-decode';
import Header from '../Header';
import Footer from '../Footer';
import ImageSpinner from '../ImageSpinner';
const DetailsForm = () => {
  const jwt = Cookies.get('token');
  const decoded = jwt ? jwtDecode(jwt) : null;
  // console.log("Decoded JWT:", decoded);
  const gmail = decoded?.email;
  const { page } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      phone: '',
      email: `${gmail}`,
      linkedinUrl: '',
      githubUrl: '',
      role: ''
    },
    skills: {
      technical: [''],
      soft: [''],
    },
    education: [
      { name: '', duration: '' },
    ],
    aboutMe: '',
    services: [
      { name: '', description: '' }
    ],
    projects: [
      { name: '', imageUrl: '', projectLink: '' }
    ]
  });
  const fetchUserData = async () => {
    try {
      const url = process.env.REACT_APP_BACKEND_URL;
      const token = Cookies.get('token');
      const response = await fetch(`${url}/api/user/email/${gmail}`,
        {
        method: "GET",
         headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 send token
        },
        
      }
      );
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
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
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.REACT_APP_BACKEND_URL;
      const token = Cookies.get('token');
      // Ensure id is set before submitting
      if (!formData.id) {
        console.error("ID is missing!");
        return; // Don't submit without id
      }
      const response = await fetch(`${url}/api/user/email/${gmail}`, {
        method: 'PUT',
        credentials: "include",
         headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 send token
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        Cookies.set('id', result.user.id, { expires: 100 });
       
        navigate(`/${page}/${result.user.id}`);
      } else {
        console.error('Error saving data:', result.message);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  

  const handlePersonalInfoChange = (e) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSkillChange = (type, index, value) => {
    const updatedSkills = { ...formData.skills };
    updatedSkills[type][index] = value;
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };

  const addSkill = (type) => {
    const updatedSkills = { ...formData.skills };
    updatedSkills[type] = [...updatedSkills[type], ''];
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };
  const deleteSkill = (type, index) => {
    const updatedSkills = { ...formData.skills };
    updatedSkills[type] = updatedSkills[type].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };


  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setFormData({
      ...formData,
      education: updatedEducation
    });
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value
    };
    setFormData({
      ...formData,
      services: updatedServices
    });
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { name: '', description: '' }]
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { name: '', duration: '' }]
    });
  };
  const deleteService = (index) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index)
    });
  };


  


  const handleProjectImageChange = (index, file) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index].file = file; // Temporarily store the file for upload
    setFormData({ ...formData, projects: updatedProjects });
  };

  const saveProjectImage = async (index) => {
    setLoading(true)
    const project = formData.projects[index];
    if (!project.file) return;

    const imageFormData = new FormData(); // Renamed to avoid conflict
    imageFormData.append('image', project.file); // Pass the file to FormData

    try {
      const url = process.env.REACT_APP_BACKEND_URL;
      const token = Cookies.get('token');
      const response = await fetch(`${url}/upload/image`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 send token
        },
        body: imageFormData, // Use the renamed FormData
      });
      const data = await response.json();
      const updatedProjects = [...formData.projects];
      updatedProjects[index].imageUrl = data.imageUrl; // Save the returned URL
      delete updatedProjects[index].file; // Remove the temporary file after upload
      setFormData({ ...formData, projects: updatedProjects });
      setLoading(false)
    } catch (error) {
      console.error('Image upload failed', error);
      setLoading(false)
    }
  };


  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setFormData({
      ...formData,
      projects: updatedProjects
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { name: '', imageUrl: '', projectLink: '' }]
    });
  };
  const deleteProject = (index) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index)
    });
  };

  if (loading) {

    return (
      <ImageSpinner />
    )
  }

  return (
    <>
      <Header />
      <div className="main-det-portfolio-generator">
        <h1 className="main-det-h1">Portfolio Generator</h1>
        <form onSubmit={handleSubmit} className='form_handler'>
          {/* Personal Information */}
          <div className="main-det-laptop_view">
            <div className='first_half'>
              <sectiondiv className="main-det-form-section">
                <h2 className="main-det-h2">Personal Information</h2>
                <div className="main-det-input-group">

                  <div className="input-group">
                    <input required="" type="text" name="name" className="input"
                      placeholder="Full Name"
                      value={formData.personalInfo.name}
                      onChange={handlePersonalInfoChange}
                    />
                    <label className="user-label">First Name</label>
                  </div>

                  <div className="input-group">
                    <input required="" type="text" className="input"
                      id="role"
                      name="role"
                      placeholder="Role"
                      value={formData.personalInfo.role}
                      onChange={handlePersonalInfoChange}
                    />
                    <label htmlFor="role" className="user-label">Role</label>
                  </div>


                  <div className="input-group">
                    <input required="" className="input"
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                    />
                    <label htmlFor="phone" className="user-label">Phone Number</label>
                  </div>

                  <div className="input-group">
                    <input required="" className="input"
                      id="linked"
                      type="url"
                      name="linkedinUrl"
                      placeholder="LinkedIn URL"
                      value={formData.personalInfo.linkedinUrl}
                      onChange={handlePersonalInfoChange}
                    />
                    <label htmlFor="linked" className="user-label">Linkedin Url</label>
                  </div>

                  <div className="input-group">
                    <input required="" className="input" id="github"
                      type="url"
                      name="githubUrl"
                      placeholder="GitHub URL"
                      value={formData.personalInfo.githubUrl}
                      onChange={handlePersonalInfoChange}
                    />
                    <label htmlFor="github" className="user-label">Github Url</label>
                  </div>

                </div>
              </sectiondiv>

              {/* Skills */}
              <sectiondiv className="main-det-form-section">
                <h2 className="main-det-h2">Skills</h2>
                <div className="main-det-skills-section">
                  <div className="main-det-skill-group">
                    <h3>Technical Skills</h3>
                    {formData.skills.technical.map((skill, index) => (
                      <>

                        <div className="input-group">
                          <input required="" className="input" id="technical"
                            key={index}
                            type="text"
                            placeholder="Technical Skill"
                            value={skill}
                            onChange={(e) => handleSkillChange('technical', index, e.target.value)}
                          />
                          <label htmlFor="technical" className="user-label">Skill</label>
                        </div>
                        <button className="details_button" onClick={() => deleteSkill("technical", index)}>Delete</button>

                      </>
                    ))}

                    <button className="ui-btn" type="button" onClick={() => addSkill('technical')}>
                      <span>
                        Add Skill
                      </span>
                    </button>

                  </div>
                  <div className="main-det-skill-group">
                    <h3>Soft Skills</h3>
                    {formData.skills.soft.map((skill, index) => (
                      <>
                        <div className="input-group">
                          <input required="" className="input" id="technical"
                            key={index}
                            type="text"
                            placeholder="Soft Skill"
                            value={skill}
                            onChange={(e) => handleSkillChange('soft', index, e.target.value)}
                          />
                          <label htmlFor="technical" className="user-label">Skill</label>
                        </div>
                        <button className="details_button" onClick={() => deleteSkill("soft", index)}>Delete</button>
                      </>
                    ))}
                    <button className="ui-btn" type="button" onClick={() => addSkill('soft')}>
                      <span>
                        Add Skill
                      </span>
                    </button>

                  </div>
                </div>
              </sectiondiv>

              {/* Education */}
              <sectiondiv className="main-det-form-section">
                <h2 className="main-det-h2">Education</h2>
                {formData.education.map((edu, index) => (
                  <div key={index} className="main-det-education-item">

                    <input
                      className='input'
                      type="text"
                      placeholder="Institution Name"
                      value={edu.name}
                      onChange={(e) => handleEducationChange(index, 'name', e.target.value)}
                    />
                    <input
                      className='input'
                      type="text"
                      placeholder="Duration (e.g., 2018-2022)"
                      value={edu.duration}
                      onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                    />
                  </div>
                ))}
                <button className="ui-btn" type="button" onClick={addEducation}>
                  <span>
                    Add Education
                  </span>
                </button>
              </sectiondiv>

            </div>

            <div className='second_half'>

              {/* About Me */}
              <sectiondiv className="main-det-form-section">
                <h2 className="main-det-h2">About Me</h2>

                <textarea
                  placeholder="Tell us about yourself"
                  value={formData.aboutMe}
                  onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
                />
              </sectiondiv>

              {/* Services */}
              <sectiondiv className="main-det-form-section">
                <h2 className="main-det-h2">My Services</h2>
                {formData.services.map((service, index) => (
                  <div key={index} className="main-det-service-item">
                    <input
                      className='input'
                      type="text"
                      placeholder="Service Name"
                      value={service.name}
                      onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                    />
                    <input
                      className='input'
                      placeholder="Service Description"
                      value={service.description}
                      onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                    />
                    <button className="details_button" onClick={() => deleteService(index)}>Delete Service</button>
                  </div>
                ))}


                <button className="ui-btn" type="button" onClick={addService}>
                  <span>
                    Add Service
                  </span>
                </button>

              </sectiondiv>

              {/* Projects */}
              <sectiondiv className="main-det-form-section">
                <h2 className="main-det-h2">Projects</h2>
                {formData.projects.map((project, index) => (
                  <div key={index} className="main-det-project-item">
                    <input
                      className='input'
                      type="text"
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="It Will Auto Update"
                      value={project.imageUrl}
                    />
                    <input
                      type="file"
                      onChange={(e) => handleProjectImageChange(index, e.target.files[0])}
                    />
                    <input
                      type="url"
                      placeholder="Project Link"
                      value={project.projectLink}
                      onChange={(e) => handleProjectChange(index, 'projectLink', e.target.value)}
                    />
                    <div className="main-det-projects-button">
                      <button type="button" className="details_button" onClick={() => saveProjectImage(index)}>
                        Save Image
                      </button>
                      <button className="details_button" onClick={() => deleteProject(index)}>Delete Project</button>
                    </div>
                  </div>
                ))}

                <button className="ui-btn" type="button" onClick={addProject}>
                  <span>
                    Add Project
                  </span>
                </button>
              </sectiondiv>

            </div>
          </div>




          <button className="ui-btn ui-btn-bottom" type="submit" >
            <span>
              Create Portofolio
            </span>
          </button>

        </form>
      </div>
      <Footer />
    </>
  );


};

export default DetailsForm;


