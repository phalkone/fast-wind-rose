import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export default function ToolTip (props) {
  return (
    <>
      <rect
        x={props.x / 2}
        y={props.y / 2}
        width={60}
        height={10}
        fill='black'
        opacity={0.5}
      />
      <text
        x={(props.x / 2 + 5)}
        y={(props.y / 2 + 8)}
        fontSize='8px'
        fill='white'
      >{`${props.text[0]}kts: ${props.text[1].toFixed(1)}h`}
      </text>
    </>
  )
}

ToolTip.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  text: PropTypes.array
}
