import { useState, useEffect } from 'react';

const Settings = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState(localStorage.getItem('newsLanguage') || 'en');

  useEffect(() => {
    localStorage.setItem('newsLanguage', preferredLanguage);
  }, [preferredLanguage]);

  const resetLocalStorage = () => {
    const isConfirmed = window.confirm('Are you sure you want to reset local storage?');

    if (isConfirmed) {
      localStorage.clear();
      setPreferredLanguage('en');
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  return (
    <div>
    <div>
      <h1>News Settings</h1>
      <select className='dropdown' onChange={(e) => setPreferredLanguage(e.target.value)} value={preferredLanguage}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
      </select>
      </div>
      <br />
      <hr />
      <br />
      <div>
      
      <button title="Clear all favorites" className="clear-favorites2" onClick={resetLocalStorage}>
        Reset Local Storage
      </button>
      {showPopup && (
        <div className="popup">
          <img src="public/consuela-family-guy.gif" alt="Consuela" />
        </div>
      )}
    </div>
    </div>
  );
};

export default Settings;
