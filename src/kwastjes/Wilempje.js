import React from "react";

const Wilempje = (props) => {
  const {
    setup,
    // index,
    // w,
    // h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
  } = props;

  const offset = setup.modifier * 100;
  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} L${x1 + 30},${y1} L${
          x1 + offset
        },${y1 + offset} ${(x2 * offset) / 10},${
          y2 / offset
        } Z`
      )}
      {...commonProps}
    />
  );
};

export default Wilempje;
