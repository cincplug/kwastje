import React from "react";

const Futurtje = (props) => {
  const { setup, index, w, h, x1, y1 } = props;
  const fontSize = Math.min(Math.ceil(y1 * index * setup.modifier), h * setup.growth);
  return (
    <text
      className="future"
      x={Math.ceil((-x1 - w) / Math.max(setup.growth, 1) + setup.modifier * y1)}
      y={h + ((index + 1) * Math.max(1, setup.thickness))}
      fill={`${index % 2 === 0 ? setup.fgColor : "#ffffff"}${setup.opacity.toString(16)}`}
      style={{
        fontSize,
      }}
    >
      {`Future`}
    </text>
  );
};

export default Futurtje;
