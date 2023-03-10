import React from "react";
import { customKwastjes } from "./kwastjes";

const Drawing = (props) => {
  const { path, setup, mouseX, mouseY, w, h, fgColor } = props;
  return path.map((coords, index) => {
    const [defaultX1, defaultY1] =
      index > 0
        ? path[index - 1].length > 2
          ? coords
          : path[index - 1]
        : setup.isCentric
        ? [w / 2, h / 2]
        : coords;
    const [defaultX2, defaultY2] =
      setup.kwastje >= 5
        ? [(mouseX * index) / 100, mouseY + index * setup.modifier]
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
    const BaseKwastje = (
      <line
        x1={defaultX1}
        y1={defaultY1}
        x2={defaultX2}
        y2={defaultY2}
        {...commonProps}
      />
    );
    const defaultKwastjes = [
      <circle
        cx={defaultX1}
        cy={defaultY1}
        r={Math.abs(defaultY2 - defaultX2 / setup.modifier)}
        {...commonProps}
      />,
      <ellipse
        cx={defaultX1}
        cy={defaultY1}
        rx={defaultX2 / setup.modifier / 2}
        ry={defaultY2 / setup.modifier / 2}
        {...commonProps}
      />,
      <polyline
        points={`${defaultX1},${defaultY1} ${defaultX2},${defaultY2} ${defaultY1},${defaultX1} ${defaultY2},${defaultX2}`}
        {...commonProps}
      />,
      <polygon
        points={`${defaultX1},${defaultY1} ${defaultX2},${defaultY2} ${Math.pow(
          defaultY1,
          setup.modifier
        )},${Math.pow(defaultX1, setup.modifier)} ${defaultY2},${defaultX2}`}
        {...commonProps}
      />,
      <path
        d={`M${defaultX1},${defaultY1} L${defaultX2},${defaultY2} M${defaultY1},${defaultX1} L${defaultY2},${defaultX2}`}
        {...commonProps}
      />,
      <path
        d={`M${defaultX1},${defaultY1} L${defaultX2},${defaultY2} M${Math.pow(
          defaultY1,
          setup.modifier
        )},${Math.pow(defaultX1, setup.modifier)} L${defaultY2},${defaultX2}`}
        {...commonProps}
      />,
      <path
        d={`M${defaultX1},${defaultY1} C${defaultX2} ${defaultY2}, ${defaultY1} ${defaultX1}, ${defaultY2} ${defaultX2}`}
        {...commonProps}
      />,
      <path
        d={`M${defaultX1},${defaultY1} C${defaultX2} ${defaultY2}, ${Math.pow(
          defaultY1,
          setup.modifier
        )} ${Math.pow(defaultX1, setup.modifier)}, ${defaultY2} ${defaultX2}`}
        {...commonProps}
      />,
      <path
        d={`M${defaultX1},${defaultY1} Q${defaultX2} ${defaultY2}, ${defaultY1} ${defaultX1} L${defaultY2},${defaultX2}`}
        {...commonProps}
      />,
      <path
        d={`M${defaultX1},${defaultY1} Q${Math.pow(
          defaultY1,
          setup.modifier
        )} ${Math.pow(
          defaultX1,
          setup.modifier
        )}, ${defaultY2} ${defaultX2} L${defaultX2},${defaultY2}`}
        {...commonProps}
      />,
      <polyline
        points={`${defaultX1},${defaultY1} ${
          Math.sin(defaultX1 * index) + w / 2
        },${
          Math.cos(defaultY1) * index + h / 2
        } ${defaultX2},${defaultY2} ${Math.abs(
          Math.sin(defaultX2 * index + w / 2)
        )},${Math.cos(defaultY2) * index + h / 2}`}
        {...commonProps}
      />,
      <polygon
        points={`${defaultX1},${defaultY1} ${
          Math.sin(defaultX1) + w / 2
        },${Math.cos(defaultY1)} ${Math.sin(defaultX2 * index) + w / 2},${
          Math.cos(defaultY2) + h
        } ${defaultX2},${defaultY2}`}
        {...commonProps}
      />,
      <polyline
        points={`${Math.sin(defaultX1 * index) + w / 2},${
          Math.cos(defaultY1) * 3 * index + h
        } ${defaultX1 - defaultY1 / 2},${
          (defaultY1 - defaultX1) / 2
        } ${defaultX2},${defaultY2} ${w / 2},${h / 2} ${
          Math.cos(defaultY2) * index + h / 2
        }`}
        {...commonProps}
      />,
      <polygon
        points={`${Math.sin(defaultX2 * index) + w / 2},${
          Math.cos(defaultY2 * index) + h / 2
        } ${defaultX1},${defaultY1} ${Math.sin(defaultX1) + w / 2},${Math.cos(
          defaultY1 + h / 2
        )} ${defaultX2},${defaultY2}`}
        {...commonProps}
      />,
      <path
        d={`M${Math.sin(defaultX2 * index) + w / 2},${
          Math.cos(defaultY2 * index) + h / 2
        } Q${defaultX2} ${defaultY2}, ${defaultY1} ${defaultX1} L${
          Math.cos(defaultY2) * index + h / 2
        },${defaultX2}`}
        {...commonProps}
      />,
      <path
        d={`M${Math.sin(defaultX2 * index) + w / 2}, ${
          Math.cos(defaultY2 * index) + h / 2
        } L${h - Math.cos(defaultX2) * index + h / 2},${
          (defaultX2 + defaultY2) / 2
        } Q${defaultX2} ${defaultY2}, ${defaultY1} ${defaultX1 / 2}`}
        {...commonProps}
      />,
      <path
        d={`M${Math.cos(defaultY2) * index + h / 2},${defaultX2} L${
          Math.sin(defaultX2 * index) + w * setup.modifier
        },${
          Math.cos(defaultY2 * index) + h / 2
        } Q${defaultX2} ${defaultY2}, ${defaultY1} ${defaultX1 / 2}`}
        {...commonProps}
      />,
      <path
        d={`M${Math.cos(defaultY2) * index + h / 2},${defaultX2} L${w / 2} ,${
          Math.cos(defaultY2 * index) + h / 2
        } Q${Math.sin(defaultX2 * index) + w * setup.modifier} ${
          defaultX1 / 2
        }, ${defaultY2} ${defaultY1}`}
        {...commonProps}
      />,
      <path
        d={`M${Math.cos(defaultY2) * index + h / 2},${defaultY2} L${
          w / index
        },${Math.cos(defaultY2 * index) + h} Q${
          Math.sin(defaultX2 * index) + w * setup.modifier
        } ${defaultX1 / 2}, ${defaultX2} ${defaultY1}`}
        {...commonProps}
      />,
      <path
        d={`M${Math.sin(defaultY2) * index + h / 2},${defaultX2} C${
          w * setup.modifier
        } ,${Math.cos(defaultY2 * index) + (h / 2) * setup.modifier} ${
          Math.cos(defaultX2 * index) + w * setup.modifier
        }, ${Math.cos(defaultY1 * defaultX1)} ${
          Math.sin(defaultX2 * index) + w * setup.modifier
        }, ${Math.sin(defaultX2) - defaultY2 + h}`}
        {...commonProps}
      />,
    ];
    const kwastjes = defaultKwastjes.concat(
      Object.values(customKwastjes).map((CustomKwastje) => (
        <CustomKwastje
          {...{
            setup,
            index,
            w,
            h,
            defaultX1,
            defaultX2,
            defaultY1,
            defaultY2,
            commonProps,
          }}
          key={key}
        />
      ))
    );

    const Kwastje = kwastjes[setup.kwastje - 5] || BaseKwastje;
    return Kwastje;
  });
};

export default Drawing;
