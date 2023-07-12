import React from "react";

const Appeltje = (props) => {
  const {
    setup,
    // index,
    // w,
    // h,
    // defaultX1,
    defaultX2,
    defaultY1,
    // defaultY2,
    commonProps,
  } = props;

  const food = `(${":".repeat(Math.round(defaultX2 / 64))})`
  // const text = food.slice(Math.min(index, food.length - 1));
  return (
    <text
    {...props}
    x={defaultX2}
    y={defaultY1}
    {...commonProps}
    style={{
      fontSize: defaultY1 / 2 * setup.modifier,
    }}
    >
      {food}
    </text>
  );
};

export default Appeltje;
