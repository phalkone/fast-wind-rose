import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { Chart } from '../src/components/Windrose/Chart'
import { WindroseContext } from '../src/components/Windrose'
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

it('renders the correct number of lines', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={{ sectorSize: 10, center: 130 }}>
        <Chart/>
      </WindroseContext.Provider>
      , container)
  })
  expect(Array.from(container.children).filter((el : Element) => el.tagName === 'LINE').length).toEqual(36)
})

it('renders the correct number of circles', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={{ sectorSize: 10, center: 130 }}>
        <Chart/>
      </WindroseContext.Provider>
      , container)
  })
  expect(Array.from(container.children).filter((el : Element) => el.tagName === 'CIRCLE').length).toEqual(4)
})

it('renders lines and circles with the correct center', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={{ sectorSize: 30, center: 130 }}>
        <Chart/>
      </WindroseContext.Provider>
      , container)
  })
  const centers = Array.from(container.children)
    .filter((el : Element) => el.tagName === 'CIRCLE')
    .map((el: Element) => [el.getAttribute('cx'), el.getAttribute('cy')])
    .every((el: any) => el[0] === '130' && el[1] === '130')
  const lines = Array.from(container.children)
    .filter((el : Element) => el.tagName === 'LINE')
    .map((el: Element) => [el.getAttribute('x1'), el.getAttribute('x2'), el.getAttribute('y2')])
    .every((el: any) => el[0] === '130' && el[1] === '130' && el[2] === '130')
  expect(centers && lines).toBeTruthy()
})

it('renders circles with the correct diameter', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={{ sectorSize: 30, center: 130 }}>
        <Chart/>
      </WindroseContext.Provider>
      , container)
  })
  const radius = Array.from(container.children)
    .filter((el : Element) => el.tagName === 'CIRCLE')
    .map((el: Element) => el.getAttribute('r'))
  expect(radius).toEqual(['120', '90', '60', '30'])
})

it('renders lines with the correct rotation', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={{ sectorSize: 90, center: 130 }}>
        <Chart/>
      </WindroseContext.Provider>
      , container)
  })
  const radius = Array.from(container.children)
    .filter((el : Element) => el.tagName === 'LINE')
    .map((el: Element) => el.getAttribute('transform'))
  expect(radius).toEqual(['rotate(45, 130,130)', 'rotate(135, 130,130)',
    'rotate(225, 130,130)', 'rotate(315, 130,130)'])
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
