import React from "react";
import Ineke from "./Ineke";

const Lonneke = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
  } = props;

  const inekeProps = {...props, setup: {...setup, modifier: x1 / w}, commonProps: {...commonProps, strokeWidth: setup.thickness / 4}};
  return (
    <>
    <Ineke {...inekeProps}/>
    <polygon
      points={`${x1},${y1} ${
        Math.sin(x1 * index) / setup.modifier
      },${Math.cos(y1)} ${Math.sin(x2 * index) + w / 2},${
        Math.cos(y2)
      } ${x2},${y2}`}
      {...commonProps}
      />
      </>
  );
};

export default Lonneke;
