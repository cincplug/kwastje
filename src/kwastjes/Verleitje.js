import React from "react";

const Verleitje = (props) => {
  const {
    // setup,
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
    <polygon
      points={`${x1},${y1} ${
        Math.sin(x2 * index) + w / 2
      },${Math.cos(y2 * index) + h / 2} ${x1},${y1} ${
        Math.sin(x1) + w / 2
      },${Math.cos(y1 + h / 2)} ${x2},${y2}`}
      {...commonProps}
    />
  );
};

export default Verleitje;
