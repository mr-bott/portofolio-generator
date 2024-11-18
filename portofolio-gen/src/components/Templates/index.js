import React from 'react';
import { useNavigate } from 'react-router-dom';
import './templates.css';
import Header from '../Header';
import Footer from '../Footer';

const Templates = () => {
    const navigate=useNavigate()
    const handleTemplates=(dat)=>{
       navigate(`/user-details/${dat}`)
    }
    return (
        <>
            <Header />
            <div className="main-template-cards-container">
                <div className="main-template-cards-wrapper">
                    <div className="main-template-card">
                        <h2 className="main-template-card-title">Template</h2>
                        <p className="main-template-card-content">
                            Hover over me to see the transformation effect. This card demonstrates
                            scale and shadow changes.
                        </p>
                        <button className="main-template-card-button" onClick={()=>handleTemplates("prozen")}>Select</button>
                    </div>

                    <div className="main-template-card" >
                        <h2 className="main-template-card-title">Template</h2>
                        <p className="main-template-card-content">
                            I have a different hover effect! Watch how I change my background
                            color and rotate slightly.
                        </p>
                        <button className="main-template-card-button" onClick={()=>handleTemplates("dicord")}>Select</button>
                    </div>

                    <div className="main-template-card">
                        <h2 className="main-template-card-title">Template</h2>
                        <p className="main-template-card-content">
                            And I have yet another unique hover animation. See how I lift up
                            and get a glow effect.
                        </p>
                        <button className="main-template-card-button" onClick={handleTemplates("prozen")}>Select</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Templates;
