import React from "react";
import Blijpje from "./Blijpje";

const Deblijpje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    defaultX1,
    // defaultX2,
    defaultY1,
    // defaultY2,
    commonProps,
  } = props;

  const qG = setup.thickness * setup.growth;
  let tR = qG * Math.max(0, Math.min(setup.dotsCount - index, index));
  const displacementMap = {
    14: [10, -20],
    15: [-20, -20],
    16: [10, -20],
    17: [-20, -20],
  };
  let [deltaX, deltaY] = [0, 0];
  const displacement = displacementMap[setup.dotsCount - index];
  if (displacement) {
    [deltaX, deltaY] = displacement;
    deltaX *= qG;
    deltaY *= qG;
    commonProps.opacity *= 2;
    tR /= 2.5;
  }
  return (
    <>
      {setup.isSimplified && (
        <Blijpje
          {...{
            setup: { ...setup, modifier: 8 },
            index: index + defaultX1 / 10,
            defaultX1: defaultX1 + deltaX * setup.modifier,
            defaultY1: defaultY1 + deltaY * setup.modifier,
            commonProps: { ...commonProps, strokeWidth: setup.thickness / 4 },
            tR,
          }}
        />
      )}
      <Blijpje
        {...{
          setup,
          index,
          defaultX1: defaultX1 + deltaX,
          defaultY1: defaultY1 + deltaY,
          commonProps,
          tR,
        }}
      />
    </>
  );
};

export default Deblijpje;
