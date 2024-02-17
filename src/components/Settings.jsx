import { useState } from 'react';

const Settings = () => {
  const [showPopup, setShowPopup] = useState(false);

  /// Function to reset the local storage completely
  const resetLocalStorage = () => {
    const isConfirmed = window.confirm('Are you sure you want to reset local storage?');

    if (isConfirmed) {
      localStorage.clear();
      setShowPopup(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  return (
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
  );
};

export default Settings;
