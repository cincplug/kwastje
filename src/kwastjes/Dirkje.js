import React from "react";

const Dirkje = (props) => {
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
      d={commonProps.normalize(
        `M${defaultX1},${defaultY1} L${defaultX2},${defaultY2} M${defaultY1},${defaultX1} L${defaultY2},${defaultX2}`
      )}
      {...commonProps}
    />
  );
};

export default Dirkje;
