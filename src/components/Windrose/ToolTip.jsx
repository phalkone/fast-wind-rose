import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export default function ToolTip (props) {
  const tooltip = `${props.text[0]}kts: ${props.text[1].toFixed(1)}h`
  return (
    <>
      <rect
        id='tooltip'
        x={props.x / props.xFactor}
        y={props.y / props.yFactor}
        width={tooltip.length * 6}
        height={14}
        opacity='0.3'
      />
      <text
        id='tooltiptext'
        x={(props.x / props.xFactor + 2)}
        y={(props.y / props.yFactor + 10)}
        textLength={tooltip.length * 6 - 5}
        fontSize='9px'
        fill='white'
      >{tooltip}
      </text>
    </>
  )
}

ToolTip.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  text: PropTypes.array,
  yFactor: PropTypes.number,
  xFactor: PropTypes.number
}
