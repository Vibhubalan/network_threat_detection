import React, { useState, useEffect } from "react";
import { Dot } from "react-animated-dots";
import { GoDotFill } from "react-icons/go";
import { Line } from "react-chartjs-2";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import bg from "../assets/attackerrr.svg";
import model from "../assets/catch.svg";
import bgg from "../assets/bggggg.svg";
import band from "../assets/Rectangle.svg";
import devil from "../assets/Realdevil.svg";
import simfont from "../assets/SIMULATION.svg";
import attackfont from "../assets/ATTACK.svg";
import goodf from "../assets/goodf.svg";
import badf from "../assets/badf.svg";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = ({
  currentId,
  attacks,
  activeAttackId,
  handleAttackClick,
  handleStop,
}) => {
  const [attackDetails, setAttackDetails] = useState(null);
  const [attackCount, setAttackCount] = useState(0);
  const [chartData, setChartData] = useState(new Array(10).fill(0));
  const [chartLabels, setChartLabels] = useState(
    Array.from({ length: 10 }, (_, i) => i + 1)
  );
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);

  const navigate = useNavigate();

  const playBeepSound = () => {
    const beep = new Audio("../assets/beep.mp3");
    beep.play();
  };

  useEffect(() => {
    if (activeAttackId) {
      setTimeout(() => {
        const activeAttack = attacks.find((a) => a.id === activeAttackId);
        setAttackDetails(activeAttack);
        setAttackCount((prev) => prev + 1);
      }, 3000);
    }
  }, [activeAttackId, attacks]);

  useEffect(() => {
    if (attackCount > 7 && attackCount < 10) {
      fetch(`http://localhost:5000/send_email/${attackCount}`, {
        method: "POST",
      }).then((response) => {
        if (response.ok) {
          console.log("Warning email sent");
        }
      });
      playBeepSound();
    } else if (attackCount >= 10) {
      fetch(`http://localhost:5000/send_email/${attackCount}`, {
        method: "POST",
      }).then((response) => {
        if (response.ok) {
          console.log("Very critical email sent");
        }
      });
      playBeepSound();
    }
  }, [attackCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newData = [...prevData];
        newData.shift();
        newData.push(activeAttackId ? Math.random() * 15 + 25 : 0);
        return newData;
      });

      // Simulate CPU, Memory, Disk usage (can be replaced with actual APIs)
      setCpuUsage(Math.random() * 50 + 20); // Random between 20% and 70%
      setMemoryUsage(Math.random() * 50 + 30); // Random between 30% and 80%
      setDiskUsage(Math.random() * 40 + 40); // Random between 40% and 80%
    }, 1000);

    return () => clearInterval(interval);
  }, [activeAttackId]);

  const handleAttackButtonClick = (attackId, attackData) => {
    playBeepSound();
    handleAttackClick({
      attackId,
      attackData,
    });
  };

  return (
    <div
      className="bg-center h-screen justify-center"
      style={{
        backgroundImage: `url(${bgg})`,
      }}
    >
      {/* System Monitoring Widgets */}
      <div className="absolute top-16 right-8 flex flex-row space-x-4 items-center">
        <div className="w-20 h-20">
          <CircularProgressbar
            value={cpuUsage}
            maxValue={100}
            text={`${Math.round(cpuUsage)}%`}
            styles={{
              path: { stroke: "#FF6347" },
              trail: { stroke: "#d6d6d6" },
              text: { fill: "#FF6347", fontSize: "16px", fontWeight: "bold" },
            }}
          />
          <p className="text-white text-xs mt-2">CPU Usage</p>
        </div>
        <div className="w-20 h-20">
          <CircularProgressbar
            value={memoryUsage}
            maxValue={100}
            text={`${Math.round(memoryUsage)}%`}
            styles={{
              path: { stroke: "#32CD32" },
              trail: { stroke: "#d6d6d6" },
              text: { fill: "#32CD32", fontSize: "16px", fontWeight: "bold" },
            }}
          />
          <p className="text-white text-xs mt-2">Memory Usage</p>
        </div>
        <div className="w-20 h-20">
          <CircularProgressbar
            value={diskUsage}
            maxValue={100}
            text={`${Math.round(diskUsage)}%`}
            styles={{
              path: { stroke: "#1E90FF" },
              trail: { stroke: "#d6d6d6" },
              text: { fill: "#1E90FF", fontSize: "16px", fontWeight: "bold" },
            }}
          />
          <p className="text-white text-xs mt-2">Disk Usage</p>
        </div>
      </div>

      <div className="moving">
        {currentId === 1 ? (
          <img src={goodf} className="goodfile absolute size-20 moving-box" />
        ) : (
          <img src={badf} className="badfile absolute size-20 moving-box" />
        )}
      </div>

      <img src={band} className="absolute h-full px-48" />
      <img
        src={simfont}
        className="absolute h-10 transform -translate-x-1/2 left-1/2"
        style={{ top: "90px" }}
      />
      <img
        src={attackfont}
        className="absolute h-8 transform -translate-x-1/2 left-1/2"
        style={{ top: "50px" }}
      />
      <div className="relative flex items-center justify-between py-20 px-20">
        <div className="w-1/4 relative">
          <img src={bg} alt="Vending Machine" className="w-full h-auto" />
          <img
            src={devil}
            className="absolute h-32 inset-0 flex items-center justify-center animate-pulse"
            style={{ top: "495px", left: "166px" }}
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ top: "-95px" }}
          >
            {attacks.map((attack) => (
              <button
                key={attack.id}
                className={`font-button w-1/2 font-bold font-Mont text-white py-3 px-10 m-2 rounded 
                    ${activeAttackId === attack.id ? "bg-red1" : "bg-pblue hover:bg-lblue active:bg-lblue"}`}
                onClick={() => handleAttackButtonClick(attack.id, attack?.data)}
              >
                {attack.name}
              </button>
            ))}
          </div>
        </div>

        <Dot>
          <GoDotFill fontSize={25} />
        </Dot>

        <div className="card">
          <div className="bg"></div>
          <div className="blob"></div>
          {attackDetails ? (
            <div className="text-center text-white font-bold text-xl">
              <p>Current Attack: {attackDetails?.name || "Unknown"}</p>
              <p>{attackDetails?.data?.description || ""}</p>
              <p>
                Attack Count: {attackCount}{" "}
                {attackCount > 3 && (
                  <span className="text-red-500"> - Critical</span>
                )}
              </p>
            </div>
          ) : (
            <div className="text-center text-white font-bold text-xl">
              <p>Normal Packets</p>
            </div>
          )}
        </div>
      </div>

      {/* Live Packet Monitoring Section */}
      <div
        className="absolute bottom-0 w-full flex justify-center p-8"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <div style={{ width: "80%", height: "300px" }}>
          <Line
            data={{
              labels: chartLabels,
              datasets: [
                {
                  label: "Live Packet Monitoring",
                  data: chartData,
                  fill: true,
                  backgroundColor: "rgba(0, 128, 255, 0.1)",
                  borderColor: "rgba(0, 128, 255, 1)",
                  borderWidth: 2,
                  tension: 0,
                  pointStyle: "circle",
                  pointRadius: 3,
                  pointHoverRadius: 6,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: "Network Traffic Monitoring",
                  font: {
                    size: 18,
                    family: "Arial",
                  },
                  color: "white",
                },
                legend: {
                  labels: {
                    color: "white",
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Time (seconds)",
                    color: "white",
                    font: {
                      size: 14,
                      family: "Arial",
                    },
                  },
                  ticks: {
                    color: "white",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Packet Count",
                    color: "white",
                    font: {
                      size: 14,
                      family: "Arial",
                    },
                  },
                  ticks: {
                    color: "white",
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
