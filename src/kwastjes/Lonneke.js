import React from "react";

const Lonneke = (props) => {
  const {
    setup,
    index,
    w,
    h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  return (
    <polygon
      points={`${defaultX1},${defaultY1} ${
        Math.sin(defaultX1 * index) / setup.modifier
      },${Math.cos(defaultY1)} ${Math.sin(defaultX2 * index) + w / 2},${
        Math.cos(defaultY2) + h
      } ${defaultX2},${defaultY2}`}
      {...commonProps}
    />
  );
};

export default Lonneke;
