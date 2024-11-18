import React, { useState } from 'react';
import "./share.css"
import { FaShare } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import Cookies from "js-cookie"

const Share = () => {
  const [showOptions, setShowOptions] = useState(false);
  const jwt=Cookies.get("id")
  const shareUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  const handleShare = (platform) => {
    let shareLink = '';

    switch (platform) {
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareLink, '_blank');
  };

  return (
<>
    {jwt!=undefined ?
        ( <div>
        <div className="share-button" onClick={() => setShowOptions(!showOptions)}>
       <FaShare/>
        </div>
  
        <div className={`share-options ${showOptions ? 'show' : ''}`}>
          <div className="share-option" onClick={() => handleShare('whatsapp')}>
             {/* <FaWhatsapp size={20} /> */}  WhatsApp
          </div>
          <div className="share-option" onClick={() => handleShare('linkedin')}>
            LinkedIn
          </div>
          <div className="share-option" onClick={handleCopyLink}>
            Copy Link
          </div>
        </div>
      </div>):
      (null)
    }
    </>
   
  );
};

export default Share;
