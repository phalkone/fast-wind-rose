import React, { Fragment, useState } from 'react'
import { Legend } from './Legend'
import { Chart } from './Chart'
import { Ship } from './Ship'
import { Sector } from './Sector'
import { IntervalLabel } from './IntervalLabel'
import '../../themes/Windrose.scss'
import type { IWindrose } from '../../types/Windrose'

/**
 * Validate wind direction
 * @param {Number} dir Wind direction
 */
function validateDir (dir: number) : boolean {
  return (typeof dir === 'number' && dir >= 0 && dir <= 360)
}

/**
 * Validate wind speed
 * @param {Number} spd Wind speed
 */
function validateSpd (spd: number) : boolean {
  return (typeof spd === 'number' && spd >= 0 && spd <= 120)
}

/**
 * Divides data into sectors
 * @param {Number} sectorCount Number of sectors
 * @param {Array} dirData Array of wind direction data objects
 * @param {String} dirKey Key indicating the value of the wind direction
 * @param {Array} spdData Array of wind speed data objects
 * @param {String} spdKey Key indicating the value of the wind speed
 * @param {String} commonKey Key that is common between direction and speed
 */
function divideBySector (sectorCount: number, dirData: Array<object>, dirKey: string,
  spdData: Array<object>, spdKey: string, commonKey: string) : Array<Array<number>> {
  const sectors = new Array(sectorCount).fill(null).map(() => [])

  for (let i = 0; i < dirData.length; i++) {
    const speed : number = spdData[i][spdKey]
    const direction : number = dirData[i][dirKey]

    if (validateDir(direction) && validateSpd(speed) &&
      dirData[i][commonKey] === spdData[i][commonKey]) {
      let dir = direction + (180 / sectorCount)
      if (dir >= 360) dir -= 360
      const cat = Math.floor((dir * sectorCount) / 360)
      sectors[cat].push(speed)
    }
  }
  return sectors
}

/**
 * Draws a windrose for provided relative wind data
 */
const Windrose = (props: IWindrose) => {
  /* Use state to set the number of sectors and show/hide legend */
  const [sectorCount, setSectorCount] = useState<number>(props.sectorCount)
  const [legend, setLegend] = useState<boolean>(props.legend)

  /* Divide data points per sector */
  const sectors = divideBySector(sectorCount, props.dirData, props.dirKey,
    props.spdData, props.spdKey, props.commonKey)

  /* The sector with maximum number of data points defines the scale */
  const max = sectors.map((el) => el.length).sort((a, b) => b - a)[0]

  /* Set the viewBox size compared to the compilation size */
  const compilationSize = 260 / props.enlarge

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
        {/* Draw legend only if option is given as prop */}
        {legend && <Legend size={compilationSize} scale={props.scale} />}
        <Chart
          sectorSize={360 / sectorCount}
          center={compilationSize / 2}
        />
        {/* Draw each sector with interval label */}
        {sectors.map((speeds, i) => (
          <Fragment key={i}>
            {speeds.length &&
              <IntervalLabel
                sector={i}
                interval={props.interval}
                speeds={speeds}
                sectorSize={360 / sectorCount}
                center={compilationSize / 2}
              />}
            {speeds.length &&
              <Sector
                sector={i}
                speeds={speeds}
                center={compilationSize / 2}
                sectorSize={360 / sectorCount}
                barLength={(speeds.length / max) * (compilationSize / 2 - 10)}
                unit={(compilationSize / 2 - 10) / max}
                scale={props.scale}
                interval={props.interval}
                size={props.size}
              />}
          </Fragment>))}
        {/* Draw ship outline */}
        <Ship center={compilationSize / 2} />
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

export default Windrose
