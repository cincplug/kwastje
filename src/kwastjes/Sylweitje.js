import React from "react";

const Sylweitje = (props) => {
  const {
    setup,
    index,
    w,
    h,
    x1,
    // x2,
    y1,
    y2,
    commonProps,
  } = props;

  // const x3 = x2 + index
  const y3 = (y2 * index * setup.modifier) / 100;
  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} L${x1 - 100},${
          y1 + index
        }  L${x1},${y1} L${w / 2},${y3 + h / 2} L${
          x1 - 100
        },${y1 + index} Z`
      )}
      {...commonProps}
    />
  );
};

export default Sylweitje;
