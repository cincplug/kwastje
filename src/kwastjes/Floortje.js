import React from "react";

const Floortje = (props) => {
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
    <polyline
      points={`${x1},${y1} ${
        Math.sin(x1 * index) + w / 2
      },${Math.cos(y1) * 3 * index + h} ${x1 - y1 / 2},${
        (y1 - x1) / 2
      } ${x2},${y2} ${w / 2},${h / 2} ${
        Math.cos(y2) * index + h / 2
      }`}
      {...commonProps}
    />
  );
};

export default Floortje;
