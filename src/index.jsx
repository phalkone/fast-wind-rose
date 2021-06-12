import React from 'react'
import { render } from 'react-dom'
import Windrose from './components/Windrose'
import './index.css'

const data = {
  metrics: [{
    tag: 'wind_speed_rel',
    aggregation: { interval: 'PT1H', method: 'avg' },
    values: [
      { timestamp: '2021-05-30T11:00:00Z', value: 45, interpolated: true },
      { timestamp: '2021-05-30T12:00:00Z', value: 0, interpolated: true },
      { timestamp: '2021-05-30T13:00:00Z', value: 15.65, interpolated: true },
      { timestamp: '2021-05-30T14:00:00Z', value: 15.36, interpolated: true },
      { timestamp: '2021-05-30T15:00:00Z', value: 15.37, interpolated: true },
      { timestamp: '2021-05-30T16:00:00Z', value: 15.85, interpolated: true },
      { timestamp: '2021-05-30T17:00:00Z', value: 15.71, interpolated: true },
      { timestamp: '2021-05-30T18:00:00Z', value: 15.24, interpolated: true },
      { timestamp: '2021-05-30T19:00:00Z', value: 15.18, interpolated: true },
      { timestamp: '2021-05-30T20:00:00Z', value: 15.69, interpolated: true },
      { timestamp: '2021-05-30T21:00:00Z', value: 15.17, interpolated: true },
      { timestamp: '2021-05-30T22:00:00Z', value: 15.02, interpolated: true },
      { timestamp: '2021-05-30T23:00:00Z', value: 15.41, interpolated: true },
      { timestamp: '2021-05-31T00:00:00Z', value: 10.98, interpolated: true },
      { timestamp: '2021-05-31T01:00:00Z', value: 10.44, interpolated: true },
      { timestamp: '2021-05-31T02:00:00Z', value: 10.80, interpolated: true },
      { timestamp: '2021-05-31T03:00:00Z', value: 10.57, interpolated: true },
      { timestamp: '2021-05-31T04:00:00Z', value: 10.13, interpolated: true },
      { timestamp: '2021-05-31T05:00:00Z', value: 10.86, interpolated: true },
      { timestamp: '2021-05-31T06:00:00Z', value: 10.61, interpolated: true },
      { timestamp: '2021-05-31T07:00:00Z', value: 37.43, interpolated: true },
      { timestamp: '2021-05-31T08:00:00Z', value: 38.11, interpolated: true },
      { timestamp: '2021-05-31T09:00:00Z', value: 37.87, interpolated: true },
      { timestamp: '2021-05-31T10:00:00Z', value: 37.96, interpolated: true }]
  },
  {
    tag: 'wind_dir_rel',
    aggregation: { interval: 'PT1H', method: 'avg' },
    values: [
      { timestamp: '2021-05-30T11:00:00Z', value: 348.4, interpolated: true },
      { timestamp: '2021-05-30T12:00:00Z', value: 342.7, interpolated: true },
      { timestamp: '2021-05-30T13:00:00Z', value: 313.8, interpolated: true },
      { timestamp: '2021-05-30T14:00:00Z', value: 279.8, interpolated: true },
      { timestamp: '2021-05-30T15:00:00Z', value: 209.4, interpolated: true },
      { timestamp: '2021-05-30T16:00:00Z', value: 227.5, interpolated: true },
      { timestamp: '2021-05-30T17:00:00Z', value: 326.1, interpolated: true },
      { timestamp: '2021-05-30T18:00:00Z', value: 308.8, interpolated: true },
      { timestamp: '2021-05-30T19:00:00Z', value: 284.7, interpolated: true },
      { timestamp: '2021-05-30T20:00:00Z', value: 306.9, interpolated: true },
      { timestamp: '2021-05-30T21:00:00Z', value: 341.3, interpolated: true },
      { timestamp: '2021-05-30T22:00:00Z', value: 326.3, interpolated: true },
      { timestamp: '2021-05-30T23:00:00Z', value: 255.1, interpolated: true },
      { timestamp: '2021-05-31T00:00:00Z', value: 290.8, interpolated: true },
      { timestamp: '2021-05-31T01:00:00Z', value: 328.6, interpolated: true },
      { timestamp: '2021-05-31T02:00:00Z', value: 313.0, interpolated: true },
      { timestamp: '2021-05-31T03:00:00Z', value: 348.6, interpolated: true },
      { timestamp: '2021-05-31T04:00:00Z', value: 350.1, interpolated: true },
      { timestamp: '2021-05-31T05:00:00Z', value: 344.2, interpolated: true },
      { timestamp: '2021-05-31T06:00:00Z', value: 348.0, interpolated: true },
      { timestamp: '2021-05-31T07:00:00Z', value: 350.0, interpolated: true },
      { timestamp: '2021-05-31T08:00:00Z', value: 348.0, interpolated: true },
      { timestamp: '2021-05-31T09:00:00Z', value: 349.2, interpolated: true },
      { timestamp: '2021-05-31T10:00:00Z', value: 345.2, interpolated: true }]
  }]
}

render(
  <Windrose
    width={650}
    height={520}
    dirData={data.metrics[1].values}
    spdData={data.metrics[0].values}
    interval={1}
    legend
  />, document.getElementById('root'))
