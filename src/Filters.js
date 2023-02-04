import React from "react";

const Filters = (props) => {
  const { setup, h, mouseX, mouseY } = props;
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
      <filter id="displacement-filter">
        {setup.turbulence && (
          <feTurbulence
            type="turbulence"
            baseFrequency={setup.thickness}
            numOctaves={setup.displace}
            result="turbulence-filter"
          />
        )}
        {setup.displace && (
          <feDisplacementMap
            in2="turbulence-filter"
            in="SourceGraphic"
            scale={setup.displace}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        )}
      </filter>
      <filter id="light-filter">
        {setup.specular && (
          <feSpecularLighting
            result="light-filter"
            specularConstant={setup.thickness}
            specularExponent={setup.growth}
            lightingColor={setup.fgColor}
          >
            <fePointLight x={mouseX} y={mouseY} z={setup.specular} />
          </feSpecularLighting>
        )}
        {setup.diffuse && (
          <feDiffuseLighting
            result="light-filter"
            lightingColor={setup.fgColor}
          >
            <feSpotLight
              x={mouseX}
              y={mouseY}
              z={setup.diffuse}
              limitingConeAngle={((mouseY * 1110) / h) * 2}
            />
          </feDiffuseLighting>
        )}
        {setup.composite && (
          <feComposite
            in2="SourceGraphic"
            in="light-filter"
            operator="arithmetic"
            k1="0"
            k2={setup.composite}
            k3="1"
            k4="0"
          />
        )}
      </filter>
      {setup.blur && (
        <filter id="blur-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation={setup.blur} />
        </filter>
      )}
      {setup.convolve && (
        <filter id="convolve-filter">
          <feConvolveMatrix
            kernelMatrix={`${setup.convolve} 0 0
                ${mouseX} 0 0
                0 0 ${setup.convolve}`}
          />
        </filter>
      )}
    </>
  );
};

export default Filters;
