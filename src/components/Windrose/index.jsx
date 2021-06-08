import React, { Fragment } from 'react'
import Legend from './Legend'
import Chart from './Chart'
import Ship from './Ship'
import Sector from './Sector'
import IntervalLabel from './IntervalLabel'
import PropTypes from 'prop-types'

function Windrose (props) {
  const sectors = new Array(props.sectors).fill(null).map(() => [])
  const sectorSize = 360 / props.sectors
  for (let i = 0; i < props.data.length; i++) {
    let dir = props.data[i].direction + (sectorSize / 2)
    if (dir > 360) dir -= 360
    const cat = Math.floor(dir / sectorSize)
    sectors[cat].push(props.data[i].speed)
  }
  const max = sectors.map((el) => el.length).sort((a, b) => b - a)[0]

  return (
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
              interval={speeds.length}
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
  )
}

Windrose.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  legend: PropTypes.bool,
  data: PropTypes.array,
  size: PropTypes.number,
  radius: PropTypes.number,
  center: PropTypes.number,
  sectors: PropTypes.number
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
