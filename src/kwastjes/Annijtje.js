import React from "react";

const Annijtje = (props) => {
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
    normalize,
  } = props;

  return (
    <path
      d={normalize(`M${x1},${x2} C${y1},${y2} ${y1},${x1} ${x2},${y2}`)}
      {...commonProps}
    />
  );
};

export default Annijtje;
