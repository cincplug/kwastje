import React from "react";
import Blijpje from "./Blijpje";
import Deblijpje from "./Blijpje2";

const Redeblijpje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
  } = props;

  const qG = setup.thickness * setup.growth;
  const tR = qG * index - (x2 + y2) / 3;
  return (
    <>
      {index % 2 === 0 ? (
        <Blijpje
          {...{
            setup,
            index: index - 10,
            x1,
            y1: y1 - 100,
            commonProps,
            tR,
          }}
        />
      ) : (
        <Deblijpje
          {...{
            setup,
            index: (x2 + y2) / 100,
            x1,
            y1,
            commonProps: {...commonProps, strokeWidth: setup.thickness / 4},
            tR,
          }}
        />
      )}
    </>
  );
};

export default Redeblijpje;
