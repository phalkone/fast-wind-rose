import React, { Fragment } from 'react'
import type { IChart } from '../../types/Windrose'

/**
 * The chart that can be divided into a specified number of sectors
 */
export const Chart = (props: IChart) => {
  return (
    <>
      {/* Sector lines */}
      {[...new Array(Math.round(360 / props.sectorSize)).keys()].map(i => (
        <Fragment key={i}>
          <line
            x1={props.center}
            x2={props.center}
            y1={10}
            y2={props.center}
            stroke='grey'
            strokeWidth='1'
            transform={`rotate(${(0.5 + i) * (props.sectorSize)},` +
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
    </>
  )
}
