import React from "react";

const Laurtje = (props) => {
  const {
    // setup,
    // index,
    // w,
    // h,
    x1,
    x2,
    y1,
    // y2,
    commonProps,
  } = props;

  // const x3 = x2 + index * 2;
  // const y3 = y2 * index * setup.modifier;
  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} L${x1 + 30},${y1 - 80} L${
          x1 - 140
        },${y1 + 60} L${x2},${y1}`
      )}
      {...commonProps}
    />
  );
};

export default Laurtje;
