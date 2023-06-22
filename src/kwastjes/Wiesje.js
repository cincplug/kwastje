import React from "react";

const Wiesje = (props) => {
  const {
    // setup,
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
    <path
      d={`M${defaultX1},${defaultY1} L${Math.sin(defaultX2 * index) + w / 2},${
        Math.cos(defaultY2 * index) + h / 2
      } Q${defaultX2} ${defaultY2}, ${defaultY1} ${defaultX1} L${
        Math.cos(defaultY2) * index + h / 2
      },${defaultX2}`}
      {...commonProps}
    />
  );
};

export default Wiesje;
