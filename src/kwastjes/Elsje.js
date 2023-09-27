import React from "react";

const Elsje = (props) => {
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
  } = props;

  // const x3 = x2 + index * 2;
  // const y3 = y2 * setup.modifier;
  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} L${x2},${y2} L${
          x2 * 5
        },${y2 + 500 * setup.modifier} L${x2 - 70},${
          y2 - 500 * setup.modifier
        }`
      )}
      {...commonProps}
    />
  );
};

export default Elsje;
