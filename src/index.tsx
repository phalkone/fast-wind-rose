import React from 'react'
import { render } from 'react-dom'
import Windrose from './components/Windrose'
import { mockData } from './mocks'

const element = document.createElement('div')

render(
  <Windrose
    dirData={mockData.metrics[1].values}
    spdData={mockData.metrics[0].values}
    interval={1}
    sectorCount={12}
    size={500}
    legend
    ship
  />, element)

document.body.appendChild(element)
