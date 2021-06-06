import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import colors from './Colors'

export default function Sector (props) {
  const speedCategories = []
  const center = 130
  const cos = Math.cos(Math.PI / 180 * (props.sectorSize / 2))
  const sin = Math.sin(Math.PI / 180 * (props.sectorSize / 2))
  let length = props.barLength

  for (let speed = 50; speed >= 0; speed -= 5) {
    const prev = speed === 50 ? 100 : speed + 5
    const count = props.speeds.filter((val) => val > speed && val <= prev).length
    if (count) {
      speedCategories.push([speed, length])
      length -= count * props.interval
    }
  }

  return (
    speedCategories.map((count) => (
      <Fragment key={count[0]}>
        <path
          d={`M ${center + (count[1] * sin)} ${center - (count[1] * cos)} A ${count[1]} ${count[1]}, 0, 0, 0, ${center - (count[1] * sin)} ${center - (count[1] * cos)} L 130 130 Z`}
          fill={colors[count[0]]}
          transform={`rotate(${props.sector * props.sectorSize}, 130, 130)`}
        />
      </Fragment>
    ))
  )
}

Sector.propTypes = {
  sector: PropTypes.number,
  sectorSize: PropTypes.number,
  barLength: PropTypes.number,
  speeds: PropTypes.array,
  interval: PropTypes.number
}
