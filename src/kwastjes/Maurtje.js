import React from "react";

const Maurtje = (props) => {
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

  // const x3 = x2 + index / 2;
  // const y3 = y2 * index * setup.modifier / x2;
  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} L${x1},${
          y1 * setup.modifier
        }  L${x1},${x2 * setup.modifier} L${x1},${
          y2 * setup.modifier
        }`
      )}
      {...commonProps}
    />
  );
};

export default Maurtje;
