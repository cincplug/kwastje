import React from "react";

const Truusje = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    x1,
    // x2,
    y1,
    // y2,
    commonProps,
    normalize,
  } = props;

  const offset = setup.modifier - index;
  return (
    <path
      d={normalize(
        `M${x1 + setup.eyesOffset * setup.modifier},${
          y1 + setup.eyesOffset * 3
        }  ${[...Array(Math.ceil(x1 * 3 / w)).keys()].map(
          (step) =>
            ` ${
              index <= step
                ? `l${offset - step},${offset - step}`
                : `h${offset} m${offset},0 h${offset} m${
                    -offset * 1.5
                  },${offset} v${offset * 3} m${
                    -offset * 2
                  },${-offset} a${offset},${offset} 0 1 0 ${
                    2 * offset
                  },0 a${offset},${offset} 0 1 0 ${2 * offset},0 `
            } m${offset * 3},${Math.sin(index) * offset} h${
              -offset + step * 2
            }, v${-offset + step * 2}`
        )}`
      )}
      {...commonProps}
    />
  );
};

export default Truusje;
