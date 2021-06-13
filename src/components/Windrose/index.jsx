import React, { Fragment, useState } from 'react'
import Legend from './Legend'
import Chart from './Chart'
import Ship from './Ship'
import Sector from './Sector'
import IntervalLabel from './IntervalLabel'
import PropTypes from 'prop-types'

/**
 * Draws a windrose for provided relative wind data
 */
function Windrose (props) {
  /* Use state to set the number of sectors and show/hide legend */
  const [sectorCount, setSectorCount] = useState(props.sectorCount)
  const [legend, setLegend] = useState(props.legend)

  /* Divide data points per sector */
  const sectors = new Array(sectorCount).fill(null).map(() => [])
  const sectorSize = 360 / sectorCount
  for (let i = 0; i < props.dirData.length; i++) {
    let dir = props.dirData[i][props.dirKey] + (sectorSize / 2)
    if (dir > 360) dir -= 360
    const cat = Math.floor(dir / sectorSize)
    sectors[cat].push(props.spdData[i][props.spdKey])
  }
  /* The sector with maximum number of data points defines the scale */
  const max = sectors.map((el) => el.length).sort((a, b) => b - a)[0]

  return (
    <div>
      {/* Selector for the number of sectors */}
      <select
        title='Number of sectors'
        value={sectorCount}
        onChange={e => { setSectorCount(Number(e.target.value)) }}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px'
        }}
      >
        <option value='4'>4</option>
        <option value='8'>8</option>
        <option value='12'>12</option>
        <option value='16'>16</option>
        <option value='24'>24</option>
        <option value='32'>32</option>
        <option value='36'>36</option>
      </select>
      <button
        title='Show/hide legend'
        onClick={e => { setLegend(!legend) }}
        style={{
          position: 'absolute',
          top: '10px',
          left: props.width - 150
        }}
      >{legend ? '<<' : '>>'}
      </button>
      {/* Windrose SVG with optional legend */}
      <svg
        version='1.1'
        viewBox={`0 0 ${props.size + (legend ? 65 : 0)} ${props.size}`}
        width={props.width}
        height={props.height}
      >
        {/* Draw legend only if option is given as prop */}
        {legend && <Legend size={props.size} scale={props.scale} />}
        <Chart
          sectorSize={sectorSize}
          center={props.center}
          radius={props.radius}
        />
        {/* Draw each sector with interval label */}
        {sectors.map((speeds, i) => (
          <Fragment key={i}>
            {speeds.length &&
              <IntervalLabel
                sector={i}
                interval={props.interval * speeds.length}
                sectorSize={sectorSize}
                radius={props.radius}
                center={props.center}
              />}
            {speeds.length &&
              <Sector
                sector={i}
                speeds={speeds}
                center={props.center}
                sectorSize={sectorSize}
                barLength={(speeds.length / max) * props.radius}
                unit={props.radius / max}
                scale={props.scale}
                interval={props.interval}
                size={props.size}
                xFactor={props.width / (props.size + (legend ? 65 : 0))}
                yFactor={props.height / props.size}
              />}
          </Fragment>))}
        {/* Draw ship outline */}
        <Ship center={props.center} />
        {/* Ensures that tooltips are always on top */}
        <use href='#tooltip' fill='black' />
        <use href='#tooltiptext' />
      </svg>
    </div>
  )
}

Windrose.propTypes = {
  /**
   * Viewbox height. Actual height of the windrose
   */
  height: PropTypes.number,
  /**
   * Viewbox width. Actual height of the windrose
   */
  width: PropTypes.number,
  /**
   * Hide or display legend
   */
  legend: PropTypes.bool,
  /**
   * Width/height of chart. Will be displayed in specified viewbox.
   */
  size: PropTypes.number,
  /**
   * Radius of the chart
   */
  radius: PropTypes.number,
  /**
   * Center of the chart. x and y coordinates are assumed to be the same.
   */
  center: PropTypes.number,
  /**
   * Array with directional data for the wind
   */
  dirData: PropTypes.array,
  /**
   * Array with speed data for the wind
   */
  spdData: PropTypes.array,
  /**
   * Fixed interval between data points specified in hours. If data points are
   * every 30 min, then value should be 0.5
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
   * Default number of sectors
   */
  sectorCount: PropTypes.oneOf([4, 8, 12, 16, 24, 32, 36])
}

Windrose.defaultProps = {
  radius: 120,
  center: 130,
  size: 260,
  width: 650,
  height: 520,
  spdKey: 'value',
  dirKey: 'value',
  sectorCount: 12,
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
