import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export default function ToolTip (props) {
  return (
    <>
      <rect
        x={props.x / 2}
        y={props.y / 2}
        width={60}
        height={props.text.length * 10}
        fill='black'
        opacity={0.5}
      />
      {props.text.map((speed, i) => (
        <Fragment key={speed[0]}>
          <text
            x={(props.x / 2 + 5)}
            y={(props.y / 2 + (i + 1) * 8)}
            fontSize='8px'
            fill='white'
          >{`${speed[2]}kts: ${speed[3].toFixed(1)}h`}
          </text>
        </Fragment>
      ))}
    </>
  )
}

ToolTip.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  text: PropTypes.array
}
