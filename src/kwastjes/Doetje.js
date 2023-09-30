import React from "react";

const Doetje = (props) => {
  const {
    setup,
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
    <circle
      cx={x1}
      cy={y1}
      r={Math.abs(y2 - x2 / setup.modifier)}
      {...commonProps}
    />
  );
};

export default Doetje;
