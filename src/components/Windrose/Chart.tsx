import React, { Fragment, useContext } from 'react'
import { WindroseContext } from '.'

/**
 * The chart that can be divided into a specified number of sectors
 */
export const Chart = () => {
  const context = useContext(WindroseContext)
  return (
    <>
      {/* Sector lines */}
      {[...new Array(Math.round(360 / context.sectorSize)).keys()].map(i => (
        <Fragment key={i}>
          <line
            x1={context.center}
            x2={context.center}
            y1={10}
            y2={context.center}
            stroke='grey'
            strokeWidth='1'
            transform={`rotate(${(0.5 + i) * (context.sectorSize)},` +
                       `${context.center},${context.center})`}
          />
        </Fragment>
      ))}
      {/* Circles */}
      {[...new Array(4).keys()].map(i => (
        <Fragment key={i}>
          <circle
            cx={context.center}
            cy={context.center}
            r={(4 - i) * ((context.center - 10) / 4)}
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
