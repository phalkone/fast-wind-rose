import React, { Fragment } from 'react'
import Legend from './Legend'
import Chart from './Chart'
import Ship from './Ship'
import Sector from './Sector'
import IntervalLabel from './IntervalLabel'
import PropTypes from 'prop-types'

export default class Windrose extends React.Component {
  constructor (props) {
    super(props)
    const sectors = [...new Array(360 / this.props.sectorSize).keys()].map((el) => [])
    for (let i = 0; i < this.props.data.length; i++) {
      let dir = this.props.data[i].direction + (this.props.sectorSize / 2)
      if (dir > 360) dir -= 360
      const cat = Math.floor(dir / this.props.sectorSize)
      sectors[cat].push(this.props.data[i].speed)
    }
    this.max = sectors.map((el) => el.length).sort((a, b) => b - a)[0]
    this.sectors = sectors
  }

  renderSectors () {
    return (
      this.sectors.map((speeds, i) => (
        <Fragment key={i}>
          {speeds.length &&
            <IntervalLabel
              sector={i}
              interval={speeds.length}
              sectorSize={this.props.sectorSize}
            />}
          {speeds.length &&
            <Sector
              sector={i}
              speeds={speeds}
              sectorSize={this.props.sectorSize}
              barLength={(speeds.length / this.max) * 120}
              interval={120 / this.max}
            />}
        </Fragment>
      ))
    )
  }

  render () {
    return (
      <svg
        version='1.1'
        viewBox='0 0 325 260'
        width={this.props.width}
        height={this.props.height}
      >
        {this.props.legend && <Legend />}
        <Chart sectorSize={this.props.sectorSize} />
        {this.renderSectors()}
        <Ship />
      </svg>
    )
  }
}

Windrose.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  sectorSize: PropTypes.number,
  legend: PropTypes.bool,
  data: PropTypes.array
}
