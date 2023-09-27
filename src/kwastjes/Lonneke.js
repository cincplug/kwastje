import React from "react";

const Lonneke = (props) => {
  const {
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
        `M${x1},${y1} C${Math.round(Math.sin(x1 * index) + w / 2)},${Math.round(
          Math.cos(y1 * index) + h / 2
        )} ${x1},${y2} ${Math.round(
          Math.abs(x2 * Math.sqrt(index))
        )},${Math.round(Math.cos(y2 * index + h / 2))}}`
      )}
      {...commonProps}
    />
  );
};

export default Lonneke;
