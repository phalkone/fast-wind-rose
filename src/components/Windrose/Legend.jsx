import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

function Legend (props) {
  const keys = Object.keys(props.scale)
  const length = keys.length
  const square = ((props.size - 20) / length) > 20 ? 20 : ((props.size - 20) / length)
  const margin = (props.size - (length * square)) / 2
  const fontSize = square - 2

  return (
    <>
      {keys.map((speed, i) => (
        <Fragment key={speed}>
          <rect
            x={props.size + 10}
            y={(props.size - margin) - ((i + 1) * square)}
            width={square}
            height={square}
            stroke='grey'
            strokeWidth='1'
            fill={props.scale[speed]}
          />
          <text
            x={props.size + square + 15}
            y={(props.size - margin) - (i * square) + 5}
            fill='black'
            fontSize={fontSize}
          >{i === length - 1 ? `${speed}<` : speed}
          </text>
        </Fragment>
      ))}
      <text
        x={props.size + square + 15}
        y={(props.size - margin) - (length * square) + 5}
        fill='black'
        fontSize={fontSize}
      >kts
      </text>
    </>
  )
}

Legend.propTypes = {
  size: PropTypes.number,
  scale: PropTypes.object
}

export default Legend
