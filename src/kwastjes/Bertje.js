import React from 'react'

const Bertje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    // defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props

  const x3 = defaultX2 * index * 2
  const y3 = defaultY2 * index * setup.modifier
  return (
    <>
      <circle cx={x3} cy={y3} r={defaultY1 * setup.modifier} {...commonProps} />
      <circle cx={x3} cy={defaultY2 / 2} r={defaultY1 * setup.modifier / 2} {...commonProps} fill={`${setup.fgColor}${parseInt(setup.opacity).toString(16)}`} />
      <path d={`M${x3},${y3} L${y3},${x3}`} {...commonProps} />
    </>
  )
}

export default Bertje
