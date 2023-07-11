import React from "react";

const Bonnetje = (props) => {
  const {
    setup,
    // index,
    // w,
    // h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  // const x3 = defaultX2 + index / 2;
  // const y3 = defaultY2 * index * setup.modifier / defaultX2;
  return (
    <text
      {...commonProps}
      x={defaultX1}
      y={defaultY1}
      style={{ fontSize: defaultY1 * setup.modifier, transform: `rotate(${90 - defaultX2}deg)`, fill: setup.fgColor, opacity: setup.opacity / 100 / 3 }}
    >
      {Math.round(defaultY2 / 10) / 10}
    </text>
  );
};

export default Bonnetje;
