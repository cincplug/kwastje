import React from "react";

const Appeltje = (props) => {
  const {
    setup,
    index,
    x2,
    y1,
  } = props;

  const food = `(${
    index % 3 === 0
      ? ".".repeat(Math.round(x2 / 32))
      : "`".repeat(Math.abs(10 - Math.round(x2 / 32)))
  })`;
  return (
    <text
      {...props}
      x={x2}
      y={y1}
      style={{
        fontSize: (y1 / 2) * setup.modifier,
      }}
    >
      {food}
    </text>
  );
};

export default Appeltje;
