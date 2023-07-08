import React from "react";

const Hendrikje = (props) => {
  const {
    setup,
    // index,
    // w,
    // h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  return (
    <path
      d={commonProps.normalize(
        `M${defaultX1},${defaultY1} C${defaultX2} ${defaultY2}, ${Math.pow(
          defaultY1,
          setup.modifier
        )} ${Math.pow(defaultX1, setup.modifier)}, ${defaultY2} ${defaultX2}`
      )}
      {...commonProps}
    />
  );
};

export default Hendrikje;
