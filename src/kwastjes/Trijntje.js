import React from "react";

const Trijntje = (props) => {
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
    <path
      d={`M${defaultX1},${defaultY1} L${
        Math.cos(defaultY2) * index + h / 2
      },${defaultY2} L${w / (index + 0.1)},${
        Math.cos(defaultY2 * index) + h
      } Q${Math.sin(defaultX2 * index) + w * setup.modifier} ${
        defaultX1 / 2
      }, ${defaultX2} ${defaultY1}`}
      {...commonProps}
    />
  );
};

export default Trijntje;
