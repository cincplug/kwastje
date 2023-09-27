import React from "react";

const Hylke = (props) => {
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
        `M${x1},${y1} Q${x2} ${y2}, ${y1} ${x1} L${y2},${x2}`
      )}
      {...commonProps}
    />
  );
};

export default Hylke;
