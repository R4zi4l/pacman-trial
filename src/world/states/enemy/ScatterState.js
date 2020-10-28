class ScatterState extends EnemyState {
  constructor() {
    super("scatter");
    this._duration = 0;
  }

  run(actor, lastState, stateStory, setStateCallback) {
    this._duration = Math.max(SCATTER_DURATION - SCATTER_DURATION_LEVEL_FACTOR * actor.game.getLevel(), SCATTER_DURATION_MIN);  

    super.run(actor, lastState, stateStory, setStateCallback);
  }

  next() {
    (new ChaseState()).run(this._actor, this._lastState, this._story, this._setStateCallback);
  }
  
  update(dt) {
    this._duration -= dt;

    if (this._duration <= 0) {
      this.next();
    }
  }

  selectDirection(directions, cell) {
    return this.selectShortestDirection(
      directions,
      cell,
      this._actor.getScatterPosition(cell)
    );
  }
}
