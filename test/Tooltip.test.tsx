import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { ToolTip } from '../src/components/Windrose/ToolTip'
import renderer from 'react-test-renderer'

let container : HTMLElement
beforeEach(() => {
  container = document.createElement('svg')
  container.setAttribute('viewBox', '0 0 325 260')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
})

it('renders the correct tooltip text', () => {
  act(() => {
    render(
      <ToolTip
        x={100}
        y={200}
        text={['5-10', 1]}
        factor={1}
      />
      , container)
  })
  expect(container.textContent).toEqual('5-10kts: 1.0h')
})

it('renders the background in the correct position', () => {
  act(() => {
    render(
      <ToolTip
        x={100}
        y={200}
        text={['5-10', 1]}
        factor={1}
      />
      , container)
  })
  const position = Array.from(container.children)
    .filter((el : Element) => el.tagName === 'RECT')
    .map((el: Element) => [el.getAttribute('x'), el.getAttribute('y')])
  expect(position).toEqual([['100', '200']])
})

test('render a tooltip', () => {
  const comp = renderer.create(
    <ToolTip
      x={100}
      y={200}
      text={['5-10', 1]}
      factor={1}
    />
  )
  const tree = comp.toJSON()
  expect(tree).toMatchSnapshot()
})
