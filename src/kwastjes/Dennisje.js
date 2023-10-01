import React from "react";
const Dennisje = (props) => {
  const {
    setup,
    index,
    // w,
    h,
    // x1,
    x2,
    y1,
    y2,
    commonProps,
    // normalize,
  } = props;
  const x3 = x2 / 2 + index * 2;
  return (
    <circle
      cx={x3 * Math.PI / 2}
      cy={Math.cos(y2 / (index + 0.1)) * Math.PI + h / 2}
      r={Math.abs(random_unit_vector(y1 * setup.modifier) / 5)}
      {...commonProps}
    />
  );
};
export default Dennisje;

function random_unit_vector(a) {
  const theta = Math.random() * a * Math.PI + 1;
  return Math.cos(theta) / Math.sin(theta);
}
