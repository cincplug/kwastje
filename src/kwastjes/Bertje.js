import React from "react";

const Bertje = (props) => {
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

  return <path d={`M${x1},${y1} L${x2},${y2}`} {...commonProps} />;
};

export default Bertje;
