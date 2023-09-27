import React from "react";

const Dirkje = (props) => {
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
    <path
      d={commonProps.normalize(
        `M${x1},${y1} L${x2},${y2} M${y1},${x1} L${y2},${x2}`
      )}
      {...commonProps}
    />
  );
};

export default Dirkje;
