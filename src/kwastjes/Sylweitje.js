import React from "react";

const Sylweitje = (props) => {
  const {
    setup,
    index,
    w,
    h,
    defaultX1,
    // defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  // const x3 = defaultX2 + index
  const y3 = (defaultY2 * index * setup.modifier) / 100;
  return (
    <path
      d={`M${defaultX1 - 100},${
        defaultY1 + index
      }  L${defaultX1},${defaultY1} L${w / 2},${y3 + h / 2} L${
        defaultX1 - 100
      },${defaultY1 + index}`}
      {...commonProps}
    />
  );
};

export default Sylweitje;
