import React from "react";

const Futurtje = (props) => {
  const { index, w, h, x1, y1 } = props;
  const fontSize = y1 * index + h * 2;
  return (
    <text
      className="future"
      x={(-x1 - w) / 2}
      y={h + 3 * (index + 1)}
      fill={`${index % 2 === 0 ? "#2E308E" : "#FFFFFF"}70`}
      style={{
        fontSize,
      }}
    >
      {`FUTURE`}
    </text>
  );
};

export default Futurtje;
