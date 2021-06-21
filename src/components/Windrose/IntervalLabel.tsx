import React, { Fragment, useContext } from 'react'
import type { ISector } from '../../types/Windrose'
import { WindroseContext } from '.'

/**
 * Shows the interval of each sector
 */
export const IntervalLabel = (props: ISector) => {
  const context = useContext(WindroseContext)
  let radius = context.center - 8
  const sin = Math.sin(Math.PI / 180 * ((context.sectorSize - 2) / 2))
  const cos = Math.cos(Math.PI / 180 * ((context.sectorSize - 2) / 2))
  let sign = 1
  /* Verify if path is in the top or bottom section of the chart */
  if (props.sector > (90 / context.sectorSize) &&
    props.sector < (270 / context.sectorSize)) {
    radius += 8
    sign = -1
  }
  const x1 = context.center - sign * radius * sin
  const y1 = context.center - radius * cos
  const x2 = context.center + sign * radius * sin
  const y2 = context.center - radius * cos

  return (
    <>
      {/* Path to draw text along */}
      <path
        id={`curved${props.sector}`}
        fill='none'
        d={`M ${x1} ${y1} A ${radius} ${radius},` +
           ` 0, 0, ${sign === 1 ? 1 : 0}, ${x2} ${y2}`}
        transform={`rotate(${props.sector * context.sectorSize},` +
                   ` ${context.center}, ${context.center})`}
      />
      {/* Text to write on path */}
      <text
        fill='black'
        textAnchor='middle'
        fontSize={context.sectorSize < 15 ? '9px' : '11px'}
      >
        <textPath
          href={`#curved${props.sector}`}
          startOffset='50%'
        >
          {`${(context.interval * props.speeds.length).toFixed(1)}h`}
        </textPath>
      </text>
    </>
  )
}
