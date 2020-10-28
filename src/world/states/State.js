class State {
  constructor(name) {
    Object.defineProperties(this, {
      name: {
        value: name
      }
    });
  }

  run(actor, lastState, stateStory, setStateCallback) {
    this._actor = actor;
    this._lastState = lastState;
    this._story = stateStory;
    this._setStateCallback = setStateCallback;

    stateStory[this.name] = (stateStory[this.name] || 0) + 1;
    this._setStateCallback(this);
  }

  next() {
    this._setStateCallback(this._lastState);
  }

  swap(state) {
    state.run(this._actor, this, this._story, this._setStateCallback);
  }

  update(dt) {
    
  }

  getSpeedFactor() {
    return 1;
  }

  getAnimationFrames(direction) {
    return this._actor.getDefaultAnimationFrames(direction);
  }

  consumeTarget(target) {
    throw new Error("call to abstract method State::consumeTarget");
  }

  consumeActor(actor) {
    throw new Error("call to abstract method State::consumeActor");
  }

  consumedByEnemy(enemy) {
    throw new Error("call to abstract method State::consumedByEnemy");
  }

  consumedByPlayer(player) {
    throw new Error("call to abstract method State::consumedByPlayer");
  }
}
