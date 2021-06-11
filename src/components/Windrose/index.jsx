import React, { Fragment, useState } from 'react'
import Legend from './Legend'
import Chart from './Chart'
import Ship from './Ship'
import Sector from './Sector'
import IntervalLabel from './IntervalLabel'
import PropTypes from 'prop-types'

function Windrose (props) {
  const [sectorCount, setSectorCount] = useState(12)
  const sectors = new Array(sectorCount).fill(null).map(() => [])
  const sectorSize = 360 / sectorCount
  for (let i = 0; i < props.dirData.length; i++) {
    let dir = props.dirData[i].value + (sectorSize / 2)
    if (dir > 360) dir -= 360
    const cat = Math.floor(dir / sectorSize)
    sectors[cat].push(props.spdData[i].value)
  }
  const max = sectors.map((el) => el.length).sort((a, b) => b - a)[0]

  return (
    <div>
      <select
        title='Number of sectors'
        value={sectorCount}
        onChange={e => { setSectorCount(Number(e.target.value)) }}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '14px'
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
      <svg
        version='1.1'
        viewBox={`0 0 ${props.size + (props.legend ? 65 : 0)} ${props.size}`}
        width={props.width}
        height={props.height}
      >
        {props.legend && <Legend size={props.size} scale={props.scale} />}
        <Chart
          sectorSize={sectorSize}
          center={props.center}
          radius={props.radius}
        />
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
                interval={props.radius / max}
                scale={props.scale}
              />}
          </Fragment>))}
        <Ship center={props.center} />
      </svg>
    </div>
  )
}

Windrose.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  legend: PropTypes.bool,
  size: PropTypes.number,
  radius: PropTypes.number,
  center: PropTypes.number,
  dirData: PropTypes.array,
  spdData: PropTypes.array,
  interval: PropTypes.number,
  scale: PropTypes.object
}

Windrose.defaultProps = {
  radius: 120,
  center: 130,
  size: 260,
  width: 650,
  height: 520,
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
