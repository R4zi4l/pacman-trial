class Grid {
  constructor(size, area) {
    Object.defineProperties(this, {
      area: {
        value: Object.create(null, {
          top: {
            value: area.top
          },

          right: {
            value: area.right
          },

          bottom: {
            value: area.bottom
          },
          
          left: {
            value: area.left
          },

          width: {
            value: area.right - area.left
          },

          height: {
            value: area.top - area.bottom
          },

          topLeft: {
            get: () => cc.p(area.left, area.top)
          },

          topRight: {
            get: () => cc.p(area.right, area.top)
          },

          bottomLeft: {
            get: () => cc.p(area.left, area.bottom)
          },

          bottomRight: {
            get: () => cc.p(area.right, area.bottom)
          }
        })
      },

      size: {
        value: Object.create(null, {
          width: {
            value: size.width
          },

          height: {
            value: size.height
          }
        })
      },

      scaleX: {
        value: (area.right - area.left) / size.width
      },

      scaleY: {
        value: (area.top - area.bottom) / size.height
      },

      scale: {
        value: Math.sqrt(((area.right - area.left) / size.width) ** 2 + ((area.top - area.bottom) / size.height) ** 2)
      },

      cells: {
        value: new Array(size.width * size.height)
      },

      spawns: {
        value: {
          dots: [],
          energizers: [],
          player: null,
          enemy: null,
          prison: null,
          bonus: null
        },
        writable: true
      }
    });
  }

  cell(i, j) {
    return this.cells[i * this.size.height + j];
  }

  createCell(i, j) {
    return this.cells[i * this.size.height + j] = new Cell(i, j, this);
  }

  cellAtPoint(point) {
    return this.cell(
      Math.max(Math.min(Math.floor((point.x - this.area.left) / this.scaleX), this.size.width - 1), 0),
      Math.max(Math.min(Math.floor((point.y - this.area.bottom) / this.scaleY), this.size.height - 1), 0)
    );
  }

  detectCollision(a, b) {
    const deltaX = this.scaleX / 2;
    const deltaY = this.scaleY / 2;

    for (let i = 0; i < a.length; ++i) {
      for (let j = 0; j < b.length; ++j) {
        if ( Math.abs(a[i].x - b[j].x) <= deltaX && Math.abs(a[i].y - b[j].y) <= deltaY) {
          return true;
        }
      }
    }
    return false;
  }

  static createFromTiledMap(tiledmap, area) {
    let size = tiledmap.getMapSize(),
        properties = tiledmap.getProperties();
    
    let routes = tiledmap.getLayer("routes"),
        assets = tiledmap.getLayer("assets");

    let grid = new Grid(size, area);

    let player,
        enemy,
        prison,
        bonus,
        dots = [],
        energizers = [],
        slowdowns = [];

    const uniteAreas = (area, point) => area ? {
      left: Math.min(area.left, point.x),
      bottom: Math.min(area.bottom, point.y),
      right: Math.max(area.right, point.x),
      top: Math.max(area.top, point.y)
    } : {
      left: point.x,
      bottom: point.y,
      right: point.x,
      top: point.y
    };

    const getAreaCenter = area => cc.p(
      area.left + (area.right - area.left) / 2,
      area.top + (area.bottom - area.top) / 2
    );

    for (let i = 0; i < size.width; ++i) {
      for (let j = 0; j < size.height; ++j) {
        if (+properties.routeTileId !== routes.getTileGIDAt(i, j) - 1) {
          continue;
        }

        let cell = grid.createCell(i, size.height - 1 - j);

        switch (assets.getTileGIDAt(i, j) - 1) {
          case +properties.starTileId:
            dots.push(cell.point);
            break;
          case +properties.superStarTileId: 
            energizers.push(cell.point);
            break;
          case +properties.slowdownTileId:
            slowdowns.push(cell.point);
            break;
          case +properties.enemyPrisonSpawnId: 
            prison = uniteAreas(prison, cell.point);
            break;
          case +properties.enemySpawnTileId: 
            enemy = uniteAreas(enemy, cell.point);
            break;
          case +properties.bonusSpawnTileId: 
            bonus = uniteAreas(bonus, cell.point);
            break;
          case +properties.playerSpawnTileId: 
            player = uniteAreas(player, cell.point);
            break;
        }
      }
    }

    for (let i = 0; i < size.width; ++i) {
      for (let j = 0; j < size.height; ++j) {
        let cell = grid.cell(i, j);

        if (!cell) {
          continue;
        }

        cell[DIRECTION_RIGHT] = grid.cell(i === size.width - 1 ? 0 : i + 1, j);
        cell[DIRECTION_UP] = grid.cell(i, j === size.height - 1 ? 0 : j + 1);
        cell[DIRECTION_LEFT] = grid.cell(i === 0 ? size.width - 1 : i - 1,  j);
        cell[DIRECTION_DOWN] = grid.cell(i, j === 0 ? size.height - 1 : j - 1);
      }
    }

    grid.spawns = {
      dots,
      energizers,
      slowdowns,
      player: getAreaCenter(player),
      enemy: getAreaCenter(enemy),
      prison: getAreaCenter(prison),
      bonus: getAreaCenter(bonus)
    }

    return grid;
  }
}
