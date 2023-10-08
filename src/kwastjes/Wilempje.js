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

  const arrowHeadHeight = 20;
  const offset = setup.modifier * 10;
  return (
    <path
      d={normalize(
        `M${x1},${y1} ${[...Array(index).keys()].map(
          (step) =>
            `l${arrowHeadHeight}, ${-arrowHeadHeight} m0,${arrowHeadHeight * 2
            } l${-arrowHeadHeight + 2}, ${-arrowHeadHeight} h${arrowHeadHeight * index / offset} m${offset * 3},${Math.sin(index) * offset * setup.growth}`
        )} Z`
      )}
      {...commonProps}
    />
  );
};

export default Wilempje;
