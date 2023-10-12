import React from "react";

const Appeltje = (props) => {
  const {
    setup,
    index,
    x2,
    y1,
    commonProps,
  } = props;

  const food = `(${
    index % 3 === 0
      ? ".".repeat(Math.round(x2 / 32))
      : "`".repeat(Math.abs(10 - Math.round(x2 / 32)))
  })`;
  return (
    <text
      {...commonProps}
      x={x2}
      y={y1}
      style={{
        fontSize: (y1 / 2) * setup.modifier,
        fontFamily: "serif",
        transform: "translate(-30vw)",
      }}
    >
      {food}
    </text>
  );
};

export default Appeltje;
