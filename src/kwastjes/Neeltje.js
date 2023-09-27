import React from "react";

const Neeltje = (props) => {
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
          y2 * index + h / 2
        },${x2} L${Math.cos(x2 * index) + w * setup.modifier},${
          Math.sin(y2 * index) + h / 2
        } Q${x2} ${y2}, ${y1} ${x1 / 2}`
      )}
      {...commonProps}
    />
  );
};

export default Neeltje;
