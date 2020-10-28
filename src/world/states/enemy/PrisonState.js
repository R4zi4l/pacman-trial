class PrisonState extends EnemyState {
  constructor(dots = ENEMY_PRISON_DOTS_THRESHOLD) {
    super("prison");
    this._duration = 0;
    this._dots = dots;
    this._last = dots;
  }

  run(actor, lastState, stateStory, setStateCallback) {
    let game = actor.game;

    this._duration = 0;
    game.prison.push(actor);
    actor.setPosition(game.grid.spawns.prison);

    super.run(actor, lastState, stateStory, setStateCallback);
  }

  swap(state) {
    super.swap(state);
  }
  
  update(dt) {
    let game = this._actor.game;

    if (game.prison[0] !== this._actor) {
      return;
    }

    if (this._last === this._dots) {
      this._duration += dt;
    } else {
      this._duration = 0;
      this._last = this._dots;
    }

    if (this._dots <= 0 || this._duration >= PRISON_MAX_DELAY) {
      game.prison.shift();
      this._actor.setPosition(game.grid.spawns.enemy);
      this.next();
    }
  }

  decreaseDots() {
    this._dots -= 1;
  }
}
