import React from "react";

const Bertje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    // x1,
    x2,
    y1,
    y2,
    commonProps,
    // normalize,
  } = props;

  const x3 = x2 * index * 2;
  const y3 = y2 * index * setup.modifier;
  return (
    <>
      <circle cx={x3} cy={y3} r={y1 * setup.modifier} {...commonProps} />
      <circle
        cx={x3}
        cy={y2 / 2}
        r={(y1 * setup.modifier) / 2}
        {...commonProps}
        fill={`${setup.fgColor}${parseInt(setup.opacity).toString(16)}`}
      />
      <path d={`M${x3},${y3} L${y3},${x3}`} {...commonProps} />
    </>
  );
};

export default Bertje;
