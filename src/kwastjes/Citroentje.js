import React from "react";

const Citroentje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    defaultX1,
    defaultX2,
    defaultY1,
    // defaultY2,
    commonProps,
  } = props;

  const food = "ö…".repeat(10);
  return (
    <text
      {...props}
      x={defaultX1}
      y={defaultY1}
      {...commonProps}
      style={{
        fontSize: (defaultY1 / 2) * setup.modifier,
        letterSpacing: defaultX2
      }}
    >
      {food[Math.min(index, food.length - 1)]}
    </text>
  );
};

export default Citroentje;
