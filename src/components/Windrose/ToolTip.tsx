import React, { Fragment } from 'react'

interface IToolTip {
  /**
   * x coordinate of top left corner of tooltip
   */
  x: number,
  /**
   * y coordinate of top left corner of tooltip
   */
  y: number,
  /**
   * text of tooltip
   */
  text: [string, number],
  /**
   * Scale factor in y direction due to viewBox of SVG vs actual size of SVG.
   */
  factor: number
}

/**
 * Tooltip to show scale information on hovering
 */
export default function ToolTip (props : IToolTip) {
  const tooltip = `${props.text[0]}kts: ${props.text[1].toFixed(1)}h`
  return (
    <>
      {/* Background of tooltip */}
      <rect
        id='tooltip'
        x={props.x / props.factor}
        y={props.y / props.factor}
        width={tooltip.length * 6}
        height={14}
        opacity='0.3'
      />
      {/* Tooltip text */}
      <text
        id='tooltiptext'
        x={(props.x / props.factor + 2)}
        y={(props.y / props.factor + 10)}
        textLength={tooltip.length * 6 - 5}
        fontSize='9px'
        fill='white'
      >{tooltip}
      </text>
    </>
  )
}
