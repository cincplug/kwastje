import React from "react";
import { customKwastjes } from "./kwastjes";

const Drawing = (props) => {
  const { path, setup, mouseX, mouseY, w, h, fgColor, mapje, isReversed } =
    props;
  const normalize = (dAttribute) => {
    if (!dAttribute) return null;
    return dAttribute.replace(/undefined|NaN|Infinity/g, "0");
  };
  const getKwastje = (defaultCoords, index) => {
    let coords = defaultCoords;
    const [defaultX1, defaultY1] =
      index > 0
        ? path[index - 1].length > 2
          ? coords
          : path[index - 1]
        : coords;
    const [defaultX2, defaultY2] = setup.isSimple
      ? [mouseX, mouseY]
      : setup.kwastje > 1
      ? [(mouseX * index) / 100, mouseY + index * setup.modifier]
      : coords;
    const stroke = fgColor;
    const fill = setup.isShaded
      ? `${setup.bgColor}${(setup.opacity / 2).toString(16).padStart(2, "0")}`
      : "none";
    const style = null;
    const strokeWidth = Math.max(
      (setup.thickness * index * setup.growth) / path.length,
      0.5
    );
    const commonProps = { stroke, strokeWidth, fill, style, normalize };

    const kwastjes = Object.values(customKwastjes).map((CustomKwastje) => (
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
          isReversed,
        }}
      />
    ));
    const Kwastje = kwastjes[setup.kwastje - 1];
    let KwastjeMetAitje,
      [x, y] = [mouseX, mouseY];
    if (mapje) {
      x += mapje[Math.min(index, mapje.length - 1)][0] - w / 2;
      y += mapje[Math.min(index, mapje.length - 1)][1] - h / 2;
      KwastjeMetAitje = (
        <g
          strokeWidth={setup.thickness}
          stroke={setup.fgColor}
          opacity={setup.opacity / 255}
          className="aitje-outer"
          transform={`translate(${x || 0}, ${y || 0})`}
        >
          {Kwastje}
        </g>
      );
    }
    return <>{mapje ? KwastjeMetAitje : Kwastje}</>;
  };

  return path.map((defaultCoords, index) => (
    <React.Fragment key={`kma-${index}`}>
      {getKwastje(defaultCoords, index)}
    </React.Fragment>
  ));
};

export default Drawing;
