import React from "react";
import Blijpje from "./Blijpje";
import Deblijpje from "./Deblijpje";

const Redeblijpje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  const qG = setup.thickness * setup.growth;
  const tR = qG * index - (defaultX2 + defaultY2) / 3;
  return (
    <>
      {index % 2 === 0 ? (
        <Blijpje
          {...{
            setup,
            index: index - 10,
            defaultX1,
            defaultY1: defaultY1 - 100,
            commonProps,
            tR,
          }}
        />
      ) : (
        <Deblijpje
          {...{
            setup,
            index: (defaultX2 + defaultY2) / 100,
            defaultX1,
            defaultY1,
            commonProps: {...commonProps, strokeWidth: setup.thickness / 4},
            tR,
          }}
        />
      )}
    </>
  );
};

export default Redeblijpje;
