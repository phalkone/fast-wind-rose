import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { mockData } from '../src/mocks'
import renderer from 'react-test-renderer'
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

test('Render a windrose', () => {
  const comp = renderer.create(
    <Windrose
      dirData={mockData.metrics[1].values}
      spdData={mockData.metrics[0].values}
      interval={1}
      sectorCount={12}
      size={500}
      legend
    />
  )
  const tree = comp.toJSON()
  expect(tree).toMatchSnapshot()
})
