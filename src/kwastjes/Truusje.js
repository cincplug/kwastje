import React from "react";

const Truusje = (props) => {
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
  } = props;

  const offset = setup.modifier - index;
  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1}  ${[...Array(index).keys()].map(
          (step) =>
            `h${offset - step} v${offset / (step + 1)} m${offset * 3},${
              Math.sin(index) * offset
            } h${-offset + step * 2}, v${-offset + step * 2}`
        )}`
      )}
      {...commonProps}
    />
  );
};

export default Truusje;
