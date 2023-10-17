import React from "react";
import Bonnetje from "./Bonnetje";

const Rebonnetje = (props) => {
  const {
    // setup,
    index,
    // w,
    // h,
    // x1,
    // x2,
    // y1,
    // y2,
    // commonProps, normalize,
  } = props;

  const text = index;
  return <Bonnetje {...props} text={text} />;
};

export default Rebonnetje;
