import React from "react";

const Colintje = (props) => {
  const {
    // setup,
    index,
    w,
    // h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
  } = props;

  // const x3 = x2 + index * 2
  // const y3 = y2 * index * setup.modifier
  return (
    <>
      <circle
        cx={x1}
        cy={y2}
        r={w / (index + 0.1)}
        {...commonProps}
      />
      <circle
        cx={x2}
        cy={y1 * index}
        r={index}
        {...commonProps}
      />
    </>
  );
};

export default Colintje;
