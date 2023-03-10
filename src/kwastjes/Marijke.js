import React from "react";

const Marijke = (props) => {
  const {
    setup,
    // index,
    // w,
    // h,
    defaultX1,
    defaultX2,
    // defaultY1,
    defaultY2,
    commonProps,
  } = props;

  //   const x3 = defaultX2 + index * 2;
  //   const y3 = defaultY2 * index * setup.modifier;
  return (
    <path
      d={`M${defaultX1},${defaultY2 * setup.modifier - 300} L${defaultX2},${
        defaultY2 / setup.modifier
      }`}
      {...commonProps}
    />
  );
};

export default Marijke;
