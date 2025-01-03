import React from 'react';

// Memoize Alert to prevent unnecessary re-renders
const Alert = React.memo(({ status }) => {
    if (!status) return null; // Prevent rendering if status is null

    const isNormal = status === 'normal'; // Check if the status is 'normal'
  
    // Define dynamic styles based on status
    const alertStyle = {
      color: isNormal ? 'green' : 'red', // Text color for contrast
      padding: '10px', // Add padding for spacing
      borderRadius: '5px', // Optional: For rounded corners
      textAlign: 'center', // Center align the text
      fontWeight: 'bold', // Make text bold for emphasis
    };

    let upContent = status==="normal"? "normal": "Anomaly"
    let downContent = (status==="normal" || status==="Anomaly")?"":`[${status}]`
  
    return (
      <div style={alertStyle} className='absolute w-32 bottom-14 left-20 font-Mont font-bold text-xl uppercase animate-ping flex flex-col'>
        <span>{upContent}</span>
        <span>{downContent}</span>
      </div>
    );
});

export default Alert;
