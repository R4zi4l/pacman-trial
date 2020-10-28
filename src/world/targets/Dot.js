var Dot = Target.extend({
  ctor(game, point) {
    this._super(game, "dot", point, cc.spriteFrameCache.getSpriteFrame("targets/dot.png"));
    this.setScale(0.2);
  },

  consumedByEnemy(enemy) {
    return false;
  },

  consumedByPlayer(player) {
    this.game.increaseScore(DOT_SCORE_AMOUNT);
    this.game.consumeTarget(this);

    player.setBuff("speed", TARGET_SPEED_DEBUFF_FACTOR, TARGET_SPEED_DEBUFF_DURATION);
    this.game.scene.sounds.playConsumeDotEffect();
    
    return true;
  }
});
