import React from "react";
import "./Kwastje.scss";

const Drawing = (props) => {
  const { path, setup, x, y, w, h, fgColor } = props;
  return path.map((item, index) => {
    const [x2, y2] = setup.kwastje >= 5 ? [(x * index) / 100, y + index] : item;
    const [x1, y1] =
      index > 0
        ? path[index - 1].length > 2
          ? item
          : path[index - 1]
        : setup.isCentric
        ? [w / 2, h / 2]
        : item;
    const stroke = fgColor;
    const fill = setup.isFilled ? `${setup.fgColor}01` : "none";
    const style = null;
    const strokeWidth = Math.max(
      (setup.thickness * index * setup.growth) / path.length,
      0.5
    );
    return (
      <>
        {setup.kwastje === 6 ? (
          <circle
            cx={x1}
            cy={y1}
            r={Math.abs(y2 - x2 / setup.modifier)}
            stroke={stroke}
            fill={fill}
            strokeWidth={strokeWidth}
            key={`c${index}`}
            style={style}
          />
        ) : setup.kwastje === 7 ? (
          <ellipse
            cx={x1}
            cy={y1}
            rx={x2 / setup.modifier / 2}
            ry={y2 / setup.modifier / 2}
            stroke={stroke}
            fill={fill}
            strokeWidth={strokeWidth}
            key={`e${index}`}
            style={style}
          />
        ) : setup.kwastje === 8 ? (
          <polyline
            points={`${x1},${y1} ${x2},${y2} ${y1},${x1} ${y2},${x2}`}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill={fill}
            key={`pl${index}`}
            style={style}
          />
        ) : setup.kwastje === 9 ? (
          <polygon
            points={`${x1},${y1} ${x2},${y2} ${Math.pow(
              y1,
              setup.modifier
            )},${Math.pow(x1, setup.modifier)} ${y2},${x2}`}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill={fill}
            key={`pg${index}`}
            style={style}
          />
        ) : setup.kwastje === 10 ? (
          <path
            d={`M${x1},${y1} L${x2},${y2} M${y1},${x1} L${y2},${x2}`}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill={fill}
            key={`pl${index}`}
            style={style}
          />
        ) : setup.kwastje === 11 ? (
          <path
            d={`M${x1},${y1} L${x2},${y2} M${Math.pow(
              y1,
              setup.modifier
            )},${Math.pow(x1, setup.modifier)} L${y2},${x2}`}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill={fill}
            key={`pg${index}`}
            style={style}
          />
        ) : setup.kwastje === 12 ? (
          <path
            d={`M${x1},${y1} C${x2} ${y2}, ${y1} ${x1}, ${y2} ${x2}`}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill={fill}
            key={`pl${index}`}
            style={style}
          />
        ) : setup.kwastje === 13 ? (
          <path
            d={`M${x1},${y1} C${x2} ${y2}, ${Math.pow(
              y1,
              setup.modifier
            )} ${Math.pow(x1, setup.modifier)}, ${y2} ${x2}`}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill={fill}
            key={`pg${index}`}
            style={style}
          />
        ) : setup.kwastje === 14 ? (
          <path
            d={`M${x1},${y1} Q${x2} ${y2}, ${y1} ${x1} L${y2},${x2}`}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill={fill}
            key={`pl${index}`}
            style={style}
          />
        ) : setup.kwastje === 15 ? (
          <path
            d={`M${x1},${y1} Q${Math.pow(y1, setup.modifier)} ${Math.pow(
              x1,
              setup.modifier
            )}, ${y2} ${x2} L${x2},${y2}`}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill={fill}
            key={`pg${index}`}
            style={style}
          />
        ) : (
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeWidth={strokeWidth}
            stroke={stroke}
            key={`l${index}`}
          />
        )}
      </>
    );
  });
};

export default Drawing;
