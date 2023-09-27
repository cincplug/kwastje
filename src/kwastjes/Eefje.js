import React from "react";

const Eefje = (props) => {
  const {
    // setup,
    // index,
    // w,
    // h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
  } = props;

  return (
    <polyline
      points={`${x1},${y1} ${x2},${y2} ${y1},${x1} ${y2},${x2}`}
      {...commonProps}
    />
  );
};

export default Eefje;
