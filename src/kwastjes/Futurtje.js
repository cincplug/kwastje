import React from "react";

const Futurtje = (props) => {
  const { setup, index, w, h, x1, y1, x2, y2 } = props;
  const fontSize = Math.min(
    Math.ceil(y1 * index * setup.modifier / 4),
    h * setup.growth
  );
  return (
    <text
      className="future"
      x={Math.ceil((-x1 - w) / Math.max(setup.growth, 1) + setup.modifier * x2)}
      y={(h + (index + y2) * Math.max(1, setup.thickness) - (h - y1) / 2) - setup.modifier * y2 - 100}
      fill={`${
        index % 2 === 0 ? setup.fgColor : setup.bgColor
      }${setup.opacity.toString(16)}`}
      style={{
        fontSize,
      }}
    >
      Future
    </text>
  );
};

export default Futurtje;
