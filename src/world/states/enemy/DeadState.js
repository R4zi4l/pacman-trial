class DeadState extends EnemyState {
  constructor() {
    super("dead");
  }

  run(actor, lastState, stateStory, setStateCallback) {
    actor.game.scene.sounds.toggleDeadStateBackground(true);

    super.run(actor, lastState, stateStory, setStateCallback);
  }

  next() {
    this._actor.game.scene.sounds.toggleDeadStateBackground(false);
    (new PrisonState()).run(this._actor, this._lastState, this._story, this._setStateCallback);
  }

  swap(state) {
    
  }

  update(dt) {
    let actor = this._actor;
    let game = actor.game;
    let grid = game.grid;

    let position = actor.getPosition();

    if (Cell.distanceSq(position, grid.spawns.enemy) < grid.scale ** 2) {
      this.next();
    }
  }

  getSpeedFactor() {
    return DEAD_SPEED_FACTOR;
  }

  selectDirection(directions, cell) {
    return this.selectShortestDirection(
      directions,
      cell,
      this._actor.game.grid.spawns.enemy
    );
  }

  getAnimationFrames(direction) {
    return this._actor.getDeadAnimationFrames(direction);
  }

  consumeActor(actor) {

  }
}
