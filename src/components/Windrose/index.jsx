import React, { Fragment, useState } from 'react'
import Legend from './Legend'
import Chart from './Chart'
import Ship from './Ship'
import Sector from './Sector'
import IntervalLabel from './IntervalLabel'
import PropTypes from 'prop-types'
import './index.css'

/**
 * Validate wind direction
 * @param {Number} dir Wind direction
 */
function validateDir (dir) {
  return (typeof dir === 'number' && dir >= 0 && dir <= 360)
}

/**
 * Validate wind speed
 * @param {Number} spd Wind speed
 */
function validateSpd (spd) {
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
function divideBySector (sectorCount, dirData, dirKey, spdData, spdKey, commonKey) {
  const sectors = new Array(sectorCount).fill(null).map(() => [])
  for (let i = 0; i < dirData.length; i++) {
    if (validateDir(dirData[i][dirKey]) && validateSpd(spdData[i][spdKey]) &&
      dirData[i][commonKey] === spdData[i][commonKey]) {
      let dir = dirData[i][dirKey] + (180 / sectorCount)
      if (dir >= 360) dir -= 360
      const cat = Math.floor((dir * sectorCount) / 360)
      sectors[cat].push(spdData[i][spdKey])
    }
  }
  return sectors
}

/**
 * Draws a windrose for provided relative wind data
 */
function Windrose (props) {
  /* Use state to set the number of sectors and show/hide legend */
  const [sectorCount, setSectorCount] = useState(props.sectorCount)
  const [legend, setLegend] = useState(props.legend)

  /* Divide data points per sector */
  const sectors = divideBySector(sectorCount, props.dirData, props.dirKey,
    props.spdData, props.spdKey, props.commonKey)

  /* The sector with maximum number of data points defines the scale */
  const max = sectors.map((el) => el.length).sort((a, b) => b - a)[0]

  /* Set the viewBox size compared to the compilation size */
  const complilationSize = 260 / props.enlarge

  return (
    <div>
      {/* Selector for the number of sectors */}
      <select
        title='Number of sectors'
        value={sectorCount}
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
        onClick={e => { setLegend(!legend) }}
        style={{
          left: props.size - 30
        }}
      >{legend ? '<<' : '>>'}
      </button>
      {/* Windrose SVG with optional legend */}
      <svg
        version='1.1'
        viewBox={`0 0 ${complilationSize + (legend ? 65 : 0)} ${complilationSize}`}
        width={props.size + (legend ? 65 * (props.size / complilationSize) : 0)}
        height={props.size}
      >
        {/* Draw legend only if option is given as prop */}
        {legend && <Legend size={complilationSize} scale={props.scale} />}
        <Chart
          sectorCount={sectorCount}
          center={complilationSize / 2}
          radius={complilationSize / 2 - 10}
        />
        {/* Draw each sector with interval label */}
        {sectors.map((speeds, i) => (
          <Fragment key={i}>
            {speeds.length &&
              <IntervalLabel
                sector={i}
                interval={props.interval * speeds.length}
                sectorSize={360 / sectorCount}
                radius={(complilationSize / 2) - 10}
                center={complilationSize / 2}
              />}
            {speeds.length &&
              <Sector
                sector={i}
                speeds={speeds}
                center={complilationSize / 2}
                sectorSize={360 / sectorCount}
                barLength={(speeds.length / max) * (complilationSize / 2 - 10)}
                unit={(complilationSize / 2 - 10) / max}
                scale={props.scale}
                interval={props.interval}
                size={props.size}
                xFactor={props.size / complilationSize}
                yFactor={props.size / complilationSize}
              />}
          </Fragment>))}
        {/* Draw ship outline */}
        <Ship center={complilationSize / 2} />
        {/* Ensures that tooltips are always on top */}
        <use href='#tooltip' fill='black' />
        <use href='#tooltiptext' />
      </svg>
    </div>
  )
}

Windrose.propTypes = {
  /**
   * Hide or display legend
   */
  legend: PropTypes.bool,
  /**
   * Width/height of chart. Will be displayed in specified viewbox.
   */
  size: PropTypes.number,
  /**
   * Array with directional data for the wind
   */
  dirData: PropTypes.arrayOf(PropTypes.object),
  /**
   * Array with speed data for the wind
   */
  spdData: PropTypes.arrayOf(PropTypes.object),
  /**
   * Fixed interval between data points specified in hours. For example if
   * data points are every 30 min, then value should be 0.5
   */
  interval: PropTypes.number,
  /**
   * Scale of speeds with the linked color. Example as follows:
   *  { 0: 'rgb(60,95,156)', 5: 'rgb(94,131,188)' }
   */
  scale: PropTypes.object,
  /**
   * Key for speed data
   */
  spdKey: PropTypes.string,
  /**
   * Key for directional data
   */
  dirKey: PropTypes.string,
  /**
   * Default number of sectors. Must be included in sectorArray.
   */
  sectorCount: function (props, propName, componentName) {
    if (!props.sectorArray.includes(props[propName])) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
      )
    }
  },
  /**
   * Scales the compilation scale against the viewbox. Choose a value lower
   * than 1 to scale down and larger than 1 to scale up.
   */
  enlarge: PropTypes.number,
  /**
   * Array that defines the number of sectors the user can choose from.
   */
  sectorArray: PropTypes.arrayOf(PropTypes.number),
  /**
   * Common key between direction and speed data
   */
  commonKey: PropTypes.string
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
