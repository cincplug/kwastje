import React from "react";

const Marijke = (props) => {
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

  //   const x3 = x2 + index * 2;
  //   const y3 = y2 * index * setup.modifier;
  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} L${x1},${
          y2 * setup.modifier - 300
        } L${x2},${y2 / setup.modifier} l${x2 / 10},${-y2 / 2} v${y2}`
      )}
      {...commonProps}
    />
  );
};

export default Marijke;
