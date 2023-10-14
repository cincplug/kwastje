import React from "react";

const Wilempje = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    x1,
    // x2,
    y1,
    // y2,
    commonProps,
    normalize,
  } = props;

  const arrowHeadHeight = 30;
  const offset = setup.modifier * 30;
  return (
    <path
      d={normalize(
        `M${x1 - setup.eyesOffset / 2},${y1 + setup.eyesOffset * setup.modifier} ${[...Array(4).keys()].map(
          (step) =>
            `l${arrowHeadHeight}, ${-arrowHeadHeight} m0,${arrowHeadHeight * 2
            } l${-arrowHeadHeight + 2}, ${-arrowHeadHeight} h${Math.min(arrowHeadHeight * index, w / 3)} m${offset * 3},${Math.sin(index) * offset * setup.growth}`
        )} Z`
      )}
      {...commonProps}
    />
  );
};

export default Wilempje;
