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
  const dotsCount = setup.aitjeDotsCount || setup.dotsCount;

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
      {index >= dotsCount - 2 ? ",,ö,," : ".._.."}
    </text>
  );
};

export default Citroentje;
