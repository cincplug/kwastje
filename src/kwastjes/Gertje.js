import React from "react";

const Gertje = (props) => {
  const {
    // setup,
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
    <path
      d={`M${defaultX1},${defaultY1} C${defaultX2} ${defaultY2}, ${defaultY1} ${defaultX1}, ${defaultY2} ${defaultX2}`}
      {...commonProps}
    />
  );
};

export default Gertje;
