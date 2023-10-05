import React from "react";

const Filters = (props) => {
  const { setup, w, h } = props;
  // Base64-coderen van de SVG-afbeelding
  let encodedSVG, dataUri;
  if (setup.tasje) {
    encodedSVG = btoa(setup.tasje);
    dataUri = `data:image/svg+xml;base64,${encodedSVG}`;
  }
  return (
    <>
      {setup.erode && (
        <filter id="erode-filter">
          <feMorphology operator="erode" radius={setup.erode} />
        </filter>
      )}
      {setup.dilate && (
        <filter id="dilate-filter">
          <feMorphology operator="dilate" radius={setup.dilate} />
        </filter>
      )}
      {setup.blur && (
        <filter id="blur-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation={setup.blur} />
        </filter>
      )}
      {setup.freehand && (
        <>
          <filter id="freehand-filter">
            <feTurbulence
              type="turbulence"
              id="freehand-turbulence"
              numOctaves="2"
              seed="1"
              baseFrequency="0.005"
            ></feTurbulence>
            <feDisplacementMap
              scale={setup.freehand}
              in="SourceGraphic"
            ></feDisplacementMap>
          </filter>
        </>
      )}
      {setup.stencil && (
        <>
          <filter id="stencil-filter">
            {dataUri && setup.stencil && (
              <feImage href={dataUri} x={0} y={0} width={w} height={h} />
            )}
            <feDisplacementMap
              scale={setup.stencil}
              in="SourceGraphic"
            ></feDisplacementMap>
          </filter>
        </>
      )}
    </>
  );
};

export default Filters;
