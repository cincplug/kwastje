import React, { useEffect } from "react";

const Timijtje = (props) => {
  const {
    setup,
    index,
    w,
    h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  const x3 = defaultX2 + index * 2;
  const y3 = defaultY2 * index * setup.modifier * Math.random() * 10;

  return (
    <path
      d={`M${defaultX1},${defaultY1} L${
        defaultX1},${defaultX2} L${defaultX1 * y3 * 1000},${x3 * Math.random() * 1}`}
      {...commonProps}
    />
  );
};


export default Timijtje;
