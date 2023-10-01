import React from "react";

const Verleitje = (props) => {
  const {
    // setup,
    index,
    w,
    h,
    x1,
    // x2,
    y1,
    // y2,
    commonProps,
    normalize,
  } = props;

  return (
    <path
      d={normalize(
        `M${Math.sin(x1 * index) + w / 2},${
          Math.cos(y1 * index) + h / 2
        } L${x1},${y1} L${w},${Math.cos(y1) + h / 2} L0,${h * index - y1}`
      )}
      {...commonProps}
    />
  );
};

export default Verleitje;
