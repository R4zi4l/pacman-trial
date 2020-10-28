var Bashful = Enemy.extend({
  ctor(game) {
    this._super(game)
  },

  getChasePosition(cell) {
    let game = this.game;

    let shadow;

    for (shadow of game.enemies.children) {
      if (shadow instanceof Shadow) break;
    }

    let shadowPosition = shadow.getPosition();

    let player = this.game.player;
    let playerDirection = player.getDirection();
    let playerPosition = playerDirection.moveAlong(player.getPosition(), playerDirection.scale(game.grid) * 2);

    return cc.p(playerPosition.x * 2 - shadowPosition.x, playerPosition.y * 2 - shadowPosition.y);
  },

  getScatterPosition() {
    return this.game.grid.area.bottomRight;
  },

  getDefaultAnimationFrames(direction) {
    switch (direction) {
      case DIRECTION_UP: return [ 
        cc.spriteFrameCache.getSpriteFrame("bashful/0.png"),
        cc.spriteFrameCache.getSpriteFrame("bashful/1.png")
      ];
      case DIRECTION_DOWN: return [ 
        cc.spriteFrameCache.getSpriteFrame("bashful/2.png"),
        cc.spriteFrameCache.getSpriteFrame("bashful/3.png")
      ];
      case DIRECTION_RIGHT: return [ 
        cc.spriteFrameCache.getSpriteFrame("bashful/4.png"),
        cc.spriteFrameCache.getSpriteFrame("bashful/5.png")
      ];
      case DIRECTION_LEFT: return [ 
        cc.spriteFrameCache.getSpriteFrame("bashful/6.png"),
        cc.spriteFrameCache.getSpriteFrame("bashful/7.png")
      ];
    }
    return [];
  }
});
