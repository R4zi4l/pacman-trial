class Cell {
  constructor(i, j, grid) {
    Object.defineProperties(this, {
      point: {
        value: cc.p(
          (i + 0.5) * grid.scaleX,
          (j + 0.5) * grid.scaleY
        )
      },

      [DIRECTION_RIGHT]: {
        value: false,
        writable: true
      },

      [DIRECTION_UP]: {
        value: false,
        writable: true
      },

      [DIRECTION_LEFT]: {
        value: false,
        writable: true
      },

      [DIRECTION_DOWN]: {
        value: false,
        writable: true
      }
    });
  }

  distanceSq(point) {
    return (point.x - this.point.x) ** 2 + (point.y - this.point.y) ** 2;
  }

  static distanceSq(a, b) {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  }
}
