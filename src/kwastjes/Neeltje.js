import React from "react";

const Neeltje = (props) => {
  const {
    setup,
    index,
    w,
    h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  return (
    <path
      d={commonProps.normalize(
        `M${defaultX1},${defaultY1} L${
          defaultY2 * index + h / 2
        },${defaultX2} L${Math.cos(defaultX2 * index) + w * setup.modifier},${
          Math.sin(defaultY2 * index) + h / 2
        } Q${defaultX2} ${defaultY2}, ${defaultY1} ${defaultX1 / 2}`
      )}
      {...commonProps}
    />
  );
};

export default Neeltje;
