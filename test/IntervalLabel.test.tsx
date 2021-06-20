import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { IntervalLabel } from '../src/components/Windrose/IntervalLabel'
import renderer from 'react-test-renderer'

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

it('it shows the correct label', () => {
  act(() => {
    render(
      <IntervalLabel
        sector={0}
        interval={1}
        sectorSize={30}
        center={130}
      />, container)
  })
  expect(container.textContent).toEqual('1.0h')
})

test('Render an interval label', () => {
  const comp = renderer.create(
    <IntervalLabel
        sector={0}
        interval={1}
        sectorSize={30}
        center={130}
      />
  )
  const tree = comp.toJSON()
  expect(tree).toMatchSnapshot()
})
