import React from "react";

const Citroentje = (props) => {
  const {
    setup,
    index,
    x1,
    y1,
    commonProps,
  } = props;
  
  const dotsCount = setup.aitjeDotsCount || setup.dotsCount;

  return (
    <text
      {...props}
      x={x1}
      y={y1}
      {...commonProps}
      style={{
        fontSize: index * 10 * setup.modifier,
      }}
    >
      {index >= dotsCount - 2 ? ",,ö,," : ".._.."}
    </text>
  );
};

export default Citroentje;
