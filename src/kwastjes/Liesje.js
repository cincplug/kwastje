import React from "react";

const Liesje = (props) => {
  const {
    setup,
    // index,
    // w,
    // h,
    x1,
    // x2,
    y1,
    // y2,
    commonProps,
  } = props;

  // const x3 = x2 + index * 2;
  // const y3 = y2 * index * setup.modifier;
  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} L${x1 * 3},${y1 / 8} L${
          x1 * setup.modifier
        },${-y1 * 2} L${x1},${y1}`
      )}
      {...commonProps}
    />
  );
};

export default Liesje;
