class PointsSet {
  constructor() {
    this.xaxis = Object.create(null);
  }

  set(point, value) {
    let yaxis = this.xaxis[Math.floor(point.x)];

    if (!yaxis) {
      this.xaxis[Math.floor(point.x)] = yaxis = Object.create(null);
    }

    yaxis[Math.floor(point.y)] = value;
  }

  get(point, deltaX = 0, deltaY = 0) {
    let results = [];

    for (let i in this.xaxis) {
      if (i <= point.x + deltaX && i >= point.x - deltaX) {
        for (let j in this.xaxis[i]) {
          if (j <= point.y + deltaY && j >= point.y - deltaY) {
            results.push(this.xaxis[i][j]);
          }
        }
      }
    }

    return results;
  }

  remove(point) {
    delete this.xaxis[Math.floor(point.x)][Math.floor(point.y)];
  }
}
