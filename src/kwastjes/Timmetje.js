import React from "react";

const Timmetje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
  } = props;

  const x3 = x2 + index * 2;
  const y3 = y2 * index * setup.modifier * Math.random() * 10;

  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} L${x1},${x2} L${
          x1 * y3 * 1000
        },${x3 * Math.random() * 1}`
      )}
      {...commonProps}
    />
  );
};

export default Timmetje;
