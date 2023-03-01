import React from 'react'

const Colintje = (props) => {
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

  // const x3 = defaultX2 + index * 2
  // const y3 = defaultY2 * index * setup.modifier
  return (
    <>
      <circle cx={defaultX1} cy={defaultY1} r={50} {...commonProps} />
      <circle cx={defaultX1} cy={defaultY1 + 20} r={20} {...commonProps} />
    </>
  )
}

export default Colintje
