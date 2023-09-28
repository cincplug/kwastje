import React from "react";
import Blijpje from "./Blijpje";

const Deblijpje = (props) => {
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

  const dotsCount = setup.aitjeDotsCount || setup.dotsCount;
  const qG = setup.thickness * setup.growth;
  let tR = qG * Math.max(0, Math.min(dotsCount - index, index));
  const displacementMap = {
    14: [10, -20],
    15: [-20, -20],
    16: [10, -20],
    17: [-20, -20],
  };
  let [deltaX, deltaY] = [0, 0];
  const displacement = displacementMap[dotsCount - index];
  if (displacement) {
    [deltaX, deltaY] = displacement;
    deltaX *= qG;
    deltaY *= qG;
    commonProps.opacity *= 2;
    tR /= 2.5;
  }
  return (
    <>
      <Blijpje
        {...{
          setup,
          index,
          x1: x1 + deltaX,
          y1: y1 + deltaY,
          commonProps,
          tR,
        }}
      />
    </>
  );
};

export default Deblijpje;
