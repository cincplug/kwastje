import React from "react";

const Juultje = (props) => {
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
          Math.cos(defaultY2) * index + h / 2
        },${defaultX2} L${w / 2} ,${Math.cos(defaultY2 * index) + h / 2} Q${
          Math.sin(defaultX2 * index) + w * setup.modifier
        } ${defaultX1 / 2}, ${defaultY2} ${defaultY1}`
      )}
      {...commonProps}
    />
  );
};

export default Juultje;
