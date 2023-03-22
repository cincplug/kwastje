import React from "react";
const Dennisje = (props) => {
  const {
    setup,
    index,
    // w,
    h,
    // defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;
  const x3 = defaultX2 + index * 2;
  return (
    <circle
      cx={x3 * Math.PI}
      cy={Math.cos(defaultY2 / index) * Math.PI + h / 2}
      r={random_unit_vector(defaultY1 * setup.modifier) / 5}
      {...commonProps}
    />
  );
};
export default Dennisje;

function random_unit_vector(a) {
  const theta = Math.random() * a * Math.PI;
  return Math.cos(theta) / Math.sin(theta);
}
