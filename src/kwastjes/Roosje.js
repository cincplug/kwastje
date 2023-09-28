import React from "react";

const Roosje = (props) => {
  const {
    setup,
    index,
    // w,
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
        `M${x1},${y1} c${index * 10},${
          (y2 / x3 + x2) / h
        } ${(x3 * index) / 50},${y3 / 50} ${x2 / 2},${y1} v${-x1}, l${y1 - x1},${index}`
      )}
      {...commonProps}
    />
  );
};

export default Roosje;
