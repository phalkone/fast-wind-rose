import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export default function IntervalLabel (props) {
  let addRadius = 2
  let flag = 1
  let x1Sign = -1
  let x2Sign = 1
  if (props.sector > (90 / props.sectorSize) &&
    props.sector < (270 / props.sectorSize)) {
    addRadius = 10
    flag = 0
    x1Sign = 1
    x2Sign = -1
  }
  const x1 = 130 + x1Sign * ((120 + addRadius) * Math.sin(Math.PI / 20))
  const y1 = 130 - ((120 + addRadius) * Math.cos(Math.PI / 20))
  const x2 = 130 + x2Sign * ((120 + addRadius) * Math.sin(Math.PI / 20))
  const y2 = 130 - ((120 + addRadius) * Math.cos(Math.PI / 20))
  return (
    <>
      <path
        stroke='none'
        id={`curved${props.sector.toString()}`}
        fill='none'
        d={`M ${x1} ${y1} A ${120 + addRadius} ${120 + addRadius}, 0, 0, ${flag}, ${x2} ${y2}`}
        transform={`rotate(${props.sector * props.sectorSize}, 130, 130)`}
      />
      <text
        fill='grey'
        fontFamily='sans-serif'
        fontSize='11px'
        fontWeight='bold'
      >
        <textPath href={`#curved${props.sector.toString()}`}>
          {`${props.interval.toFixed(2)} hr`}
        </textPath>
      </text>
    </>
  )
}

IntervalLabel.propTypes = {
  sector: PropTypes.number,
  interval: PropTypes.number,
  sectorSize: PropTypes.number
}
