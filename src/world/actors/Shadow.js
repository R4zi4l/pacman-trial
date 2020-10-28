var Shadow = Enemy.extend({
  ctor(game) {
    this._super(game)
  },

  speed() {
    let game = this.game;
    let factor 
      = (game.getDots() < SHADOW_SPEED_THRESHOLD_DOTS)
      ? SHADOW_SPEED_THRESHOLD_FACTOR * SHADOW_SPEED_THRESHOLD_FACTOR
      : (game.getDots() < SHADOW_SPEED_THRESHOLD_DOTS * 2)
      ? SHADOW_SPEED_THRESHOLD_FACTOR
      : 1;
    return this._super() * factor;
  },

  getChasePosition(cell) {
    let player = this.game.player;
    return player.getPosition();
  },

  getScatterPosition() {
    return this.game.grid.area.topLeft;
  },

  getDefaultAnimationFrames(direction) {
    switch (direction) {
      case DIRECTION_UP: return [ 
        cc.spriteFrameCache.getSpriteFrame("shadow/0.png"),
        cc.spriteFrameCache.getSpriteFrame("shadow/1.png")
      ];
      case DIRECTION_DOWN: return [ 
        cc.spriteFrameCache.getSpriteFrame("shadow/2.png"),
        cc.spriteFrameCache.getSpriteFrame("shadow/3.png")
      ];
      case DIRECTION_RIGHT: return [ 
        cc.spriteFrameCache.getSpriteFrame("shadow/4.png"),
        cc.spriteFrameCache.getSpriteFrame("shadow/5.png")
      ];
      case DIRECTION_LEFT: return [ 
        cc.spriteFrameCache.getSpriteFrame("shadow/6.png"),
        cc.spriteFrameCache.getSpriteFrame("shadow/7.png")
      ];
    }
    return [];
  }
});
