import React from "react";

const Citroentje = (props) => {
  const {
    setup,
    index,
    x1,
    y1,
    commonProps,
  } = props;
  
  const dotsCount = setup.tasjeDotsCount || setup.dotsCount;

  return (
    <text
      x={x1}
      y={y1 + 200 * setup.modifier}
      {...commonProps}
      style={{
        fontSize: index * 7 * setup.modifier,
        fontFamily: "serif",
        textAnchor: "middle"
      }}
    >
      {index >= dotsCount - 2 ? ",,o,," : ".._.."}
    </text>
  );
};

export default Citroentje;
