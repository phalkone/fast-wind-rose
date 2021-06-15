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

## License

[MIT](http://opensource.org/licenses/MIT)