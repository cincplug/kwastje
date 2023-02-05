import React from "react";

const Marijtje = (props) => {
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
      d={`M${Math.sin(defaultY2) * index + h / 2},${defaultX2} C${
        w * setup.modifier
      } ,${Math.cos(defaultY2 * index) + (h / 2) * setup.modifier} ${
        Math.cos(defaultX2 * index) + w * setup.modifier
      }, ${Math.cos(defaultY1 * defaultX1)} ${
        Math.sin(defaultX2 * index) + w * setup.modifier
      }, ${Math.sin(defaultX2) - defaultY2 + h}`}
      {...commonProps}
    />
  );
};

export default Marijtje;
