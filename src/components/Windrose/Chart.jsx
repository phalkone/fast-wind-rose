import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

function Lines (props) {
  return (
    [...new Array(180 / props.sectorSize).keys()].map(i => (
      <Fragment key={i}>
        <line
          x1='130'
          x2='130'
          y1='10'
          y2='250'
          stroke='grey'
          strokeWidth='1'
          transform={`rotate(${(props.sectorSize / 2) + i * props.sectorSize},130,130)`}
        />
      </Fragment>
    ))
  )
}

function Circles () {
  return (
    [...new Array(4).keys()].map(i => (
      <Fragment key={i}>
        <circle
          cx='130'
          cy='130'
          r={120 - i * 30}
          fill='none'
          strokeWidth='1'
          stroke='grey'
          opacity={i > 0 ? 0.5 : 1}
        />
      </Fragment>
    ))
  )
}

export default function Chart (props) {
  return (
    <>
      <Lines sectorSize={props.sectorSize} />
      <Circles />
    </>
  )
}

Chart.propTypes = {
  sectorSize: PropTypes.number
}
