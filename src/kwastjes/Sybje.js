import React from 'react'

const Sybje = (props) => {
  const {
    setup,
    index,
    // w,
    h,
    defaultX1,
    defaultX2,
    // defaultY1,
    defaultY2,
    commonProps,
  } = props

  const x3 = defaultX2 + index * 2
  const y3 = defaultY2 * index * setup.modifier
  return (
    <path
      d={`M${Math.pow(index, setup.modifier)},${
        (defaultY2 / x3 + defaultX2 * y3) / h
      } L${(x3 * index) / 100},${y3 / 50} L${defaultY2},${defaultX1} `}
      {...commonProps}
    />
  )
}

export default Sybje
