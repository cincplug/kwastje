import React from "react";

const Liesje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    x1,
    // x2,
    y1,
    // y2,
    commonProps,
    normalize,
  } = props;

  // const x3 = x2 + index * 2;
  // const y3 = y2 * index * setup.modifier;
  return (
    <path
      d={normalize(
        `M${x1},${y1} h${x1 - y1 * setup.modifier} v${-y1 / index} Z`
      )}
      {...commonProps}
    />
  );
};

export default Liesje;
