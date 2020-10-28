class FrightState extends EnemyState {
  constructor() {
    super("fright");
    this._duration = 0;
  }

  run(actor, lastState, stateStory, setStateCallback) {
    this._duration = Math.max(FRIGHT_DURATION - FRIGHT_DURATION_LEVEL_FACTOR * actor.game.getLevel(), FRIGHT_DURATION_MIN);

    actor.swapDirection();

    super.run(actor, lastState, stateStory, setStateCallback);
  }

  swap(state) {
    if (state.name === "fright") {
      this._duration += Math.max(FRIGHT_DURATION - FRIGHT_DURATION_LEVEL_FACTOR * this._actor.game.getLevel(), FRIGHT_DURATION_MIN)
    } else {
      state.run(this._actor, this._lastState, this._story, this._setStateCallback);
    }
  }
  
  update(dt) {
    this._duration -= dt;

    if (this._duration <= 0) {
      this.next();
    }
  }

  getSpeedFactor() {
    return FRIGHT_SPEED_FACTOR;
  }

  getAnimationFrames(direction) {
    return this._actor.getFrightAnimationFrames(direction);
  }

  consumeActor(actor) {

  }
  
  consumedByPlayer(player) {
    (new DeadState()).run(this._actor, this._lastState, this._story, this._setStateCallback);
    return true;
  }
}
