import React, { createContext } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { Chart } from '../src/components/Windrose/Chart'
import renderer from 'react-test-renderer'

const WindroseContext = createContext({ sectorSize: 30, center: 130 })

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

it('renders the correct number of lines', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={{ sectorSize: 30, center: 130 }}>
        <Chart/>
      </WindroseContext.Provider>
      , container)
  })
  expect(Array.from(container.children).filter((el : Element) => el.tagName === 'LINE').length).toEqual(12)
})

it('renders the correct number of circles', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={{ sectorSize: 30, center: 130 }}>
        <Chart/>
      </WindroseContext.Provider>
      , container)
  })
  expect(Array.from(container.children).filter((el: Element) => el.tagName === 'CIRCLE').length).toEqual(4)
})

test('render a chart', () => {
  const comp = renderer.create(
    <WindroseContext.Provider value={{ sectorSize: 30, center: 130 }}>
      <Chart/>
    </WindroseContext.Provider>
  )
  const tree = comp.toJSON()
  expect(tree).toMatchSnapshot()
})
