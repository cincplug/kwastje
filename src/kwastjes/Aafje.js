import React from "react";

const Aafje = (props) => {
  const {
    setup,
    // index,
    // w,
    // h,
    x1,
    y1,
    x2,
    y2,
    commonProps,
  } = props;

  const stepCount = props.stepCount || 5,
    stepSize = props.stepSize || 10;
  const modifier = setup.modifier - stepSize;
  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} ${[...Array(stepCount).keys()].map(
          (step) => `h${stepSize * modifier} v${-stepSize * modifier}`
        )}`
      )}
      {...commonProps}
    />
  );
};

export default Aafje;
