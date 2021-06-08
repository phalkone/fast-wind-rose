import React, { Fragment } from 'react'
import Colors from './Colors'
import PropTypes from 'prop-types'

function Legend (props) {
  return (
    <>
      {Object.keys(Colors).map(speed => (
        <Fragment key={speed}>
          <rect
            x={props.size + 10}
            y={(props.size / 2) + 90 - ((speed / 5) * 20)}
            width='20'
            height='20'
            stroke='grey'
            strokeWidth='1'
            fill={Colors[speed]}
          />
          <text
            x={props.size + 35}
            y={(props.size / 2) + 115 - ((speed / 5) * 20)}
            fill='black'
            fontFamily='Roboto, "Open Sans", sans-serif'
          >{speed === '50' ? '50<' : speed}
          </text>
        </Fragment>
      ))}
      <text
        x={props.size + 35}
        y={(props.size / 2) - 105}
        fill='black'
        fontFamily='Roboto, "Open Sans", sans-serif'
      >kts
      </text>
    </>
  )
}

Legend.propTypes = {
  size: PropTypes.number
}

export default Legend
