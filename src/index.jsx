import React from 'react'
import { render } from 'react-dom'
import Windrose from './components/Windrose'
import './index.css'
import mockData from './mocks'

render(
  <Windrose
    dirData={mockData.metrics[1].values}
    spdData={mockData.metrics[0].values}
    interval={1}
    legend
  />, document.getElementById('root'))
