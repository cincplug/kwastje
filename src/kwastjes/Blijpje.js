import React from "react";

const Blijpje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    defaultX1,
    // defaultX2,
    defaultY1,
    // defaultY2,
    commonProps,
  } = props;

  const quadrantGap = setup.thickness * setup.growth;
  const tickRadius = quadrantGap * index;
  return (
    <path
      transform={`translate(${defaultX1 - tickRadius}, ${
        defaultY1 - tickRadius
      })`}
      d={`M ${
        tickRadius + quadrantGap / 2
      } 0 A ${tickRadius} ${tickRadius} 0 0 1 ${
        tickRadius * setup.modifier * 2
      } ${tickRadius - quadrantGap / 2} M ${tickRadius * 2} ${
        tickRadius + quadrantGap / 2
      } A ${tickRadius} ${tickRadius} 0 0 1 ${
        tickRadius * setup.modifier + quadrantGap / 2
      } ${tickRadius * 2} M ${tickRadius - quadrantGap / 2} ${
        tickRadius * 2
      } A ${tickRadius} ${tickRadius} 0 0 1 0 ${
        tickRadius * setup.modifier + quadrantGap / 2
      } M 0 ${
        tickRadius - quadrantGap / 2
      } A ${tickRadius} ${tickRadius} 0 0 1 ${
        tickRadius * setup.modifier - quadrantGap / 2
      } 0`}
      {...commonProps}
    />
  );
};

export default Blijpje;
