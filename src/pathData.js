export const d = {
    M: (x, y) => `M${x} ${y}`,
    c: (dx1, dy1, dx2, dy2, x, y) =>
      `c${dx1} ${dy1} ${dx2} ${dy2} ${x} ${y}`,
    l: (x, y) => `l${x} ${y}`,
    L: (x, y) => `L${x} ${y}`,
    h: (x) => `h${x}`,
    H: (x) => `H${x}`,
    v: (y) => `v${y}`,
    m: (x, y) => `m${x} ${y}`,
    z: 'z'
  }
  