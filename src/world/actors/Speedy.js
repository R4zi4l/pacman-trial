var Speedy = Enemy.extend({
  ctor(game) {
    this._super(game)
  },

  getChasePosition(cell) {
    let player = this.game.player;
    let direction = player.getDirection();

    return direction.moveAlong(player.getPosition(), direction.scale(this.game.grid) * 4);
  },

  getScatterPosition() {
    return this.game.grid.area.topRight;
  },

  getDefaultAnimationFrames(direction) {
    switch (direction) {
      case DIRECTION_UP: return [ 
        cc.spriteFrameCache.getSpriteFrame("speedy/0.png"),
        cc.spriteFrameCache.getSpriteFrame("speedy/1.png")
      ];
      case DIRECTION_DOWN: return [ 
        cc.spriteFrameCache.getSpriteFrame("speedy/2.png"),
        cc.spriteFrameCache.getSpriteFrame("speedy/3.png")
      ];
      case DIRECTION_RIGHT: return [ 
        cc.spriteFrameCache.getSpriteFrame("speedy/4.png"),
        cc.spriteFrameCache.getSpriteFrame("speedy/5.png")
      ];
      case DIRECTION_LEFT: return [ 
        cc.spriteFrameCache.getSpriteFrame("speedy/6.png"),
        cc.spriteFrameCache.getSpriteFrame("speedy/7.png")
      ];
    }
    return [];
  }
});
