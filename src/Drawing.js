import React from "react";
import { customKwastjes } from "./kwastjes";

const Drawing = (props) => {
  const { path, setup, mouseX, mouseY, w, h, fgColor, mapje } = props;
  const normalize = (dAttribute) => {
    return dAttribute.replace(/undefined|NaN|Infinity/g, "0");
  };
  const getKwastje = (defaultCoords, index) => {
    let Aitje,
      coords = defaultCoords;
    const [defaultX1, defaultY1] =
      index > 0
        ? path[index - 1].length > 2
          ? coords
          : path[index - 1]
        : coords;
    const [defaultX2, defaultY2] = setup.isSimplified
      ? [mouseX, mouseY]
      : setup.kwastje > 1
      ? [(mouseX * index) / 100, mouseY + index * setup.modifier]
      : coords;
    const stroke = fgColor;
    const fill = setup.isShaded
      ? `${setup.bgColor}${setup.opacity.toString(16).padStart(2, "0")}`
      : "none";
    const style = null;
    const strokeWidth = Math.max(
      (setup.thickness * index * setup.growth) / path.length,
      0.5
    );
    const key = `shp-${index}`;
    const commonProps = { stroke, strokeWidth, fill, style, key, normalize };

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
        }}
        key={key}
      />
    ));
    const Kwastje = kwastjes[setup.kwastje - 1];
    let KwastjeMetAitje,
      [x, y] = [mouseX, mouseY];
    if (mapje) {
      x += mapje[Math.min(index, mapje.length - 1)][0] * setup.modifier - w / 2;
      y += mapje[Math.min(index, mapje.length - 1)][1] * setup.modifier - h / 2;
      KwastjeMetAitje = (
        <>
          {/* <path
            d={`M0 0, ${mapje
              .slice(0, 30)
              .map((coords) => `L${coords[0] || 0}, ${coords[1] || 0} `)} `}
          /> */}
          <g
            strokeWidth={setup.thickness}
            stroke={setup.fgColor}
            opacity={setup.opacity / 255}
            key={`kma-${index}`}
            className="aitje-outer"
            transform={`
          translate(${x || w / 2}, ${y || h / 2})
          `}
          >
            {Kwastje}
          </g>
        </>
      );
      if (index === 1) {
        Aitje = (
          // <g
          //   transform={`translate(${mouseX }, ${mouseY }) scale(${
          //     (index * setup.growth) / 5
          //   }) rotate(${Math.sin(index) * mouseX})`}
          //   dangerouslySetInnerHTML={{ __html: setup.aitje }}
          // />
          <g
            transform={`translate(${w / 2 - 256}, ${h / 2 - 256})`}
            dangerouslySetInnerHTML={{ __html: setup.aitje }}
          />
        );
      }
    }
    return (
      <>
        {Aitje}
        {mapje && setup.isInfluenced ? KwastjeMetAitje : Kwastje}
      </>
    );
  };

  return path.map((defaultCoords, index) => getKwastje(defaultCoords, index));
};

export default Drawing;
