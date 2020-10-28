var Pockey = Enemy.extend({
  ctor(game) {
    this._super(game)
  },

  getChasePosition(cell) {
    let player = this.game.player;
    let position = player.getPosition();

    if (cell.distanceSq(position) < this.game.grid.ratio * 8) {
      return this.getScatterPosition();
    }
    return position;
  },

  getScatterPosition() {
    return this.game.grid.area.bottomLeft;
  },

  getDefaultAnimationFrames(direction) {
    switch (direction) {
      case DIRECTION_UP: return [ 
        cc.spriteFrameCache.getSpriteFrame("pockey/0.png"),
        cc.spriteFrameCache.getSpriteFrame("pockey/1.png")
      ];
      case DIRECTION_DOWN: return [ 
        cc.spriteFrameCache.getSpriteFrame("pockey/2.png"),
        cc.spriteFrameCache.getSpriteFrame("pockey/3.png")
      ];
      case DIRECTION_RIGHT: return [ 
        cc.spriteFrameCache.getSpriteFrame("pockey/4.png"),
        cc.spriteFrameCache.getSpriteFrame("pockey/5.png")
      ];
      case DIRECTION_LEFT: return [ 
        cc.spriteFrameCache.getSpriteFrame("pockey/6.png"),
        cc.spriteFrameCache.getSpriteFrame("pockey/7.png")
      ];
    }
    return [];
  }
});
