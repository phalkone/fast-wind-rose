import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { Chart } from '../src/components/Windrose/Chart'

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

it('renders the correct number of lines', () => {
  act(() => {
    render(
      <Chart
        sectorCount={12}
        center={130}
      />, container)
  })
  expect(Array.from(container.childNodes).filter((el) => el.tagName === "LINE").length).toEqual(12)
})

it('renders the correct number of lines', () => {
  act(() => {
    render(
      <Chart
        sectorCount={15}
        center={130}
      />, container)
  })
  expect(Array.from(container.childNodes).filter((el) => el.tagName === "LINE").length).toEqual(15)
})

it('renders the correct number of circles', () => {
  act(() => {
    render(
      <Chart
        sectorCount={30}
        center={130}
      />, container)
  })
  expect(Array.from(container.childNodes).filter((el) => el.tagName === "CIRCLE").length).toEqual(4)
})
