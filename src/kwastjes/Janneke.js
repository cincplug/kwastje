import React from "react";
import Ineke from "./Ineke";

const Janneke = (props) => {
  const { setup, w, x1, commonProps, normalize } = props;

  const inekeProps = {
    ...props,
    setup: { ...setup, modifier: x1 / w / 2 },
    commonProps: {
      ...commonProps,
      normalize,
      strokeWidth: setup.thickness / 4,
    },
  };
  return (
    <>
      <Ineke {...inekeProps} />
    </>
  );
};

export default Janneke;
