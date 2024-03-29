import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { IntervalLabel } from '../src/components/Windrose/IntervalLabel'
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

it('shows the correct label', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={ context }>
        <IntervalLabel
          sector={0}
          speeds={[10, 10, 10]}
        />
      </WindroseContext.Provider>
      , container)
  })
  expect(container.textContent).toEqual('3.0h')
})

it('has the correct rotation', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={ context }>
        <IntervalLabel
          sector={5}
          speeds={[10, 10, 10]}
        />
      </WindroseContext.Provider>
      , container)
  })
  const rotation = Array.from(container.children)
    .filter((el : Element) => el.tagName === 'PATH')
    .map((el: Element) => el.getAttribute('transform'))
  expect(rotation).toEqual(['rotate(150, 130, 130)'])
})

it('does not show upside down', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={ context }>
        <IntervalLabel
          sector={5}
          speeds={[10, 10, 10]}
        />
      </WindroseContext.Provider>
      , container)
  })
  const rotation = Array.from(container.children)
    .filter((el : Element) => el.tagName === 'PATH')
    .map((el: Element) => el.getAttribute('d'))
  expect(rotation).toEqual(['M 161.45 3.86 A 130 130, 0, 0, 0, 98.55 3.86'])
})

test('Render an interval label', () => {
  const comp = renderer.create(
    <WindroseContext.Provider value={ context }>
      <IntervalLabel
        sector={0}
        speeds={[10, 10, 10]}
      />
    </WindroseContext.Provider>
  )
  const tree = comp.toJSON()
  expect(tree).toMatchSnapshot()
})
