import React from "react";

const Blijpje = (props) => {
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
  const tR = qG * (index / defaultX1 * defaultY1);
  commonProps.transform = `translate(${defaultX1 - tR}, ${
    defaultY1 - tR
  })`;
  return (
    <>
      <path
        {...commonProps}
        className={`radar__line radar__line--tick-${
          index + 1
        } radar__line--quadrant-1`}
        d={`M ${tR + qG / 2} 0 A ${tR} ${tR} 0 0 1 ${tR * 2} ${tR - qG / 2}`}
      />
      <path
        {...commonProps}
        className={`radar__line radar__line--tick-${
          index + 1
        } radar__line--quadrant-2`}
        d={`M ${tR * 2} ${tR + qG / 2} A ${tR} ${tR} 0 0 1 ${tR + qG / 2} ${
          tR * 2
        }`}
      />
      <path
        {...commonProps}
        className={`radar__line radar__line--tick-${
          index + 1
        } radar__line--quadrant-3`}
        d={`M ${tR - qG / 2} ${tR * 2} A ${tR} ${tR} 0 0 1 0 ${tR + qG / 2}`}
      />
      <path
        {...commonProps}
        className={`radar__line radar__line--tick-${
          index + 1
        } radar__line--quadrant-4`}
        d={`M 0 ${tR - qG / 2} A ${tR} ${tR} 0 0 1 ${tR - qG / 2} 0`}
      />
    </>
  );
};

export default Blijpje;
