import React, { Fragment } from 'react'

interface IIntervalLabel {
  /**
   * Defines which sector is being drawn. 0 being the first sector.
   */
  sector: number,
  /**
   * Interval between data points specified in hours
   */
  interval: number,
  /**
   * Size of each sector in degrees
   */
  sectorSize: number,
  /**
   * The center of the sectors. x and y coordinates are assumed to be the same.
   */
  center: number
}

/**
 * Shows the interval of each sector
 */
export const IntervalLabel = (props: IIntervalLabel) => {
  let radius = props.center - 8
  const sin = Math.sin(Math.PI / 180 * ((props.sectorSize - 2) / 2))
  const cos = Math.cos(Math.PI / 180 * ((props.sectorSize - 2) / 2))
  let sign = 1
  /* Verify if path is in the top or bottom section of the chart */
  if (props.sector > (90 / props.sectorSize) &&
    props.sector < (270 / props.sectorSize)) {
    radius += 8
    sign = -1
  }
  const x1 = props.center - sign * radius * sin
  const y1 = props.center - radius * cos
  const x2 = props.center + sign * radius * sin
  const y2 = props.center - radius * cos

  return (
    <>
      {/* Path to draw text along */}
      <path
        id={`curved${props.sector}`}
        fill='none'
        d={`M ${x1} ${y1} A ${radius} ${radius},` +
           ` 0, 0, ${sign === 1 ? 1 : 0}, ${x2} ${y2}`}
        transform={`rotate(${props.sector * props.sectorSize},` +
                   ` ${props.center}, ${props.center})`}
      />
      {/* Text to write on path */}
      <text
        fill='black'
        textAnchor='middle'
        fontSize={props.sectorSize < 15 ? '9px' : '11px'}
      >
        <textPath
          href={`#curved${props.sector}`}
          startOffset='50%'
        >
          {`${props.interval.toFixed(1)}h`}
        </textPath>
      </text>
    </>
  )
}
