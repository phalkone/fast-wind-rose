interface IWindroseCommon {
  /**
   * Width/height of chart. Will be displayed in specified viewbox.
   */
   size: number,
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
}

export interface IWindrose extends IWindroseCommon {
  /**
   * Hide or display legend
   */
  legend: boolean,
    /**
   * Hide or display ship outline
   */
  ship: boolean,
  /**
   * Default number of sectors. Must be included in sectorArray.
   */
  sectorCount: number,
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

export interface IWindroseContext extends IWindroseCommon {
  /**
   * The center of the ship path. x and y coordinates are assumed to be the same.
   */
  center: number,
  /**
   * The size of each Sector
   */
  sectorSize: number,
  /**
   * Maximum number of data points in a certain sector.
   */
  max: number
}

export interface ISector {
  /**
   * Defines which sector is being drawn. 0 being the first sector.
   */
  sector: number,
  /**
   * Array with the speeds that are part of this sector
   */
  speeds: number[]
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
