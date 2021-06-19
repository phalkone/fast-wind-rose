import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import mockData from '../src/mocks'
import Windrose from '../src/components/Windrose'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('renders the correct number of buttons', () => {
  act(() => {
    render(
      <Windrose
        dirData={mockData.metrics[1].values}
        spdData={mockData.metrics[0].values}
        interval={1}
        sectorCount={12}
        size={500}
        legend
      />, container)
  })
  expect(container).toEqual(1)
})
