import React from "react";

const Taimurtje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  const x3 = defaultX2 + index * 2;
  const y3 = (defaultY2 * index) / setup.modifier;
  return (
    <path
      d={commonProps.normalize(
        `M${defaultX1},${defaultY1} L${defaultX1 * 21},${defaultY1} L${
          defaultY2 * 41
        },${defaultY2 * Math.sin(index)} L${x3},${y3 * Math.sin(90)}`
      )}
      {...commonProps}
    />
  );
};

export default Taimurtje;
