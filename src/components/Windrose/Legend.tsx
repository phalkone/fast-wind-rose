import React, { Fragment } from 'react'
import type { ILegend } from '../../types/Windrose'

/**
 * The legend displaying the used scale
 */
export const Legend = (props: ILegend) => {
  const size = props.center * 2
  const keys = Object.keys(props.scale)
  const length = keys.length
  const square = ((size - 20) / length) > 20 ? 20 : ((size - 20) / length)
  const margin = (size - (length * square)) / 2
  const fontSize = square - 2

  return (
    <>
      {keys.map((speed, i) => (
        <Fragment key={speed}>
          {/* Color scale */}
          <rect
            x={size + 10}
            y={(size - margin) - ((i + 1) * square)}
            width={square}
            height={square}
            stroke='grey'
            strokeWidth='1'
            fill={props.scale[speed]}
          />
          {/* Speed scale */}
          <text
            x={size + square + 15}
            y={(size - margin) - (i * square) + 5}
            fill='black'
            fontSize={fontSize}
          >{i === length - 1 ? `${speed}<` : speed}
          </text>
        </Fragment>
      ))}
      {/* Unit */}
      <text
        x={size + square + 15}
        y={(size - margin) - (length * square) + 5}
        fill='black'
        fontSize={fontSize}
      >kts
      </text>
    </>
  )
}
