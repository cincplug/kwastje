import React from "react";

const Dirkje = (props) => {
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
        `M${x1},${y1} ${index < 2 ? `L${
          Math.sin(y2) * index + h / 2
        },${x2}` : `h20`} C${w * setup.modifier} ,${
          Math.cos(y2 * index) + (h / 2) * setup.modifier
        } ${Math.cos(x2 * index) + w / 3 * setup.modifier}, ${Math.cos(
          y1 * x1
        )} ${Math.sin(x2 * index) + w / 2 * setup.modifier}, ${
          Math.sin(x2) - y2 + h
        } Z`
      )}
      {...commonProps}
    />
  );
};

export default Dirkje;
