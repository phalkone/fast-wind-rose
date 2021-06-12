import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import ToolTip from './ToolTip'

export default function Sector (props) {
  const [entered, setEntered] = useState(false)
  const speedCategories = []
  const cos = Math.cos(Math.PI / 180 * (props.sectorSize / 2))
  const sin = Math.sin(Math.PI / 180 * (props.sectorSize / 2))
  let length = props.barLength
  const scale = Object.keys(props.scale)

  for (let i = scale.length - 1; i >= 0; i--) {
    let prev = i === scale.length - 1 ? Infinity : scale[i + 1]
    const count = props.speeds.filter((val) => val >= scale[i] && val < prev).length
    if (prev === Infinity) prev = scale[scale.length - 1]
    if (count) {
      speedCategories.push([scale[i], length, `${scale[i]}-${prev}`, count])
      length -= count * props.interval
    }
  }

  return (
    <>
      {speedCategories.map((count) => (
        <Fragment key={count[0]}>
          <path
            d={`M ${props.center + (count[1] * sin)} ${props.center - (count[1] * cos)} ` +
             `A ${count[1]} ${count[1]}, 0, 0, 0, ${props.center - (count[1] * sin)} ` +
             `${props.center - (count[1] * cos)} L ${props.center} ${props.center} Z`}
            fill={props.scale[count[0]]}
            transform={`rotate(${props.sector * props.sectorSize}, ` +
                     `${props.center}, ${props.center})`}
            onMouseMove={(e) => setEntered([e.clientX, e.clientY])}
            onMouseOut={() => setEntered(false)}
          />
        </Fragment>
      ))}
      {entered && <ToolTip x={entered[0]} y={entered[1]} text={speedCategories} />}
    </>
  )
}

Sector.propTypes = {
  sector: PropTypes.number,
  sectorSize: PropTypes.number,
  barLength: PropTypes.number,
  speeds: PropTypes.array,
  interval: PropTypes.number,
  center: PropTypes.number,
  scale: PropTypes.object
}
