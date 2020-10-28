var Energizer = Target.extend({
  ctor(game, point) {
    this._super(game, "energizer", point, cc.spriteFrameCache.getSpriteFrame("targets/dot.png"));
    this.setScale(0.4);
  },

  consumedByEnemy(enemy) {
    return false;
  },

  consumedByPlayer(player) {
    let game = this.game;

    game.increaseScore(BONUS_BONUS_SCORE);
    game.consumeTarget(this);

    player.setBuff("speed", TARGET_SPEED_DEBUFF_FACTOR, TARGET_SPEED_DEBUFF_DURATION);
    player.setState(new EnergizedState);

    for (let enemy of game.enemies.children) {
      enemy.setState(new FrightState);
    }

    return true;
  }
});
