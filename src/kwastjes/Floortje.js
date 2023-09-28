import React from "react";

const Floortje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    x1,
    y1,
    commonProps,
  } = props;

  const stepSize = props.stepSize || 10;
  const modifier = setup.modifier - stepSize;

  const angleRadians = (angleDegrees) => (angleDegrees * Math.PI) / 180;

  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} ${[...Array(index).keys()].map(
          (step) =>
            ` l${
              modifier *
              Math.cos(angleRadians(setup.dotsCount - index * stepSize))
            },${step * Math.sin(angleRadians(setup.dotsCount - index))} `
        )}`
      )}
      {...commonProps}
    />
  );
};

export default Floortje;
