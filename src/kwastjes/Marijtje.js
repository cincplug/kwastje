import React from "react";

const Marijtje = (props) => {
    const {
        setup,
        index,
        w,
        h,
        x1,
        x2,
        y1,
        y2,
        commonProps,
      } = props;

  return (
    <path
      d={`M${Math.sin(y2) * index + h / 2},${x2} C${w * setup.modifier} ,${
        Math.cos(y2 * index) + (h / 2) * setup.modifier
      } ${Math.cos(x2 * index) + w * setup.modifier}, ${Math.cos(y1 * x1)} ${
        Math.sin(x2 * index) + w * setup.modifier
      }, ${Math.sin(x2) - y2 + h}`}
      {...commonProps}
    />
  );
};

export default Marijtje;
