import React from "react";
import splashje from "./img/splashje.svg";
import "./App.scss";

const Splash = (props) => {
  const { toggleRoostertje } = props;
  return (
    <div className="splash">
      <p>
        Welcome to Kwastje — my grain of salt for the Cognizant showcase at
        Dutch Design Week 2023, hosted in our Eindhoven office.
      </p>
      <p>
        Are these shapes just <strong>creations</strong> or they qualify as{" "}
        <strong>creatures</strong>?
      </p>
      <p>Move your cursor around and see for yourself.</p>
      <button
        className="splash__button"
        onClick={() => {
          toggleRoostertje();
        }}
      >
        See the idea
        <img className="splashje" src={splashje} alt="" />
      </button>
    </div>
  );
};

export default Splash;
