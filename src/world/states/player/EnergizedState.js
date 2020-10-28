class EnergizedState extends PlayerState {
  constructor() {
    super("energize");
    this._duration = 0;
    this._bonus = 0;
  }

  run(actor, lastState, stateStory, setStateCallback) {
    this._duration = Math.max(FRIGHT_DURATION - FRIGHT_DURATION_LEVEL_FACTOR * actor.game.getLevel(), FRIGHT_DURATION_MIN);
    actor.game.scene.sounds.toggleEnergizerBackground(true);

    super.run(actor, lastState, stateStory, setStateCallback);
  }

  swap(state) {
    if (state.name === "energize") {
      this._duration += Math.max(FRIGHT_DURATION - FRIGHT_DURATION_LEVEL_FACTOR * this._actor.game.getLevel(), FRIGHT_DURATION_MIN)
    } else {
      this._actor.game.scene.sounds.toggleEnergizerBackground(false);
      state.run(this._actor, this._lastState, this._story, this._setStateCallback);
    }
  }

  next() {
    this._actor.game.scene.sounds.toggleEnergizerBackground(false);
    super.next();
  }

  update(dt) {
    this._duration -= dt;

    if (this._duration <= 0) {
      this.next();
    }
  }

  getSpeedFactor() {
    return ENERGIZER_SPEED_FACTOR;
  }

  consumeActor(actor) {
    if (actor.consumedByPlayer(this._actor)) {
      this._bonus += ENERGIZER_BONUS_SCORE;
      this._actor.game.increaseScore(this._bonus);
      this._actor.game.scene.sounds.playConsumeEnemyEffect();
    }
  }

  consumedByEnemy(enemy) {
    return false;
  }
}
