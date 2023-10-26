import React from "react";
import Blijpje from "./Blijpje";

const Blijpje2 = (props) => {
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

  const qG = setup.thickness * setup.growth;
  let tR = qG * Math.max(0, Math.min( setup.dotsCount - index, index));
  const displacementMap = {
    14: [11, -22],
    15: [-11, -22],
  };
  let [deltaX, deltaY] = [0, 0];
  const displacement = displacementMap[ setup.dotsCount - index];
  if (displacement) {
    [deltaX, deltaY] = displacement;
    deltaX *= qG;
    deltaY *= qG;
  }
  return (
    <>
      <Blijpje
        {...{
          setup,
          index,
          x1: x1 + deltaX,
          y1: y1 + deltaY + tR,
          commonProps,
          normalize,
          tR,
        }}
      />
    </>
  );
};

export default Blijpje2;
