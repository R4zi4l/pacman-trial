var Slowdown = Target.extend({
  ctor(game, point) {
    this._super(game, "slowdown", point);
    this.setScale(0.4);
  },

  consumedByEnemy(enemy) {
    enemy.setBuff("speed", SLOWDOWN_SPEED_DEBUFF_FACTOR, SLOWDOWN_SPEED_DEBUFF_DURATION);
    return true;
  },

  consumedByPlayer(player) {
    return false;
  }
});
