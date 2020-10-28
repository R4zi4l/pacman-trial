class PlayerState extends State {
  constructor(name) {
    super(name);
  }

  consumeTarget(target) {
    target.consumedByPlayer(this._actor);
  }

  consumeActor(actor) {
    
  }

  consumedByEnemy(enemy) {
    return true;
  }
}
