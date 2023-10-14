import React from "react";
// import Blijpje from "./Blijpje";
import Blijpje2 from "./Blijpje2";

const Blijpje4 = (props) => {
  const {
    setup,
    index,
    h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
    normalize,
  } = props;

  const qG = setup.thickness * setup.growth / (index+1);
  const tR = qG * index - (x2 + y2) / 5;
  return (
    <>

        <Blijpje2
          {...{
            setup,
            index,
            x1: x1,
            y1: y1 * index / 2 / setup.growth - h,
            commonProps: {
              ...commonProps,
              strokeWidth: setup.thickness / setup.modifier,
            },
            normalize,
            tR: tR * index,
          }}
        />
    </>
  );
};

export default Blijpje4;
