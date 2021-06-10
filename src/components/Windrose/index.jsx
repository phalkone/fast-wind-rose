import React, { Fragment, useState } from 'react'
import Legend from './Legend'
import Chart from './Chart'
import Ship from './Ship'
import Sector from './Sector'
import IntervalLabel from './IntervalLabel'
import PropTypes from 'prop-types'

function Windrose (props) {
  const sectors = new Array(props.sectors).fill(null).map(() => [])
  const sectorSize = 360 / props.sectors
  for (let i = 0; i < props.dirData.length; i++) {
    let dir = props.dirData[i][props.dirKey] + (sectorSize / 2)
    if (dir > 360) dir -= 360
    const cat = Math.floor(dir / sectorSize)
    sectors[cat].push(props.spdData[i][props.spdKey])
  }
  const max = sectors.map((el) => el.length).sort((a, b) => b - a)[0]

  return (
    <div>
      <svg
        version='1.1'
        viewBox={`0 0 ${props.size + (props.legend ? 65 : 0)} ${props.size}`}
        width={props.width}
        height={props.height}
      >
        {props.legend && <Legend size={props.size} />}
        <Chart
          sectorSize={360 / props.sectors}
          center={props.center}
          radius={props.radius}
        />
        {sectors.map((speeds, i) => (
          <Fragment key={i}>
            {speeds.length &&
              <IntervalLabel
                sector={i}
                interval={props.interval * speeds.length}
                sectorSize={360 / props.sectors}
                radius={props.radius}
                center={props.center}
              />}
            {speeds.length &&
              <Sector
                sector={i}
                speeds={speeds}
                center={props.center}
                sectorSize={360 / props.sectors}
                barLength={(speeds.length / max) * props.radius}
                interval={props.radius / max}
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
  sectors: PropTypes.number,
  dirKey: PropTypes.string,
  spdKey: PropTypes.string,
  dirData: PropTypes.array,
  spdData: PropTypes.array,
  interval: PropTypes.number
}

Windrose.defaultProps = {
  sectors: 12,
  radius: 120,
  center: 130,
  size: 260,
  width: 650,
  height: 520
}

export default Windrose
