import React from "react";

const Ineke = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
    normalize,
  } = props;

  const garmentSize = 10 * setup.modifier;

  return (
    <path
      d={normalize(
        `M${x1},${y1} Q${Math.pow(y1, setup.modifier) / garmentSize} ${
          Math.pow(x1, setup.modifier) / garmentSize
        }, ${y2} ${x2} L${Math.min(w, (x2 * index) / garmentSize)},${y2} v${
          100 - garmentSize * index
        } h${5 * garmentSize} v${-100 + garmentSize * index} h${
          -4 * garmentSize
        }`
      )}
      {...commonProps}
    />
  );
};

export default Ineke;
