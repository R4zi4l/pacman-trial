class ChaseState extends EnemyState {
  constructor() {
    super("chase");
    this._duration = null;
  }

  run(actor, lastState, stateStory, setStateCallback) {
    this._duration 
      = (stateStory["scatter"] || 0) <= SCATTER_MAX_COUNT
      ? CHASE_DURATION + CHASE_DURATION_LEVEL_FACTOR * actor.game.getLevel() 
      : null;  
    
    super.run(actor, lastState, stateStory, setStateCallback);
  }

  next() {
    (new ScatterState()).run(this._actor, this._lastState, this._story, this._setStateCallback);
  }
  
  update(dt) {
    if (this._duration === null) {
      return;
    }

    this._duration -= dt;

    if (this._duration <= 0) {
      this.next();
    }
  }

  selectDirection(directions, cell) {
    return this.selectShortestDirection(
      directions,
      cell,
      this._actor.getChasePosition(cell)
    );
  }
}
