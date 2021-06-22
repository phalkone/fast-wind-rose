import React, { Fragment, useContext, useState } from 'react'
import { ToolTip } from './ToolTip'
import { IntervalLabel } from './IntervalLabel'
import { divideBySpeed } from '../../utils/Windrose.util'
import type { ISector } from '../../types/Windrose.types'
import { WindroseContext } from '.'

/**
 * Colored sectors as per the specified scale.
 */
export const Sector = (props: ISector) => {
  const context = useContext(WindroseContext)
  /* State used for displaying tooltip. Displayed when mouse enters sector. */
  const [entered, setEntered] = useState<[number, number, [string, number]]>([-1, 0, ['', 0]])

  /* Constants to avoid recalculation */
  const cos = Math.cos(Math.PI / 180 * (context.sectorSize / 2))
  const sin = Math.sin(Math.PI / 180 * (context.sectorSize / 2))

  /* Divide speeds as per specified scale in array */
  const speedCategories = divideBySpeed(props.speeds, context.scale, context.max,
    context.center, context.interval)

  return (
    <>
      {/* Show the sector divided as per speed categories */}
      {speedCategories.map((count) => (
        <Fragment key={count[0]}>
          <path
            d={`M ${(context.center + (count[1] * sin)).toFixed(2)} ` +
             `${(context.center - (count[1] * cos)).toFixed(2)} ` +
             `A ${count[1]} ${count[1]}, 0, 0, 0, ` +
             `${(context.center - (count[1] * sin)).toFixed(2)} ` +
             `${(context.center - (count[1] * cos)).toFixed(2)} ` +
             `L ${context.center} ${context.center} Z`}
            fill={context.scale[count[0]]}
            transform={`rotate(${props.sector * context.sectorSize}, ` +
                     `${context.center}, ${context.center})`}
            onMouseMove={(e) => setEntered([e.clientX, e.clientY, [count[2], count[3]]])}
            onMouseOut={() => setEntered([-1, 0, ['', 0]])}
          />
        </Fragment>
      ))}
      <IntervalLabel
          sector={props.sector}
          speeds={props.speeds}
      />
      {/* Display tooltip when mouse cursor entered the sector */}
      {entered[0] !== -1 &&
        <ToolTip
          x={entered[0]}
          y={entered[1]}
          text={entered[2]}
          factor={context.size / (context.center * 2)}
        />}
    </>
  )
}
