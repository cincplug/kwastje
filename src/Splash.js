import React from "react";
import "./App.scss";

const Splash = (props) => {
  const { toggleRoostertje } = props;
  return (
    <div className="splash">
      <p>
        Welcome to Kwastje — my sixpence to the Cognizant showcase at Dutch
        Design Week 2023, hosted in our Eindhoven office.
      </p>
      <p>
        Usually, front-end development is the final destination of the design.
        But there is also a specific sort of design ideas that emerge{" "}
        <strong>from</strong> the development. Here's one such idea!
      </p>
      <p>
        Move your cursor and follow these creatures, which are fundamentally
        nothing but simple SVG shapes replicated in all sorts of sequences,
        ending with a pair of eyes.
      </p>
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
