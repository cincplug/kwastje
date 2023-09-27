import React from "react";

const Appeltje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    // x1,
    x2,
    y1,
    // y2,
    commonProps,
  } = props;

  const food = `(${
    index % 3 === 0
      ? ".".repeat(Math.round(x2 / 32))
      : "`".repeat(Math.abs(10 - Math.round(x2 / 32)))
  })`;
  // const text = food.slice(Math.min(index, food.length - 1));
  return (
    <text
      {...props}
      x={x2}
      y={y1}
      {...commonProps}
      style={{
        fontSize: (y1 / 2) * setup.modifier,
      }}
    >
      {food}
    </text>
  );
};

export default Appeltje;
