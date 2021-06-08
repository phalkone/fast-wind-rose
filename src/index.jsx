import React from 'react'
import { render } from 'react-dom'
import Windrose from './components/Windrose'

const data = [
  { timestamp: '2021-05-30T11:00:00Z', direction: 0, speed: 55 },
  { timestamp: '2021-05-30T12:00:00Z', direction: 20, speed: 30 },
  { timestamp: '2021-05-30T13:00:00Z', direction: 50, speed: 26 },
  { timestamp: '2021-05-30T14:00:00Z', direction: 80, speed: 27 },
  { timestamp: '2021-05-30T15:00:00Z', direction: 110, speed: 16 },
  { timestamp: '2021-05-30T16:00:00Z', direction: 140, speed: 40 },
  { timestamp: '2021-05-30T17:00:00Z', direction: 170, speed: 35 },
  { timestamp: '2021-05-30T18:00:00Z', direction: 190, speed: 34 },
  { timestamp: '2021-05-30T19:00:00Z', direction: 220, speed: 33 },
  { timestamp: '2021-05-30T20:00:00Z', direction: 250, speed: 10 },
  { timestamp: '2021-05-30T21:00:00Z', direction: 280, speed: 5 },
  { timestamp: '2021-05-31T06:00:00Z', direction: 310, speed: 11 },
  { timestamp: '2021-05-31T07:00:00Z', direction: 340, speed: 16 },
  { timestamp: '2021-05-31T08:00:00Z', direction: 348.02, speed: 25 },
  { timestamp: '2021-05-31T09:00:00Z', direction: 349.20, speed: 27 },
  { timestamp: '2021-05-31T10:00:00Z', direction: 345.29, speed: 28 }]

render(<Windrose width={625} height={520} sectors={12} data={data} legend />, document.getElementById('root'))
