import React, { createContext } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { IntervalLabel } from '../src/components/Windrose/IntervalLabel'
import renderer from 'react-test-renderer'

const WindroseContext = createContext({ sectorSize: 30, center: 130, interval: 1 })

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

it('it shows the correct label', () => {
  act(() => {
    render(
      <WindroseContext.Provider value={{ sectorSize: 30, center: 130, interval: 1 }}>
        <IntervalLabel
          sector={0}
          speeds={[10, 10, 10]}
        />
      </WindroseContext.Provider>
      , container)
  })
  expect(container.textContent).toEqual('3.0h')
})

test('Render an interval label', () => {
  const comp = renderer.create(
    <WindroseContext.Provider value={{ sectorSize: 30, center: 130, interval: 1 }}>
      <IntervalLabel
        sector={0}
        speeds={[10, 10, 10]}
      />
    </WindroseContext.Provider>
  )
  const tree = comp.toJSON()
  expect(tree).toMatchSnapshot()
})
