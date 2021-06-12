import React from 'react'
import PropTypes from 'prop-types'

function Ship (props) {
  return (
    <path
      d={`M ${props.center - 10} ${props.center + 15} H ${props.center + 10} ` +
         `C ${props.center + 10} ${props.center + 15} ${props.center + 10} ` +
         `${props.center - 20} ${props.center} ${props.center - 20} ` +
         `C ${props.center - 10} ${props.center - 20} ${props.center - 10} ` +
         `${props.center + 15} ${props.center - 10} ${props.center + 15} Z`}
      fill='none'
      stroke='grey'
      strokeWidth='3'
      opacity='0.7'
    />
  )
}

Ship.propTypes = {
  center: PropTypes.number
}

export default Ship
