import React from "react";

const Doetje = (props) => {
  const {
    setup,
    // index,
    // w,
    // h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  return (
    <circle
      cx={defaultX1}
      cy={defaultY1}
      r={Math.abs(defaultY2 - defaultX2 / setup.modifier)}
      {...commonProps}
    />
  );
};

export default Doetje;
