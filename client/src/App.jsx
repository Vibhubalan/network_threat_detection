import React, { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from "axios";

import Landing from './components/Landing';
import Home from './components/Home';
import normal from "./data/normal";
import dos from "./data/dos";
import probing from "./data/probing";
import r2l from "./data/r2l";
import u2r from "./data/u2r";

// List of attacks
const start = { name: "Normal", id: 1, data: normal };
const attacks = [
  { name: "DOS", id: 2, data: dos },
  { name: "PROBING", id: 3, data: probing },
  { name: "R2L", id: 4, data: r2l },
  { name: "U2R", id: 5, data: u2r },
];

const App = () => {


  const [isStart, setIsStart] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [status, setStatus] = useState(null);
  const [currentId, setCurrentId] = useState(0);
  const [activeAttackId, setActiveAttackId] = useState(null);

  const sendRequest = useCallback(
    async ({ attackId, attackData, currentId }) => {
      let randomIndex = -1;
      let selectedData = {};

      try {
        if (attackId === currentId) {
          setCurrentId(1);
          setActiveAttackId(1);

          randomIndex = Math.floor(Math.random() * start?.data.length);
          selectedData = start?.data[randomIndex];
        } else {
          randomIndex = Math.floor(Math.random() * attackData.length);
          selectedData = attackData[randomIndex];
        }
        setTimeout(() => {
          axios
            .post("http://localhost:8080/predict", { features: selectedData })
            .then((response) => {
              setStatus(response.data.result); // Update status based on response
            })
            .catch((error) => {
              console.error("There was an error!", error);
              setStatus("error");
            });
        }, 3000); // Update status based on response
      } catch (error) {
        console.error("Error simulating attack:", error);
      }
    },
    []
  );

  const handleAttackClick = async ({ attackId, attackData }) => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    setCurrentId(attackId);
    setActiveAttackId(attackId);

    if (attackId === 1) {
      setIsStart(true);
    }
    const id = setInterval(() => {
      sendRequest({ attackId: attackId, attackData: attackData, currentId });
    }, 1000);
    setIntervalId(id);
  };

  const handleStop = () => {
    console.log(isStart)
   console.log("first")
      setIsStart(false);
      clearInterval(intervalId);
   
    
  };
  return (
   
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing        
          handleAttackClick={handleAttackClick}  // Passing the function
          start={start}
        />}/>
      <Route path='/home' element={<Home
          handleAttackClick={handleAttackClick}
          attacks={attacks}
          handleStop={handleStop}
          activeAttackId={activeAttackId}
          currentId={currentId}
        />}/>
        {/* <Route path='/about' element={}/> */}
    </Routes>

    
    </BrowserRouter>
      
    
   
  );
};

export default App;
