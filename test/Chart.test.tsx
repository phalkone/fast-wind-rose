import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { Chart } from '../src/components/Windrose/Chart'
import { WindroseContext } from '../src/components/Windrose'
import type { IWindroseContext } from '../src/types/Windrose.types'
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

const context : IWindroseContext = {
  center: 130,
  scale: {
    0: 'rgb(60,95,156)',
    5: 'rgb(94,131,188)',
    10: 'rgb(143,180,232)',
    15: 'rgb(174,203,214)',
    20: 'rgb(220,226,220)',
    25: 'rgb(251,233,94)',
    30: 'rgb(252,195,67)',
    35: 'rgb(245,136,42)',
    40: 'rgb(242,103,33)',
    45: 'rgb(243,63,29)',
    50: 'rgb(244,36,27)'
  },
  sectorSize: 30,
  interval: 1,
  size: 260,
  max: 24
}

it('renders the correct number of lines', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={ context }>
        <Chart/>
      </WindroseContext.Provider>
      , container)
  })
  expect(Array.from(container.children).filter((el : Element) => el.tagName === 'LINE').length).toEqual(12)
})

it('renders the correct number of circles', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={ context }>
        <Chart/>
      </WindroseContext.Provider>
      , container)
  })
  expect(Array.from(container.children).filter((el : Element) => el.tagName === 'CIRCLE').length).toEqual(4)
})

it('renders lines with the correct rotation', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={ context }>
        <Chart/>
      </WindroseContext.Provider>
      , container)
  })
  const rotation = Array.from(container.children)
    .filter((el : Element) => el.tagName === 'LINE')
    .map((el: Element) => el.getAttribute('transform'))
  expect(rotation).toEqual(['rotate(15,130,130)', 'rotate(45,130,130)',
    'rotate(75,130,130)', 'rotate(105,130,130)', 'rotate(135,130,130)',
    'rotate(165,130,130)', 'rotate(195,130,130)', 'rotate(225,130,130)',
    'rotate(255,130,130)', 'rotate(285,130,130)', 'rotate(315,130,130)',
    'rotate(345,130,130)'])
})

it('renders lines and circles with the correct center', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={ context }>
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
      <WindroseContext.Provider value={ context }>
        <Chart/>
      </WindroseContext.Provider>
      , container)
  })
  const radius = Array.from(container.children)
    .filter((el : Element) => el.tagName === 'CIRCLE')
    .map((el: Element) => el.getAttribute('r'))
  expect(radius).toEqual(['120', '90', '60', '30'])
})

test('render a chart', () => {
  const comp = renderer.create(
    <WindroseContext.Provider value={ context }>
      <Chart/>
    </WindroseContext.Provider>
  )
  const tree = comp.toJSON()
  expect(tree).toMatchSnapshot()
})
