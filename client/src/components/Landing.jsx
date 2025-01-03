import React from "react";
import nbg from "../assets/nbg.svg";
import modem from "../assets/modem.svg";
import ftext from "../assets/ftext.svg";

import './style.css'
import './alo.css'
import { useNavigate } from "react-router-dom";

const Landing = ({start, handleAttackClick}) => {
  const navigate = useNavigate();
  
  const handleStartClick = () => {
    setTimeout(() => {
      console.log('This is delayed by 2 seconds');
      handleAttackClick({ attackId: 1, attackData: start?.data });
    }, 2000); // 2-second delay

    navigate("/home");
  };

  return (
    <div
      className="relative bg-center h-screen"
      style={{
        backgroundImage: `url(${nbg})`,
      }}
    >
      <img
        src={ftext}
        className="absolute h-fit size-96 transform -translate-x-1/2 left-1/2"
        style={{ top: "250px" }}
      />
      <img
        src={modem}
        className="absolute h-40 w-auto transform -translate-x-1/2 left-1/2"
        style={{ bottom: "15px" }}
      />
      <div className="flex justify-center">
        <div className="container1 font-Mont font-bold" style={{"marginTop":"350px"}}>
          {/* Text Rows */}
          {/* Add your text rows here */}
        </div>
        
        <button
          className="absolute font-Mont opacity-100 text-xl text-white shadow-lg font-bold animate-bounce neon-glow"
          style={{ bottom: "169px", left: "970px" }}
          onClick={handleStartClick} // Add the click handler here
        >
          " Start "
        </button>

        <div
          className="absolute flex justify-center items-center h-fit"
          style={{ bottom: "76px", left: "1005px" }}
        >
          <label className="switch">
            <input className="chk" type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Landing;
