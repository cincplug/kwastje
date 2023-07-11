import React from "react";
import Ineke from "./Ineke";

const Lonneke = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  const inekeProps = {...props, setup: {...setup, modifier: defaultX1 / w}, commonProps: {...commonProps, strokeWidth: setup.thickness / 4}};
  return (
    <>
    <Ineke {...inekeProps}/>
    <polygon
      points={`${defaultX1},${defaultY1} ${
        Math.sin(defaultX1 * index) / setup.modifier
      },${Math.cos(defaultY1)} ${Math.sin(defaultX2 * index) + w / 2},${
        Math.cos(defaultY2)
      } ${defaultX2},${defaultY2}`}
      {...commonProps}
      />
      </>
  );
};

export default Lonneke;
