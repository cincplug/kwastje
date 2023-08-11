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

  const qG = setup.modifier * 10;
  const tR = props.tR || (qG * index) / 2;
  return (
    <>
      {[0, 1, 2, 3].map((quadrant) => (
        <path
          {...commonProps}
          transform={`translate(${defaultX1 - tR}, ${defaultY1 - tR}) rotate(${
            quadrant * 90 + index * setup.modifier
          }, ${tR}, ${tR})`}
          className={`radar__line radar__line--tick-${
            index + 1
          } radar__line--quadrant-1`}
          d={commonProps.normalize(
            `M ${tR + qG / 2} 0 A ${tR} ${tR} 0 0 1 ${tR * 2} ${tR - qG / 2}`
          )}
        />
      ))}
    </>
  );
};

export default Blijpje;
