import React from 'react'

const Laurtje = (props) => {
  const {
    // setup,
    // index,
    // w,
    // h,
    defaultX1,
    // defaultX2,
    defaultY1,
    // defaultY2,
    commonProps,
  } = props

  // const x3 = defaultX2 + index * 2;
  // const y3 = defaultY2 * index * setup.modifier;
  return (
    <path
      d={`M${defaultX1},${defaultY1} L${defaultX1 + 30},${defaultY1 - 80} L${
        defaultX1 - 140
      },${defaultY1 + 60} L${defaultX1},${defaultY1}`}
      {...commonProps}
    />
  )
}

export default Laurtje
