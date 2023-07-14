import React from 'react';

const StrengthBar = ({ strength }) => {
    const steps = ['1', '2', '3', '4'];
  const activeStep = strength;

  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`progress-bar__step ${
            index+1 <= activeStep ? 'active' : ''
          }`}
        >
         {step}
        </div>
      ))}
    </div>
  );
  };
  

  export default StrengthBar;