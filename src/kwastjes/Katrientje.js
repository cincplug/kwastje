import React from "react";

const Katrientje = (props) => {
  const {
    setup,
    index,
    w,
    h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
  } = props;

  const x3 = x2 + index * 2;
  const y3 = y2 * index * setup.modifier;
  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} L${x2},${y2} L${x3},${
          w / 2 + x1
        } L${w / 2},${Math.min(h, y3 * x2)}`
      )}
      {...commonProps}
    />
  );
};

export default Katrientje;
