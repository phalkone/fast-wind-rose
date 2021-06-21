import React, { Fragment, useContext, useState } from 'react'
import ToolTip from './ToolTip'
import type { ISector } from '../../types/Windrose'
import { WindroseContext } from '.'

/**
 * Colored sectors as per the specified scale.
 */
export const Sector = (props: ISector) => {
  const context = useContext(WindroseContext)
  /* State used for displaying tooltip. Displayed when mouse enters sector. */
  const [entered, setEntered] = useState<boolean | [number, number, [string, number]]>(false)

  /* Constants to avoid recalculation */
  const cos = Math.cos(Math.PI / 180 * (context.sectorSize / 2))
  const sin = Math.sin(Math.PI / 180 * (context.sectorSize / 2))

  /* Divide speeds as per specified scale in array */
  let length = (props.speeds.length / context.max) * (context.center - 10)
  const scale = [...Object.keys(context.scale)].map(Number)
  const speedCategories = []
  for (let i = scale.length - 1; i >= 0; i--) {
    let prev = i === scale.length - 1 ? Infinity : scale[i + 1]
    const count = props.speeds.filter((val) => val >= scale[i] && val < prev).length
    if (prev === Infinity) prev = scale[scale.length - 1]
    if (count) {
      speedCategories.push([scale[i], length, `${scale[i]}-${prev}`, count * context.interval])
      length -= count * ((context.center - 10) / context.max)
    }
  }

  return (
    <>
      {/* Show the sector divided as per speed categories */}
      {speedCategories.map((count) => (
        <Fragment key={count[0]}>
          <path
            d={`M ${context.center + (count[1] * sin)} ${context.center - (count[1] * cos)} ` +
             `A ${count[1]} ${count[1]}, 0, 0, 0, ${context.center - (count[1] * sin)} ` +
             `${context.center - (count[1] * cos)} L ${context.center} ${context.center} Z`}
            fill={context.scale[count[0]]}
            transform={`rotate(${props.sector * context.sectorSize}, ` +
                     `${context.center}, ${context.center})`}
            onMouseMove={(e) => setEntered([e.clientX, e.clientY, [count[2], count[3]]])}
            onMouseOut={() => setEntered(false)}
          />
        </Fragment>
      ))}
      {/* Display tooltip when mouse cursor entered the sector */}
      {entered &&
        <ToolTip
          x={entered[0]}
          y={entered[1]}
          text={entered[2]}
          factor={context.size / (context.center * 2)}
        />}
    </>
  )
}
