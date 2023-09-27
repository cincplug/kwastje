import React from "react";

const Sybje = (props) => {
  const {
    setup,
    index,
    w,
    h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
  } = props;

  const x3 = x2 + index * 2;
  const y3 = y2 * index * setup.modifier;
  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} L${w},0 L${
          Math.pow(index, setup.modifier) + w / 2
        },${(y2 / x3 + x2 * y3) / h} L${(x3 * index) / 100},${
          y3 / 50
        } L${y2},${x1} `
      )}
      {...commonProps}
    />
  );
};

export default Sybje;
