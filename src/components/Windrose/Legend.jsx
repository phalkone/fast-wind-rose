/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

/**
 * The legend displaying the used scale
 */
function Legend (props) {
  const keys = Object.keys(props.scale)
  const length = keys.length
  const square = ((props.size - 20) / length) > 20 ? 20 : ((props.size - 20) / length)
  const margin = (props.size - (length * square)) / 2
  const fontSize = square - 2

  return (
    <Fragment>
      {keys.map((speed, i) => (
        <Fragment key={speed}>
          {/* Color scale */}
          <rect
            x={props.size + 10}
            y={(props.size - margin) - ((i + 1) * square)}
            width={square}
            height={square}
            stroke='grey'
            strokeWidth='1'
            fill={props.scale[speed]}
          />
          {/* Speed scale */}
          <text
            x={props.size + square + 15}
            y={(props.size - margin) - (i * square) + 5}
            fill='black'
            fontSize={fontSize}
          >{i === length - 1 ? `${speed}<` : speed}
          </text>
        </Fragment>
      ))}
      {/* Unit */}
      <text
        x={props.size + square + 15}
        y={(props.size - margin) - (length * square) + 5}
        fill='black'
        fontSize={fontSize}
      >kts
      </text>
    </Fragment>
  )
}

Legend.propTypes = {
  /**
   * Size of chart (height/width + margins)
   */
  size: PropTypes.number,
  /**
   * Scale of speeds with the linked color. Example as follows:
   *  { 0: 'rgb(60,95,156)', 5: 'rgb(94,131,188)' }
   */
  scale: PropTypes.object
}

export default Legend
