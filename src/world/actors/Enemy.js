var Enemy = Actor.extend({
  ctor(game) {
    this._super(game);
    this.setScale(3);

    this.setState(new ScatterState);
  },

  speed() {
    return this._super() * ENEMY_SPEED_FACTOR;
  },

  updateDirection(cell) {
    return this._currentDirection = this._state.getNextDirection(this._currentDirection, cell);
  },

  swapDirection() {
    this._currentDirection = this._currentDirection.opposite();
  },

  getChasePosition(cell) {
    throw new Error("call to abstract method Enemy::getChasePosition");
  },

  getScatterPosition() {
    throw new Error("call to abstract method Enemy::getScatterPosition");
  },

  getFrightAnimationFrames(direction) {
    return [
      cc.spriteFrameCache.getSpriteFrame("fright/0.png"),
      cc.spriteFrameCache.getSpriteFrame("fright/1.png"),
      cc.spriteFrameCache.getSpriteFrame("fright/2.png"),
      cc.spriteFrameCache.getSpriteFrame("fright/3.png")
    ];
  },

  getDeadAnimationFrames(direction) {
    switch (direction) {
      case DIRECTION_UP: return [ 
        cc.spriteFrameCache.getSpriteFrame("dead/0.png")
      ];
      case DIRECTION_DOWN: return [ 
        cc.spriteFrameCache.getSpriteFrame("dead/2.png")
      ];
      case DIRECTION_RIGHT: return [ 
        cc.spriteFrameCache.getSpriteFrame("dead/4.png")
      ];
      case DIRECTION_LEFT: return [ 
        cc.spriteFrameCache.getSpriteFrame("dead/6.png")
      ];
    }
    return [];
  },

  consumedByPlayer(player) {
    return this._state.consumedByPlayer(player);
  }
});
