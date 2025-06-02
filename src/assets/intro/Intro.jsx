import React, { useEffect, useState } from "react";

const Intro = ({ onFinish }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true); // Start hiding animation
      setTimeout(() => {
        onFinish(); // After animation done, remove component
      }, 1000); // Match with fade-out animation duration
    }, 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`intro-wrapper ${hide ? "fade-out" : ""}`}>
      <div className="intro-content">
        <h1>Welcome to my <span>Weather App</span></h1>
        <p>— Created by Ankit —</p>
      </div>
    </div>
  );
};

export default Intro;
