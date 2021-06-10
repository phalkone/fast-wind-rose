import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Chart from '../src/components/Windrose/Chart'

let container = null
beforeEach(() => {
  container = document.createElement('svg')
  container.setAttribute('viewBox', '0 0 325 260')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('renders the correct number of lines', () => {
  act(() => {
    render(
      <Chart
        sectorSize={30}
        center={130}
        radius={120}
      />, container)
  })
  expect(container).toContain('line')
})
