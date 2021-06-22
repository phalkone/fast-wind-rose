/**
 * Validate wind direction
 * @param {Number} dir Wind direction
 */
const validateDir = (dir: number) : boolean => {
  return (typeof dir === 'number' && dir >= 0 && dir <= 360)
}

/**
 * Validate wind speed
 * @param {Number} spd Wind speed
 */
const validateSpd = (spd: number) : boolean => {
  return (typeof spd === 'number' && spd >= 0 && spd <= 120)
}

/**
 * Divides data into sectors
 * @param {Number} sectorCount Number of sectors
 * @param {Array} dirData Array of wind direction data objects
 * @param {String} dirKey Key indicating the value of the wind direction
 * @param {Array} spdData Array of wind speed data objects
 * @param {String} spdKey Key indicating the value of the wind speed
 * @param {String} commonKey Key that is common between direction and speed
 * @returns 2D Array with speeds sorted by sector.
 */
export const divideBySector = (sectorCount: number, dirData: Array<{[s: string] : any }>,
  dirKey: string, spdData: Array<{[s: string] : any }>, spdKey: string, commonKey: string)
  : Array<Array<number>> => {
  const sectors : Array<Array<number>> = new Array(sectorCount).fill(null).map(() => [])

  for (let i = 0; i < dirData.length; i++) {
    const speed : number = spdData[i][spdKey]
    const direction : number = dirData[i][dirKey]

    if (validateDir(direction) && validateSpd(speed) &&
      dirData[i][commonKey] === spdData[i][commonKey]) {
      let dir = direction + (180 / sectorCount)
      if (dir >= 360) dir -= 360
      const cat = Math.floor((dir * sectorCount) / 360)
      sectors[cat].push(speed)
    }
  }
  return sectors
}

/**
 * Categorize speeds by provided scale.
 * @param speeds Array of speeds that need to be categorized
 * @param scaleInput Scale input
 * @param max The maximum number of data points in a certain category
 * @param center The center of the chart. x = y
 * @param interval The interval between data points
 * @returns 2D Array with speeds sorted by scale.
 */
export const divideBySpeed = (speeds : number[], scaleInput : { [n: number]: string },
  max: number, center: number, interval : number) : Array<[number, number, string, number]> => {
  let length = (speeds.length / max) * (center - 10)
  const scale = [...Object.keys(scaleInput)].map(Number)
  const speedCategories : Array<[number, number, string, number]> = []
  for (let i = scale.length - 1; i >= 0; i--) {
    let prev = i === scale.length - 1 ? Infinity : scale[i + 1]
    const count = speeds.filter((val) => val >= scale[i] && val < prev).length
    if (prev === Infinity) prev = scale[scale.length - 1]
    if (count) {
      speedCategories.push([scale[i], length, `${scale[i]}-${prev}`, count * interval])
      length -= count * ((center - 10) / max)
    }
  }
  return speedCategories
}
