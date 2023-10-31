import React from "react";
import "./App.scss";

const Splash = (props) => {
  const { toggleRoostertje } = props;
  return (
    <div className="splash">
      <p>
        Welcome to Kwastje — my grain of salt for the Cognizant showcase at
        Dutch Design Week 2023, hosted in our Eindhoven office.
      </p>
      <p>Are these interactive shapes <strong>creatures</strong> or just <strong>creations</strong>?</p>
      <p>Move your cursor around and see for yourself.</p>
      <button
        className="splash__button"
        onClick={() => {
          toggleRoostertje();
        }}
      >
        Start the idea
      </button>
    </div>
  );
};

export default Splash;
