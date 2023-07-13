import React from "react";

const Citroentje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    defaultX1,
    // defaultX2,
    defaultY1,
    // defaultY2,
    commonProps,
  } = props;

  return (
    <text
      {...props}
      x={defaultX1}
      y={defaultY1}
      {...commonProps}
      style={{
        fontSize: index * 10 * setup.modifier,
      }}
    >
      {index % 3 === 0 && index < setup.dotsCount - 10 ? "0" : "ö"}
    </text>
  );
};

export default Citroentje;
