import React from "react";

const Sybje = (props) => {
  const {
    setup,
    index,
    w,
    h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
  } = props;

  const lang = index * setup.modifier;
  const kort = Math.min(index - 20, 1) * setup.modifier;  

  return (
    <path
      d={commonProps.normalize(
        `M${x1 / 2},${y1} l${-kort}${-lang} ${[...Array(10).keys()].map((step) => `l${lang},${-lang} ${index < step ? `m${lang - kort},${lang - kort}` : `h${kort} v${-kort + index}`} v${-lang + index * step / 2}`)} Z`
      )}
      {...commonProps}
    />
  );
};

export default Sybje;
