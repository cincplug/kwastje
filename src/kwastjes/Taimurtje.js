import React from "react";

const Taimurtje = (props) => {
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
    normalize,
  } = props;

  const x3 = x2 + index * 2;
  const y3 = (y2 * index) / setup.modifier;
  return (
    <path
      d={normalize(
        `M${x1},${y1} L${x1 * 21},${y1} L${y2 * 41},${
          y2 * Math.sin(index)
        } L${x3},${y3 * Math.sin(90)}`
      )}
      {...commonProps}
    />
  );
};

export default Taimurtje;
