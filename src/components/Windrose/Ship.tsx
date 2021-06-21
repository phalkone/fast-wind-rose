import React, { useContext } from 'react'
import { WindroseContext } from '.'

/**
 * Outline of the ship
 */
export const Ship = () => {
  const context = useContext(WindroseContext)
  return (
    <path
      d={`M ${context.center - 10} ${context.center + 15} H ${context.center + 10} ` +
         `C ${context.center + 10} ${context.center + 15} ${context.center + 10} ` +
         `${context.center - 20} ${context.center} ${context.center - 20} ` +
         `C ${context.center - 10} ${context.center - 20} ${context.center - 10} ` +
         `${context.center + 15} ${context.center - 10} ${context.center + 15} Z`}
      fill='none'
      stroke='grey'
      strokeWidth='3'
      opacity='0.7'
    />
  )
}
