import React from "react";

const Roosje = (props) => {
  const {
    setup,
    index,
    // w,
    h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  const x3 = defaultX2 + index * 2;
  const y3 = defaultY2 * index * setup.modifier;
  return (
    <path
      d={`M${defaultX1},${defaultY1} L${index * 10},${(defaultY2 / x3 + defaultX2 * x3) / h} L${
        (x3 * index) / 100
      },${y3 / 50} L${defaultX2},${defaultY1} `}
      {...commonProps}
    />
  );
};

export default Roosje;
