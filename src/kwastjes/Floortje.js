import React from "react";

const Floortje = (props) => {
  const { setup, index, w, h, x1, y1, commonProps } = props;

  const stepCount = props.stepCount || 10,
    stepSize = props.stepSize || 10;
  const modifier = setup.modifier - stepSize;

  const angleRadians = (angleDegrees) => (angleDegrees * Math.PI) / 180;

  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} ${[...Array(index).keys()].map(
          (step) =>
            ` l0,${step * Math.cos(angleRadians(index))} l${
              step * Math.sin(angleRadians(index))
            },0 `
        )}`
      )}
      {...commonProps}
    />
  );
};

export default Floortje;
