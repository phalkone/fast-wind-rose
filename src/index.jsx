import React from 'react'
import { render } from 'react-dom'
import Windrose from './components/Windrose'

const data = {
  metrics: [{
    tag: 'wind_speed_rel',
    aggregation: { interval: 'PT1H', method: 'avg' },
    values: [
      { timestamp: '2021-05-30T11:00:00Z', value: 28.48, interpolated: true },
      { timestamp: '2021-05-30T12:00:00Z', value: 28.38, interpolated: true },
      { timestamp: '2021-05-30T13:00:00Z', value: 30.65, interpolated: true },
      { timestamp: '2021-05-30T14:00:00Z', value: 31.36, interpolated: true },
      { timestamp: '2021-05-30T15:00:00Z', value: 31.37, interpolated: true },
      { timestamp: '2021-05-30T16:00:00Z', value: 31.85, interpolated: true },
      { timestamp: '2021-05-30T17:00:00Z', value: 32.71, interpolated: true },
      { timestamp: '2021-05-30T18:00:00Z', value: 33.24, interpolated: true },
      { timestamp: '2021-05-30T19:00:00Z', value: 33.18, interpolated: true },
      { timestamp: '2021-05-30T20:00:00Z', value: 33.69, interpolated: true },
      { timestamp: '2021-05-30T21:00:00Z', value: 34.17, interpolated: true },
      { timestamp: '2021-05-30T22:00:00Z', value: 35.02, interpolated: true },
      { timestamp: '2021-05-30T23:00:00Z', value: 33.41, interpolated: true },
      { timestamp: '2021-05-31T00:00:00Z', value: 32.98, interpolated: true },
      { timestamp: '2021-05-31T01:00:00Z', value: 34.44, interpolated: true },
      { timestamp: '2021-05-31T02:00:00Z', value: 35.80, interpolated: true },
      { timestamp: '2021-05-31T03:00:00Z', value: 35.57, interpolated: true },
      { timestamp: '2021-05-31T04:00:00Z', value: 35.13, interpolated: true },
      { timestamp: '2021-05-31T05:00:00Z', value: 35.86, interpolated: true },
      { timestamp: '2021-05-31T06:00:00Z', value: 36.61, interpolated: true },
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
    width={625}
    height={520}
    dirData={data.metrics[1].values}
    spdData={data.metrics[0].values}
    interval={1}
    legend
  />, document.getElementById('root'))
