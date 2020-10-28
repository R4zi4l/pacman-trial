var Actor = cc.Sprite.extend({
  ctor(game) {
    this._super(this.getDefaultAnimationFrames(DIRECTION_LEFT)[0]);
    this.game = game;
    this._currentDirection = LeftDirection;
    this._state = null;
    this._buffs = {};
  },

  getState() {
    return this._state;
  },

  setState(state) {
    if (this._state) {
      this._state.swap(state);
    } else {
      state.run(this, null, {}, (state) => this._state = state);
    }
  },

  setBuff(parameter, factor, duration) {
    this._buffs[parameter] = {
      factor,
      duration
    };
  },

  updateBuffs(dt) {
    for (let parameter in this._buffs) {
      let buff = this._buffs[parameter];
      buff.duration -= dt;

      if (buff.duration <= 0) {
        delete this._buffs[parameter];
      }
    }
  },

  getBuffEffect(parameter) {
    return this._buffs[parameter]?.factor || 1;
  },

  getDirection() {
    return this._currentDirection;
  },

  update(dt) {
    this.updateBuffs(dt);
    this._state.update(dt);

    let grid = this.game.grid;
    let direction = this._currentDirection;

    let position = this.getPosition();
    let cell = grid.cellAtPoint(position);  // invariant !!! cellAtPoint() must always return valid cell

    let path = [position];

    let targetCell = direction.targetCell(position, cell); 

    if (!targetCell) {
      direction = this.updateDirection(cell);
      targetCell = direction.targetCell(position, cell);

      if (!targetCell) {
        return path;
      }
    }

    let distance = this.speed() * dt;
    let targetDistance;

    while (targetCell && distance > (targetDistance = direction.distanceToCell(position, targetCell))) { 
      path.push(targetCell.point);

      distance -= targetDistance >= 0 ? targetDistance : direction.distanceToCell(position, cell);
      position = targetCell.point;
      cell = targetCell;

      if (direction.isJoint(targetCell)) {
        direction = this.updateDirection(targetCell);
      }

      targetCell = direction.targetCell(position, cell);
    }

    if (targetCell) {
      position = direction.moveAlong(position, distance);
    }

    path.push(position);

    this.setPosition(position);
    this.updateAnimation(position);

    return path;
  },

  speed() {
    return ACTOR_SPEED * this._state.getSpeedFactor() * this.getBuffEffect("speed") * (1 + ACTOR_SPEED_LEVEL_FACTOR * this.game.getLevel());
  },

  // invariant !!! updateDirection() must always ends up with setting this._currentDirection to valid direction and return it
  updateDirection(cell) {
    throw new Error("call to abstract method Actor::updateDirection");
  },

  updateAnimation(position) {
    let grid = this.game.grid;
    let direction = this._currentDirection;

    let frames = this._state.getAnimationFrames(direction.value);
    let cellCoverage = 0.5 + direction.distanceToCell(position, grid.cellAtPoint(position)) / direction.scale(grid);
    let index = Math.min(Math.floor(cellCoverage * frames.length), frames.length - 1);

    this.setSpriteFrame(frames[index]);
  },

  getDefaultAnimationFrames(direction) {
    throw new Error("call to abstract method Actor::getDefaultAnimationFrames");
  },

  consumeTarget(target) {
    this._state.consumeTarget(target);
  },

  consumeActor(actor) {
    this._state.consumeActor(actor);
  }
});
