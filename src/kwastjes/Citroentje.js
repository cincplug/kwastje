import React from "react";

const Citroentje = (props) => {
  const {
    setup,
    index,
    x1,
    y1,
    commonProps,
  } = props;
  
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
      {index >= setup.dotsCount * 2 / 3 ? ",,o,," : ".._.."}
    </text>
  );
};

export default Citroentje;
