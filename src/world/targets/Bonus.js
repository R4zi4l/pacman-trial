var Bonus = Target.extend({
  ctor(game, point) {
    this._super(game, "bonus", point, cc.spriteFrameCache.getSpriteFrame("targets/bonus.png"));
    this.counter = 1;
    this.duration = 0;
    this.setVisible(false);
  },

  consumedByEnemy(enemy) {
    return false;
  },

  consumedByPlayer(player) {
    if (!this.isVisible()) {
      return false;
    }
    
    this.game.increaseScore(BONUS_BONUS_SCORE * this.game.scene.manager.level);
    this.setVisible(false);
    this.counter += 1;
    this.game.scene.sounds.playConsumeBonusEffect();

    return true;
  },

  update(dt) {
    if (!this.isVisible()) {
      let dots = this.game.getDots();
      
      if ((this.counter === 1 && dots < 160) || (this.counter === 2 && dots < 80)) {
        this.setVisible(true);
        this.duration = BONUS_DURATION;
      }
      return;
    }

    this.duration -= dt;

    if (this.duration <= 0) {
      this.setVisible(false);
      this.counter += 1;
    }
  }
});
