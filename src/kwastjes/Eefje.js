import React from "react";
import Aafje from "./Aafje";

const Eefje = (props) => {
  const { setup, x1, y1, commonProps } = props;

  const stepSize = 100;
  const stepCount = 3;
  return (
    <>
      <path
        d={commonProps.normalize(
          `M${x1},${y1} ${[...Array(stepCount).keys()].map(
            (step) =>
              `a${stepSize / setup.growth} ${stepSize / setup.growth} 0 0 1 ${stepSize} ${stepSize}`
          )}`
        )}
        {...commonProps}
      />
      <Aafje {...props} stepCount={3} />
    </>
  );
};

export default Eefje;
