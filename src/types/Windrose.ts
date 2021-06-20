export interface IWindrose {
  /**
   * Hide or display legend
   */
  legend: boolean,
  /**
   * Width/height of chart. Will be displayed in specified viewbox.
   */
  size: number,
  /**
   * Default number of sectors. Must be included in sectorArray.
   */
  sectorCount: number,
  /**
   * Fixed interval between data points specified in hours. For example if
   * data points are every 30 min, then value should be 0.5
   */
  interval: number,
  /**
   * Scale of speeds with the linked color. Example as follows:
   *  { 0: 'rgb(60,95,156)', 5: 'rgb(94,131,188)' }
   */
  scale: { [n: number]: string },
  /**
   * Array with directional data for the wind
   */
  dirData: object[],
  /**
  * Array with speed data for the wind
  */
  spdData: object[],
  /**
   * Key for speed data
   */
  spdKey: string,
  /**
   * Key for directional data
   */
  dirKey: string,
  /**
   * Scales the compilation scale against the viewbox. Choose a value lower
   * than 1 to scale down and larger than 1 to scale up.
   */
  enlarge: number,
  /**
   * Array that defines the number of sectors the user can choose from.
   */
  sectorArray: number[],
  /**
   * Common key between direction and speed data
   */
  commonKey: string
}

export interface ILegend {
  /**
   * Size of the chart. Width = Height.
   */
  size: number,
  /**
   * Scale of speeds with the linked color. Example as follows:
   *  { 0: 'rgb(60,95,156)', 5: 'rgb(94,131,188)' }
   */
  scale: { [n: number]: string }
}

export interface IShip {
  /**
   * The center of the ship path. x and y coordinates are assumed to be the same.
   */
  center: number
}

export interface IChart extends IShip {
  /**
   * The number of sectors
   */
  sectorSize: number
}

export interface IIntervalLabel extends IChart {
  /**
   * Defines which sector is being drawn. 0 being the first sector.
   */
  sector: number,
  /**
   * Interval between data points specified in hours
   */
  interval: number,
  /**
   * Array with the speeds that are part of this sector
   */
  speeds: number[]
}

export interface ISector extends IIntervalLabel, ILegend {
  /**
   * Total bar length of this sector. The sector with the largest interval will
   * have a bar length equal to the radius.
   */
  barLength: number,
  /**
   * Defines the bar length of 1 unit of interval.
   */
  unit: number,
}

export interface IToolTip {
  /**
   * x coordinate of top left corner of tooltip
   */
  x: number,
  /**
   * y coordinate of top left corner of tooltip
   */
  y: number,
  /**
   * text of tooltip
   */
  text: [string, number],
  /**
   * Scale factor due to viewBox of SVG vs actual size of SVG.
   */
  factor: number
}
