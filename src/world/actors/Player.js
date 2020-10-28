var Player = Actor.extend({
  ctor(game) {
    this._super(game);
    this.setPosition(game.grid.spawns.player);
    this.setScale(3);

    this.setState(new NormalState);

    this._nextDirection = null;
  },

  speed() {
    return this._super() * PLAYER_SPEED_FACTOR;
  },

  setNextDirection(direction) {
    if (this._currentDirection === direction.opposite()) {
      this._currentDirection = direction;
      this._nextDirection = null;
    } else {
      this._nextDirection = direction;
    }
  },

  updateDirection(cell) {
    if (this._nextDirection && cell[this._nextDirection.value]) {
      this._currentDirection = this._nextDirection;
      this._nextDirection = null;
    }
    return this._currentDirection;
  },

  getDefaultAnimationFrames(direction) {
    switch (direction) {
      case DIRECTION_UP: return [ 
        cc.spriteFrameCache.getSpriteFrame("pacman/0.png"),
        cc.spriteFrameCache.getSpriteFrame("pacman/1.png")
      ];
      case DIRECTION_DOWN: return [ 
        cc.spriteFrameCache.getSpriteFrame("pacman/2.png"),
        cc.spriteFrameCache.getSpriteFrame("pacman/3.png")
      ];
      case DIRECTION_RIGHT: return [ 
        cc.spriteFrameCache.getSpriteFrame("pacman/4.png"),
        cc.spriteFrameCache.getSpriteFrame("pacman/5.png")
      ];
      case DIRECTION_LEFT: return [ 
        cc.spriteFrameCache.getSpriteFrame("pacman/6.png"),
        cc.spriteFrameCache.getSpriteFrame("pacman/7.png")
      ];
    }
    return [];
  },

  getDeathAnimationFrames(direction) {
    return [
      cc.spriteFrameCache.getSpriteFrame("pacman/death/0.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/1.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/2.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/3.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/4.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/5.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/6.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/7.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/8.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/9.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/10.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/11.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/11.png"),
      cc.spriteFrameCache.getSpriteFrame("pacman/death/11.png")
    ];
  },

  consumedByEnemy(enemy) {
    return this._state.consumedByEnemy(enemy);
  }
});
