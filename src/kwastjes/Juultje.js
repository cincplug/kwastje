import React from "react";

const Juultje = (props) => {
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

  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} L${
          Math.sqrt(y2) * index + h / 2
        },${x2} L${w / 2} ,${Math.sqrt(y2 * index) + h / 2} Q${
          Math.pow(x2, 1 / index) * setup.modifier
        } ${x1 / 2}, ${y2} ${y1} Z`
      )}
      {...commonProps}
    />
  );
};

export default Juultje;
