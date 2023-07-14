import React from 'react';

const ProgressBar = ({ number,max }) => {
    const progress = (number / max) * 100;
    return (
      <div className="progress-bar-length">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    );
  };

  export default ProgressBar;