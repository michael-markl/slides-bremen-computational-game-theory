export default {
  inflow: [
    [
      {
        times: [0.0, 400.0, 600.0, 1200.0, 1300.0],
        values: [10.0, 20.0, 0, 20.0, 0],
        domain: [0.0, Infinity],
      },
      { times: [0.0], values: [0.0], domain: [0.0, Infinity] },
    ],
    [
      {
        times: [0.0, 200.0, 600.0, 800.0, 1400.0, 1500.0],
        values: [0.0, 10.0, 20.0, 0, 20.0, 0],
        domain: [0.0, Infinity],
      },
      {
        times: [0.0, 1400.0, 1500.0],
        values: [0.0, 10.0, 0],
        domain: [0.0, Infinity],
      },
    ],
    [
      { times: [0.0], values: [0.0], domain: [0.0, Infinity] },
      {
        times: [0.0, 1200.0, 1300.0],
        values: [0.0, 10.0, 0],
        domain: [0.0, Infinity],
      },
    ],
  ],
  outflow: [
    [
      {
        times: [0.0, 200.0, 600.0, 800.0, 1400.0, 1500.0],
        values: [0.0, 10.0, 20.0, 0, 20.0, 0],
        domain: [0.0, Infinity],
      },
      { times: [0.0], values: [0.0], domain: [0.0, Infinity] },
    ],
    [
      {
        times: [0.0, 400.0, 1200.0, 1600.0, 1900.0],
        values: [0.0, 10.0, 0, 6.666666666666667, 0],
        domain: [0.0, Infinity],
      },
      {
        times: [0.0, 1600.0, 1900.0],
        values: [0.0, 3.3333333333333335, 0],
        domain: [0.0, Infinity],
      },
    ],
    [
      { times: [0.0], values: [0.0], domain: [0.0, Infinity] },
      {
        times: [0.0, 1400.0, 1500.0],
        values: [0.0, 10.0, 0],
        domain: [0.0, Infinity],
      },
    ],
  ],
  queues: [
    {
      times: [0.0],
      values: [0.0],
      firstSlope: 0.0,
      lastSlope: 0.0,
      domain: [-Infinity, Infinity],
    },
    {
      times: [0.0, 600.0, 800.0, 1000.0, 1400.0, 1500.0, 1700.0],
      values: [0.0, 0.0, 2000.0, 0.0, 0.0, 2000.0, 0.0],
      firstSlope: 0.0,
      lastSlope: 0.0,
      domain: [-Infinity, Infinity],
    },
    {
      times: [0.0],
      values: [0.0],
      firstSlope: 0.0,
      lastSlope: 0.0,
      domain: [-Infinity, Infinity],
    },
  ],
};
