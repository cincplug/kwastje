import React from "react";

const Bertje = (props) => {
  const {
    setup,
    index,
    x2,
    y1,
    y2,
    commonProps,
    processColor,
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
        fill={processColor(setup.fgColor)}
      />
      <path d={`M${x3},${y3} L${y3},${x3}`} {...commonProps} />
    </>
  );
};

export default Bertje;
