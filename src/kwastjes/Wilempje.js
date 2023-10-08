import React from "react";

const Wilempje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    x1,
    // x2,
    y1,
    // y2,
    commonProps,
    normalize,
  } = props;

  const offset = setup.modifier * 10;
  return (
    <path
      d={normalize(
        `M${x1},${y1} ${[...Array(index).keys()].map(
          (step) =>
            `h${offset - step} v${offset / (step - 1) / 2} z m${offset * 3},${
              Math.sin(index) * offset
            }`
        )} Z`
      )}
      {...commonProps}
    />
  );
};

export default Wilempje;
