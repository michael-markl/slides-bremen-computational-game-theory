export default {
  inflow: [
    [{ times: [0.0, 1600.0], values: [20.0, 0], domain: [0.0, Infinity] }],
    [{ times: [0.0], values: [0.0], domain: [0.0, Infinity] }],
    [{ times: [0.0], values: [0.0], domain: [0.0, Infinity] }],
  ],
  outflow: [
    [
      {
        times: [0.0, 200.0, 3400.0],
        values: [0.0, 10.0, 0],
        domain: [0.0, Infinity],
      },
    ],
    [{ times: [0.0], values: [0.0], domain: [0.0, Infinity] }],
    [{ times: [0.0], values: [0.0], domain: [0.0, Infinity] }],
  ],
  queues: [
    {
      times: [0.0, 1600.0],
      values: [0.0, 16000.0],
      firstSlope: 0.0,
      lastSlope: -10.0,
      domain: [-Infinity, Infinity],
    },
    {
      times: [0.0],
      values: [0.0],
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
