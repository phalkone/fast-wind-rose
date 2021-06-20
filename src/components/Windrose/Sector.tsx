import React, { Fragment, useState } from 'react'
import ToolTip from './ToolTip'
import type { ISector } from '../../types/Windrose'

/**
 * Colored sectors as per the specified scale.
 */
export const Sector = (props: ISector) => {
  /* State used for displaying tooltip. Displayed when move enters sector. */
  const [entered, setEntered] = useState<boolean | [number, number, [string, number]]>(false)

  /* Constants to avoid recalculation */
  const cos = Math.cos(Math.PI / 180 * (props.sectorSize / 2))
  const sin = Math.sin(Math.PI / 180 * (props.sectorSize / 2))

  /* Divide speeds as per specified scale in array */
  const scale = [...Object.keys(props.scale)].map(Number)
  const speedCategories = []
  let length = props.barLength
  for (let i = scale.length - 1; i >= 0; i--) {
    let prev = i === scale.length - 1 ? Infinity : scale[i + 1]
    const count = props.speeds.filter((val) => val >= scale[i] && val < prev).length
    if (prev === Infinity) prev = scale[scale.length - 1]
    if (count) {
      speedCategories.push([scale[i], length, `${scale[i]}-${prev}`, count * props.interval])
      length -= count * props.unit
    }
  }

  return (
    <>
      {/* Show the sector divided as per speed categories */}
      {speedCategories.map((count) => (
        <Fragment key={count[0]}>
          <path
            d={`M ${props.center + (count[1] * sin)} ${props.center - (count[1] * cos)} ` +
             `A ${count[1]} ${count[1]}, 0, 0, 0, ${props.center - (count[1] * sin)} ` +
             `${props.center - (count[1] * cos)} L ${props.center} ${props.center} Z`}
            fill={props.scale[count[0]]}
            transform={`rotate(${props.sector * props.sectorSize}, ` +
                     `${props.center}, ${props.center})`}
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
          factor={props.size / (props.center * 2)}
        />}
    </>
  )
}
