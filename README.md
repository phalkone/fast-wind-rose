# FAST wind rose

## Introduction

The FAST wind rose provides a **visual** representation of the relative wind. It was purposely written for FAST.

Main principles the FAST wind rose are:

1. **Simple** deploy as React component.
1. **Adaptive** set attributes to determine the look and size.

## Example

```jsx
  <Windrose
    dirData={mockData.metrics[1].values}
    spdData={mockData.metrics[0].values}
    interval={1}
    sectorCount={12}
    size={500}
    legend
  />
```

### PROPS & METHODS

Prop name | Type | Default | Description
----------|------|---------|-------------
commonKey | string | timestamp | Common key between direction and speed data
dirData   | object[] | | Array with directional data for the wind
dirKey    | string | value | Key for directional data
spdData   | object[] | | Array with speed data for the wind
spdKey    | string | value | Key for speed data
enlarge   | number | 1 | Scales the compilation scale against the viewbox. Choose a value lower than 1 to scale down and larger than 1 to scale up.
interval  | number | 1 | Fixed interval between data points specified in hours. For example if data points are every 30 min, then value should be 0.5
legend    | bool | | Hide or display legend
scale     | object | Shape | Scale of speeds with the linked color. Example as follows: { 0: 'rgb(60,95,156)', 5: 'rgb(94,131,188)' }
sectorArray | number[] | [4, 8, 12, 16, 24, 32, 36] | Array that defines the number of sectors the user can choose from.
sectorCount | custom | 12 | Default number of sectors. Must be included in sectorArray.
size       | number | 260 | Width/height of chart. Will be displayed in specified viewbox.

## License

[MIT](http://opensource.org/licenses/MIT)
