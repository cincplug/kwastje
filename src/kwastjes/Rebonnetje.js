import React from "react";
import Bonnetje from "./Bonnetje";

const Rebonnetje = (props) => {
  const {
    // setup,
    // index,
    // w,
    // h,
    // defaultX1,
    // defaultX2,
    // defaultY1,
    defaultY2,
    // commonProps,
  } = props;

  const text = Math.round(defaultY2 / 5) / 9;
  return <Bonnetje {...props} text={text} />;
};

export default Rebonnetje;
