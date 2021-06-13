import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

/**
 * Tooltip to show scale information on hovering
 */
export default function ToolTip (props) {
  const tooltip = `${props.text[0]}kts: ${props.text[1].toFixed(1)}h`
  return (
    <>
      {/* Background of tooltip */}
      <rect
        id='tooltip'
        x={props.x / props.xFactor}
        y={props.y / props.yFactor}
        width={tooltip.length * 6}
        height={14}
        opacity='0.3'
      />
      {/* Tooltip text */}
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
  /**
   * x coordinate of top left corner of tooltip
   */
  x: PropTypes.number,
  /**
   * y coordinate of top left corner of tooltip
   */
  y: PropTypes.number,
  /**
   * text of tooltip
   */
  text: PropTypes.array,
  /**
   * Scale factor in y direction due to viewBox of SVG vs actual size of SVG.
   */
  yFactor: PropTypes.number,
  /**
   * Scale factor in x direction due to viewBox of SVG vs actual size of SVG.
   */
  xFactor: PropTypes.number
}
