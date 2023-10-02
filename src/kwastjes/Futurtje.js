import React from "react";

const Futurtje = (props) => {
  const {
    index,
    w,
    h,
    x1,
    y1,
  } = props;

  return (
    <text className="future"
      x={(-x1 - w) / 2}
      y={h}
      fill={`${index % 2
         === 0 ? "#2E308E" : "#FFFFFF"}70`}
      stroke="none"
      style={{
        fontSize: y1 / 2 * index,
      }}
    >
      future
    </text>
  );
};

export default Futurtje;
