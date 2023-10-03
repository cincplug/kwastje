import React from "react";

const Futurtje = (props) => {
  const { setup, index, w, h, x1, y1 } = props;
  const fontSize = Math.ceil((y1 * index + h) / 3);
  return (
    <text
      className="future"
      x={Math.ceil((-x1 - w) / 2 + setup.modifier * (x1 + w) / 2)}
      y={h + (index + 1) * 2}
      fill={`${index % 2 === 0 ? "#2E308E" : "#FFFFFF"}90`}
      style={{
        fontSize,
      }}
    >
      {`Future`}
    </text>
  );
};

export default Futurtje;
