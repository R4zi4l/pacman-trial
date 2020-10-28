const Direction = Object.freeze(Object.create(null, {
  name: {
    value: "Direction"
  },

  value: {
    value: undefined
  },

  // invariant !!! targetCell must always return valid cell or null && must not return current cell if we stand in its center
  targetCell: {
    value: (currentPosition, currentCell) => {
      throw new Error("call to abstract method Direction::targetCell");
    }
  },

  // invariant !!! distanceToCell must return valid number
  distanceToCell: {
    value: (currentPosition, targetCell) => {
      throw new Error("call to abstract method Direction::distanceToCell");
    }
  },

  // invariant !!! isJoint must return boolean
  isJoint: {
    value: (cell) => {
      throw new Error("call to abstract method Direction::isJoint");
    }
  },

  opposite: {
    value: () => {
      throw new Error("call to abstract method Direction::opposite");
    }
  },

  // invariant !!! returned point must not go beyond the map
  moveAlong: {
    value: (position, distance) => {
      throw new Error("call to abstract method Direction::moveAlong");
    }
  },

  // invariant !!! scale must return positive number
  scale: {
    value: (grid) => {
      throw new Error("call to abstract method Direction::scale");
    }
  },

  onwardDirectionList: {
    value: (cell) => {
      throw new Error("call to abstract method Direction::onwardDirectionList");
    }
  }
}));


const RightDirection = Object.freeze(Object.create(Direction, {
  name: {
    value: "RightDirection"
  },

  value: {
    value: DIRECTION_RIGHT
  },

  targetCell: {
    value: (currentPosition, currentCell) => {
      return currentPosition.x < currentCell.point.x ? currentCell : currentCell[DIRECTION_RIGHT];
    }
  },

  distanceToCell: {
    value: (currentPosition, targetCell) => {
      return targetCell.point.x - currentPosition.x;
    }
  },

  isJoint: {
    value: (cell) => {
      return Boolean(cell[DIRECTION_UP] || cell[DIRECTION_DOWN]);
    }
  },

  opposite: {
    value: () => {
      return LeftDirection;
    }
  },

  moveAlong: {
    value: (position, distance) => {
      return cc.p(position.x + distance, position.y);
    }
  },

  scale: {
    value: (grid) => {
      return grid.scaleX;
    }
  },

  onwardDirectionList: {
    value: (cell) => {
      let directions = [];
      cell[DIRECTION_UP] && directions.push(UpDirection);
      cell[DIRECTION_RIGHT] && directions.push(RightDirection);
      cell[DIRECTION_DOWN] && directions.push(DownDirection);
      return directions;
    }
  }
}));


const UpDirection = Object.freeze(Object.create(Direction, {
  name: {
    value: "UpDirection"
  },

  value: {
    value: DIRECTION_UP
  },

  targetCell: {
    value: (currentPosition, currentCell) => {
      return currentPosition.y < currentCell.point.y ? currentCell : currentCell[DIRECTION_UP];
    }
  },

  distanceToCell: {
    value: (currentPosition, targetCell) => {
      return targetCell.point.y - currentPosition.y;
    }
  },

  isJoint: {
    value: (cell) => {
      return Boolean(cell[DIRECTION_LEFT] || cell[DIRECTION_RIGHT]);
    }
  },

  opposite: {
    value: () => {
      return DownDirection;
    }
  },

  moveAlong: {
    value: (position, distance) => {
      return cc.p(position.x, position.y + distance);
    }
  },

  scale: {
    value: (grid) => {
      return grid.scaleY;
    }
  },

  onwardDirectionList: {
    value: (cell) => {
      let directions = [];
      cell[DIRECTION_RIGHT] && directions.push(RightDirection);
      cell[DIRECTION_LEFT] && directions.push(LeftDirection);
      cell[DIRECTION_UP] && directions.push(UpDirection);
      return directions;
    }
  }
}));


const LeftDirection = Object.freeze(Object.create(Direction, {
  name: {
    value: "LeftDirection"
  },

  value: {
    value: DIRECTION_LEFT
  },

  targetCell: {
    value: (currentPosition, currentCell) => {
      return currentPosition.x > currentCell.point.x ? currentCell : currentCell[DIRECTION_LEFT];
    }
  },

  distanceToCell: {
    value: (currentPosition, targetCell) => {
      return currentPosition.x - targetCell.point.x;
    }
  },

  isJoint: {
    value: (cell) => {
      return Boolean(cell[DIRECTION_UP] || cell[DIRECTION_DOWN]);
    }
  },

  opposite: {
    value: () => {
      return RightDirection;
    }
  },

  moveAlong: {
    value: (position, distance) => {
      return cc.p(position.x - distance, position.y);
    }
  },

  scale: {
    value: (grid) => {
      return grid.scaleX;
    }
  },

  onwardDirectionList: {
    value: (cell) => {
      let directions = [];
      cell[DIRECTION_LEFT] && directions.push(LeftDirection);
      cell[DIRECTION_UP] && directions.push(UpDirection);
      cell[DIRECTION_DOWN] && directions.push(DownDirection);
      return directions;
    }
  }
}));


const DownDirection = Object.freeze(Object.create(Direction, {
  name: {
    value: "DownDirection"
  },

  value: {
    value: DIRECTION_DOWN
  },

  targetCell: {
    value: (currentPosition, currentCell) => {
      return currentPosition.y > currentCell.point.y ? currentCell : currentCell[DIRECTION_DOWN];
    }
  },

  distanceToCell: {
    value: (currentPosition, targetCell) => {
      return currentPosition.y - targetCell.point.y;
    }
  },

  isJoint: {
    value: (cell) => {
      return Boolean(cell[DIRECTION_LEFT] || cell[DIRECTION_RIGHT]);
    }
  },

  opposite: {
    value: () => {
      return UpDirection;
    }
  },

  moveAlong: {
    value: (position, distance) => {
      return cc.p(position.x, position.y - distance);
    }
  },

  scale: {
    value: (grid) => {
      return grid.scaleY;
    }
  },

  onwardDirectionList: {
    value: (cell) => {
      let directions = [];
      cell[DIRECTION_RIGHT] && directions.push(RightDirection);
      cell[DIRECTION_DOWN] && directions.push(DownDirection);
      cell[DIRECTION_LEFT] && directions.push(LeftDirection);
      return directions;
    }
  }
}));
