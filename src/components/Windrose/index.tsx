import React, { createContext, Fragment, useState } from 'react'
import { Legend } from './Legend'
import { Chart } from './Chart'
import { Ship } from './Ship'
import { Sector } from './Sector'
import { divideBySector } from '../../utils/Windrose.util'
import type { IWindrose, IWindroseContext } from '../../types/Windrose.types'
import '../../themes/Windrose.scss'

/**
 * Draws a windrose for provided relative wind data
 * @param {IWindrose} props Properties of the Windrose as descibed by IWindrose.
 */
const Windrose = (props: IWindrose) => {
  /* Use state to set the number of sectors and show/hide legend */
  const [sectorCount, setSectorCount] = useState<number>(props.sectorCount)
  const [legend, setLegend] = useState<boolean>(props.legend)

  /* Divide data points per sector */
  const sectors = divideBySector(sectorCount, props.dirData, props.dirKey,
    props.spdData, props.spdKey, props.commonKey)

  /* Set the viewBox size compared to the compilation size */
  const compilationSize = 260 / props.enlarge

  /* Add sectorCount if not part of sectorArray */
  if (!props.sectorArray.includes(sectorCount)) {
    props.sectorArray.push(sectorCount)
  }

  return (
    <div className='windrose-container'>
      {/* Selector for the number of sectors */}
      <select
        title='Number of sectors'
        value={sectorCount}
        className='windrose-select'
        onChange={e => { setSectorCount(Number(e.target.value)) }}
      >
        {props.sectorArray.map(s => (
          <Fragment key={s}>
            <option value={s}>{s}</option>
          </Fragment>
        ))}
      </select>
      <button
        title='Show/hide legend'
        className='windrose-button'
        onClick={e => { setLegend(!legend) }}
        style={{
          left: props.size - 30
        }}
      >{legend ? '<<' : '>>'}
      </button>
      {/* Windrose SVG with optional legend */}
      <svg
        version='1.1'
        viewBox={`0 0 ${compilationSize + (legend ? 65 : 0)} ${compilationSize}`}
        width={props.size + (legend ? 65 * (props.size / compilationSize) : 0)}
        height={props.size}
      >
        <WindroseContext.Provider value={{
          center: compilationSize / 2,
          scale: props.scale,
          sectorSize: 360 / sectorCount,
          interval: props.interval,
          size: props.size,
          max: sectors.map((el) => el.length).sort((a, b) => b - a)[0]
        }}>
          {/* Draw legend only if option is given as prop */}
          {legend && <Legend/>}
          <Chart/>
          {/* Draw each sector with interval label */}
          {sectors.map((speeds, i) => (
            speeds.length && <Fragment key={i}>
              <Sector
                sector={i}
                speeds={speeds}
              />
            </Fragment>
          ))}
          {/* Draw ship outline */}
          <Ship/>
        </WindroseContext.Provider>
        {/* Ensures that tooltips are always on top */}
        <use href='#tooltip' fill='black' />
        <use href='#tooltiptext' />
      </svg>
    </div>
  )
}

Windrose.defaultProps = {
  size: 260,
  spdKey: 'value',
  dirKey: 'value',
  commonKey: 'timestamp',
  sectorCount: 12,
  enlarge: 1,
  interval: 1,
  sectorArray: [4, 8, 12, 16, 24, 32, 36],
  scale: {
    0: 'rgb(60,95,156)',
    5: 'rgb(94,131,188)',
    10: 'rgb(143,180,232)',
    15: 'rgb(174,203,214)',
    20: 'rgb(220,226,220)',
    25: 'rgb(251,233,94)',
    30: 'rgb(252,195,67)',
    35: 'rgb(245,136,42)',
    40: 'rgb(242,103,33)',
    45: 'rgb(243,63,29)',
    50: 'rgb(244,36,27)'
  }
}

const defaultContext : IWindroseContext = {
  center: 130,
  scale: Windrose.defaultProps.scale,
  sectorSize: 30,
  interval: 1,
  size: 260,
  max: 24
}

export const WindroseContext = createContext(defaultContext)

export default Windrose
