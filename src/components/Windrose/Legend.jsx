import React, { Fragment } from 'react'
import colors from './Colors'

function Unit () {
  return (
    <text
      x='295'
      y='25'
      fontWeight='bold'
      fill='grey'
      fontFamily='sans-serif'
    >kts
    </text>
  )
}

function Scale () {
  return (
    Object.keys(colors).map(speed => (
      <Fragment key={speed}>
        <rect
          x='270'
          y={220 - ((speed / 5) * 20)}
          width='20'
          height='20'
          stroke='grey'
          strokeWidth='1'
          fill={colors[speed]}
        />
        <text
          x='295'
          y={245 - ((speed / 5) * 20)}
          fontWeight='bold'
          fill='grey'
          fontFamily='sans-serif'
        >{speed === '50' ? '50<' : speed}
        </text>
      </Fragment>
    ))
  )
}

export default function Legend () {
  return (
    <>
      <Scale />
      <Unit />
    </>
  )
}
