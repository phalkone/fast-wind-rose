import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act, Simulate } from 'react-dom/test-utils'
import { mockData } from '../src/mocks'
import renderer from 'react-test-renderer'
import Windrose from '../src/components/Windrose'

let container : HTMLElement
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
})

it('changes shows/hides the legend when clicked', () => {
  act(() => {
    render(<Windrose
      dirData={mockData.metrics[1].values}
      spdData={mockData.metrics[0].values}
      interval={1}
      sectorCount={12}
      size={500}
      legend
      ship />, container)
  })

  const svg = document.querySelector('svg')
  const button = document.getElementsByClassName('windrose-button')[0]
  expect(button.innerHTML).toBe('&lt;&lt;')

  if (svg) {
    expect(Array.from(svg.children).filter((el : Element) => el.tagName === 'rect').length).toEqual(11)

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(Array.from(svg.children).filter((el : Element) => el.tagName === 'rect').length).toEqual(0)
    expect(button.innerHTML).toBe('&gt;&gt;')

    act(() => {
      for (let i = 0; i < 5; i++) {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      }
    })

    expect(button.innerHTML).toBe('&lt;&lt;')
  }
})

it('changes the number of sectors when choosing from the dropdown', () => {
  act(() => {
    render(<Windrose
      dirData={mockData.metrics[1].values}
      spdData={mockData.metrics[0].values}
      interval={1}
      sectorCount={12}
      size={500}
      legend
      ship />, container)
  })

  const svg = document.querySelector('svg')
  const select = document.getElementsByClassName('windrose-select')[0]

  if (svg) {
    expect(Array.from(svg.children).filter((el : Element) => el.tagName === 'line').length).toEqual(12)

    act(() => {
      Simulate.change(select, { target: { value: '4' } })
    })

    expect(Array.from(svg.children).filter((el : Element) => el.tagName === 'line').length).toEqual(4)

    act(() => {
      Simulate.change(select, { target: { value: '32' } })
    })

    expect(Array.from(svg.children).filter((el : Element) => el.tagName === 'line').length).toEqual(32)
  }
})

test('Render a windrose', () => {
  const comp = renderer.create(
    <Windrose
      dirData={mockData.metrics[1].values}
      spdData={mockData.metrics[0].values}
      interval={1}
      sectorCount={12}
      size={500}
      legend
      ship
    />
  )
  const tree = comp.toJSON()
  expect(tree).toMatchSnapshot()
})
