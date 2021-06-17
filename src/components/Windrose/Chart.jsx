/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

/**
 * The chart that can be divided into a specified number of sectors
 */
function Chart (props) {
  return (
    <Fragment>
      {/* Sector lines */}
      {[...new Array(props.sectorCount).keys()].map(i => (
        <Fragment key={i}>
          <line
            x1={props.center}
            x2={props.center}
            y1={10}
            y2={props.center}
            stroke='grey'
            strokeWidth='1'
            transform={`rotate(${(0.5 + i) * (360 / props.sectorCount)},` +
                       ` ${props.center},${props.center})`}
          />
        </Fragment>
      ))}
      {/* Circles */}
      {[...new Array(4).keys()].map(i => (
        <Fragment key={i}>
          <circle
            cx={props.center}
            cy={props.center}
            r={(4 - i) * ((props.center - 10) / 4)}
            fill='none'
            strokeWidth='1'
            stroke='grey'
            opacity={i > 0 ? 0.5 : 1}
          />
        </Fragment>
      ))}
    </Fragment>
  )
}

Chart.propTypes = {
  /**
   * The number of sectors
   */
  sectorCount: PropTypes.number,
  /**
   * The center of the chart. x and y coordinates are the same.
   */
  center: PropTypes.number
}

export default Chart
