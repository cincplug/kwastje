import React from "react";

const Colintje = (props) => {
  const {
    setup,
    index,
    w,
    x1,
    y1,
    commonProps,
  } = props;

  return (
    <>
      <circle
        cx={x1}
        cy={y1}
        r={w / (index / (setup.modifier + 1))}
        {...commonProps}
      />
    </>
  );
};

export default Colintje;
