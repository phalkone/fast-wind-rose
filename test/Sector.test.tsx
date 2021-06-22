import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { Sector } from '../src/components/Windrose/Sector'
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

it('renders the correct number of speed categories', () => {
  act(() => {
    render(
      <Sector
        sector={0}
        speeds={[2, 2, 2, 7, 7, 7, 12, 12, 12, 17]}
      />
      , container)
  })
  expect(Array.from(container.children).filter((el : Element) => el.tagName === 'PATH').length).toEqual(5)
})

it('renders the correct rotation', () => {
  act(() => {
    render(
      <Sector
        sector={2}
        speeds={[2, 2, 2]}
      />
      , container)
  })
  const rotation = Array.from(container.children)
    .filter((el : Element) => el.tagName === 'PATH')
    .map((el: Element) => el.getAttribute('transform'))
  expect(rotation).toEqual(['rotate(60, 130, 130)', 'rotate(60, 130, 130)'])
})

test('render a Sector', () => {
  const comp = renderer.create(
    <WindroseContext.Provider value={ context }>
      <Sector
        sector={0}
        speeds={[2, 2, 2, 7, 7, 7, 12, 12, 12]}
      />
    </WindroseContext.Provider>
  )
  const tree = comp.toJSON()
  expect(tree).toMatchSnapshot()
})
