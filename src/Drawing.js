import React from "react";
import { customKwastjes } from "./kwastjes";

const Drawing = (props) => {
  const { path, setup, mouseX, mouseY, w, h, fgColor } = props;
  return path.map((coords, index) => {
    const [x2, y2] =
      setup.kwastje >= 5 ? [(mouseX * index) / 100, mouseY + index] : coords;
    const [x1, y1] =
      index > 0
        ? path[index - 1].length > 2
          ? coords
          : path[index - 1]
        : setup.isCentric
        ? [w / 2, h / 2]
        : coords;
    const stroke = fgColor;
    const fill = setup.isFilled ? `${setup.fgColor}01` : "none";
    const style = null;
    const strokeWidth = Math.max(
      (setup.thickness * index * setup.growth) / path.length,
      0.5
    );
    const key = `shp-${index}`;
    const commonProps = { stroke, strokeWidth, fill, style, key };
    const kwastjes = [
      <circle
        cx={x1}
        cy={y1}
        r={Math.abs(y2 - x2 / setup.modifier)}
        {...commonProps}
      />,
      <ellipse
        cx={x1}
        cy={y1}
        rx={x2 / setup.modifier / 2}
        ry={y2 / setup.modifier / 2}
        {...commonProps}
      />,
      <polyline
        points={`${x1},${y1} ${x2},${y2} ${y1},${x1} ${y2},${x2}`}
        {...commonProps}
      />,
      <polygon
        points={`${x1},${y1} ${x2},${y2} ${Math.pow(
          y1,
          setup.modifier
        )},${Math.pow(x1, setup.modifier)} ${y2},${x2}`}
        {...commonProps}
      />,
      <path
        d={`M${x1},${y1} L${x2},${y2} M${y1},${x1} L${y2},${x2}`}
        {...commonProps}
      />,
      <path
        d={`M${x1},${y1} L${x2},${y2} M${Math.pow(
          y1,
          setup.modifier
        )},${Math.pow(x1, setup.modifier)} L${y2},${x2}`}
        {...commonProps}
      />,
      <path
        d={`M${x1},${y1} C${x2} ${y2}, ${y1} ${x1}, ${y2} ${x2}`}
        {...commonProps}
      />,
      <path
        d={`M${x1},${y1} C${x2} ${y2}, ${Math.pow(
          y1,
          setup.modifier
        )} ${Math.pow(x1, setup.modifier)}, ${y2} ${x2}`}
        {...commonProps}
      />,
      <path
        d={`M${x1},${y1} Q${x2} ${y2}, ${y1} ${x1} L${y2},${x2}`}
        {...commonProps}
      />,
      <path
        d={`M${x1},${y1} Q${Math.pow(y1, setup.modifier)} ${Math.pow(
          x1,
          setup.modifier
        )}, ${y2} ${x2} L${x2},${y2}`}
        {...commonProps}
      />,
      <polyline
        points={`${x1},${y1} ${Math.sin(x1 * index) + w / 2},${
          Math.cos(y1) * index + h / 2
        } ${x2},${y2} ${Math.abs(Math.sin(x2 * index + w / 2))},${
          Math.cos(y2) * index + h / 2
        }`}
        {...commonProps}
      />,
      <polygon
        points={`${x1},${y1} ${Math.sin(x1) + w / 2},${Math.cos(y1)} ${
          Math.sin(x2 * index) + w / 2
        },${Math.cos(y2) + h} ${x2},${y2}`}
        {...commonProps}
      />,
      <polyline
        points={`${Math.sin(x1 * index) + w / 2},${
          Math.cos(y1) * 3 * index + h
        } ${x1 - y1 / 2},${(y1 - x1) / 2} ${x2},${y2} ${w / 2},${h / 2} ${
          Math.cos(y2) * index + h / 2
        }`}
        {...commonProps}
      />,
      <polygon
        points={`${Math.sin(x2 * index) + w / 2},${
          Math.cos(y2 * index) + h / 2
        } ${x1},${y1} ${Math.sin(x1) + w / 2},${Math.cos(
          y1 + h / 2
        )} ${x2},${y2}`}
        {...commonProps}
      />,
      <path
        d={`M${Math.sin(x2 * index) + w / 2},${
          Math.cos(y2 * index) + h / 2
        } Q${x2} ${y2}, ${y1} ${x1} L${Math.cos(y2) * index + h / 2},${x2}`}
        {...commonProps}
      />,
      <path
        d={`M${Math.sin(x2 * index) + w / 2}, ${
          Math.cos(y2 * index) + h / 2
        } L${h - Math.cos(x2) * index + h / 2},${
          (x2 + y2) / 2
        } Q${x2} ${y2}, ${y1} ${x1 / 2}`}
        {...commonProps}
      />,
      <path
        d={`M${Math.cos(y2) * index + h / 2},${x2} L${
          Math.sin(x2 * index) + w * setup.modifier
        },${Math.cos(y2 * index) + h / 2} Q${x2} ${y2}, ${y1} ${x1 / 2}`}
        {...commonProps}
      />,
      <path
        d={`M${Math.cos(y2) * index + h / 2},${x2} L${w / 2} ,${
          Math.cos(y2 * index) + h / 2
        } Q${Math.sin(x2 * index) + w * setup.modifier} ${x1 / 2}, ${y2} ${y1}`}
        {...commonProps}
      />,
      <path
        d={`M${Math.cos(y2) * index + h / 2},${y2} L${w / index},${
          Math.cos(y2 * index) + h
        } Q${Math.sin(x2 * index) + w * setup.modifier} ${x1 / 2}, ${x2} ${y1}`}
        {...commonProps}
      />,
      <path
        d={`M${Math.sin(y2) * index + h / 2},${x2} C${w * setup.modifier} ,${
          Math.cos(y2 * index) + (h / 2) * setup.modifier
        } ${Math.cos(x2 * index) + w * setup.modifier}, ${Math.cos(y1 * x1)} ${
          Math.sin(x2 * index) + w * setup.modifier
        }, ${Math.sin(x2) - y2 + h}`}
        {...commonProps}
      />,
    ].concat(
      customKwastjes.map((CustomKwastje) => (
        <CustomKwastje
          {...{ x1, x2, y1, y2, index, w, h, commonProps }}
          key={key}
        />
      ))
    );

    const Kwastje = kwastjes[setup.kwastje - 5] || (
      <line x1={x1} y1={y1} x2={x2} y2={y2} {...commonProps} />
    );
    return Kwastje;
  });
};

export default Drawing;
