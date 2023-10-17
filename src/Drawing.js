import React from "react";
import { customKwastjes } from "./kwastjes";

const Drawing = (props) => {
  const { path, setup, mouseX, mouseY, w, h, mapje, isReversed } = props;
  const normalize = (dAttribute) => {
    if (!dAttribute) return null;
    return dAttribute.replace(/undefined|NaN|Infinity/g, "0");
  };
  const processColor = (color) =>
    `${color}${setup.opacity.toString(16).padStart(2, "0")}`;
  const getKwastje = (coords, index) => {
    const isPrevPathFinished = index > 0 && path[index - 1].length > 2;
    // x1 and y1 are starting coordinates
    // Take them either from current position if previous path is finished
    const [x1, y1] = isPrevPathFinished ? coords : path[index - 1] || coords;
    const [x2, y2] =
      setup.kwastje > 1
        ? [mouseX + index * setup.modifier, mouseY + index * setup.modifier]
        : coords;
    const stroke = processColor(setup.fgColor);
    const fill = setup.isShaded ? processColor(setup.bgColor) : "none";
    const style = null;
    const strokeWidth = Math.max(
      (setup.thickness * index * setup.growth) / path.length,
      0.5
    );
    const commonProps = { stroke, strokeWidth, fill, style };

    const kwastjes = Object.values(customKwastjes).map((CustomKwastje) => (
      <CustomKwastje
        {...{
          setup,
          index,
          w,
          h,
          x1,
          x2,
          y1,
          y2,
          commonProps,
          normalize,
          isReversed,
        }}
      />
    ));
    const eyeFill = index % 2 === 0 ? { fill: setup.bgColor } : null;
    const Kwastje = (
      <>
        {kwastjes[setup.kwastje - 1]}
        {setup.hasEyes && index >= setup.dotsCount - 4 && (
          <circle
            className="eyes"
            cx={x1 + (index > setup.dotsCount - 3 ? -index : index)}
            cy={y1}
            r={index % 2 === 0 ? index / 3 : index / 2}
            {...commonProps}
            {...eyeFill}
          />
        )}
      </>
    );
    let KwastjeMetTasje,
      [x, y] = [mouseX, mouseY];
    if (mapje) {
      x += mapje[Math.min(index, mapje.length - 1)][0] - w / 2;
      y += mapje[Math.min(index, mapje.length - 1)][1] - h / 2;
      KwastjeMetTasje = (
        <g
          strokeWidth={setup.thickness}
          stroke={setup.fgColor}
          opacity={setup.opacity / 255}
          className="tasje-outer"
          transform={`translate(${x || 0}, ${y || 0})`}
        >
          {Kwastje}
        </g>
      );
    }
    return <>{mapje ? KwastjeMetTasje : Kwastje}</>;
  };

  return path.map((coords, index) => (
    <React.Fragment key={`kma-${index}`}>
      {getKwastje(coords, index)}
    </React.Fragment>
  ));
};

export default Drawing;
