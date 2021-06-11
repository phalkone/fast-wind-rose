import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export default function IntervalLabel (props) {
  let radius = props.radius + 2
  const sin = Math.sin(Math.PI / 180 * ((props.sectorSize - 2) / 2))
  const cos = Math.cos(Math.PI / 180 * ((props.sectorSize - 2) / 2))
  let sign = 1
  if (props.sector > (90 / props.sectorSize) &&
    props.sector < (270 / props.sectorSize)) {
    radius += 8
    sign = -1
  }
  const x1 = props.center - sign * radius * sin
  const y1 = props.center - radius * cos
  const x2 = props.center + sign * radius * sin
  const y2 = props.center - radius * cos

  return (
    <>
      <path
        id={`curved${props.sector}`}
        fill='none'
        d={`M ${x1} ${y1} A ${radius} ${radius},` +
           ` 0, 0, ${sign === 1 ? 1 : 0}, ${x2} ${y2}`}
        transform={`rotate(${props.sector * props.sectorSize},` +
                   ` ${props.center}, ${props.center})`}
      />
      <text
        fill='black'
        textAnchor='middle'
        fontSize={props.sectorSize < 15 ? '9px' : '11px'}
      >
        <textPath
          href={`#curved${props.sector}`}
          startOffset='50%'
        >
          {`${props.interval.toFixed(1)}h`}
        </textPath>
      </text>
    </>
  )
}

IntervalLabel.propTypes = {
  sector: PropTypes.number,
  interval: PropTypes.number,
  sectorSize: PropTypes.number,
  radius: PropTypes.number,
  center: PropTypes.number
}
