import React from "react";

const Futurtje = (props) => {
  const { index, w, h, x1, y1 } = props;
  const fontSize = (Math.ceil(y1 * index + h));
  return (
    <text
      className="future"
      x={Math.ceil((-x1 - w) / 2)}
      y={h + (index + 1) * 2}
      fill={`${index % 2 === 0 ? "#2E308E" : "#FFFFFF"}70`}
      style={{
        fontSize,
      }}
    >
      {`Future`}
    </text>
  );
};

export default Futurtje;
