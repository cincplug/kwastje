import React from "react";

const Raalfje = (props) => {
  const {
    // setup,
    index,
    w,
    h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
    normalize,
  } = props;

  return (
    <path
      d={normalize(
        `M${x1},${y1} L${Math.sin(x2 * index) + w / 2}, ${
          Math.cos(y2 * index) + h / 2
        } L${h - Math.cos(x2) * index + h / 2},${
          (x2 + y2) / 2
        } Q${x2} ${y2}, ${y1} ${x1 / 2} Z`
      )}
      {...commonProps}
    />
  );
};

export default Raalfje;
