import React from 'react'
import { Ship } from '../src/components/Windrose/Ship'
import { WindroseContext } from '../src/components/Windrose'
import type { IWindroseContext } from '../src/types/Windrose.types'
import renderer from 'react-test-renderer'

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

test('render a ship', () => {
  const comp = renderer.create(
    <WindroseContext.Provider value={ context }>
      <Ship/>
    </WindroseContext.Provider>
  )
  const tree = comp.toJSON()
  expect(tree).toMatchSnapshot()
})
