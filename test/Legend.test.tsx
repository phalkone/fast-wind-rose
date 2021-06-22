import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { Legend } from '../src/components/Windrose/Legend'
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

it('renders the correct number of text elements', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={ context }>
        <Legend/>
      </WindroseContext.Provider>
      , container)
  })
  expect(Array.from(container.children).filter((el : Element) => el.tagName === 'TEXT').length).toEqual(12)
})

it('renders the correct number of rectangle elements', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={ context }>
        <Legend/>
      </WindroseContext.Provider>
      , container)
  })
  expect(Array.from(container.children).filter((el : Element) => el.tagName === 'RECT').length).toEqual(11)
})

it('fills the colors of the rectangles as per scale', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={ context }>
        <Legend/>
      </WindroseContext.Provider>
      , container)
  })
  const colors = Array.from(container.children)
    .filter((el : Element) => el.tagName === 'RECT')
    .map((el: Element) => el.getAttribute('fill'))
  expect(colors).toEqual(Object.values(context.scale))
})

it('renders the text as per scale', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={ context }>
        <Legend/>
      </WindroseContext.Provider>
      , container)
  })
  const text = Array.from(container.children)
    .filter((el : Element) => el.tagName === 'TEXT')
    .map((el: Element) => el.innerHTML)

  const contextScale = Object.keys(context.scale)
  contextScale[contextScale.length - 1] = contextScale[contextScale.length - 1] + '&lt;'
  contextScale.push('kts')
  expect(text).toEqual(contextScale)
})

test('Render a Legend', () => {
  const comp = renderer.create(
    <WindroseContext.Provider value={ context }>
      <Legend/>
    </WindroseContext.Provider>
  )
  const tree = comp.toJSON()
  expect(tree).toMatchSnapshot()
})
