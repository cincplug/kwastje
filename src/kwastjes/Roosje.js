import React from "react";

const Roosje = (props) => {
  const {
    setup,
    index,
    // w,
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
        `M${x1},${y1} L${index * 10},${
          (y2 / x3 + x2 * x3) / h
        } L${(x3 * index) / 100},${y3 / 50} L${x2},${y1} `
      )}
      {...commonProps}
    />
  );
};

export default Roosje;
