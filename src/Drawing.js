import React from "react";
import { customKwastjes } from "./kwastjes";

const Drawing = (props) => {
  const { path, setup, mouseX, mouseY, w, h, fgColor, mapje } = props;
  const getKwastje = (defaultCoords, index) => {
    let Aitje,
      coords = defaultCoords;
    const [defaultX1, defaultY1] =
      index > 0
        ? path[index - 1].length > 2
          ? coords
          : path[index - 1]
        : coords;
    const [defaultX2, defaultY2] =
      setup.kwastje > 1
        ? [(mouseX * index) / 100, mouseY + index * setup.modifier]
        : coords;
    const stroke = fgColor;
    const fill = setup.isFilled ? `${setup.fgColor}12` : "none";
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
    const Kwastje = kwastjes[setup.kwastje - 2] || BaseKwastje;
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
            key={index}
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
        {mapje && setup.isMerged ? KwastjeMetAitje : Kwastje}
      </>
    );
  };

  return path.map((defaultCoords, index) => getKwastje(defaultCoords, index));
};

export default Drawing;
