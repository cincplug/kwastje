import React from "react";

const Colintje = (props) => {
  const {
    // setup,
    index,
    w,
    // h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  // const x3 = defaultX2 + index * 2
  // const y3 = defaultY2 * index * setup.modifier
  return (
    <>
      <circle
        cx={defaultX1}
        cy={defaultY2}
        r={w / (index + 0.1)}
        {...commonProps}
      />
      <circle
        cx={defaultX2}
        cy={defaultY1 * index}
        r={index}
        {...commonProps}
      />
    </>
  );
};

export default Colintje;
