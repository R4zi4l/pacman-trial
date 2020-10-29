class EnemyState extends State {
  constructor(name) {
    super(name);
  }

  getNextDirection(direction, cell) {
    let directions = direction.onwardDirectionList(cell);

    if (directions.length) {
      return this.selectDirection(directions, cell);
    }
    return direction.opposite();
  }

  // invariant !!! must return valid Direction
  selectDirection(directions, cell) {
    return directions[Math.floor(Math.random() * directions.length)];
  }

  // invariant !!! directions must not be empty
  selectShortestDirection(directions, currentCell, targetPosition) {
    let min = 0;
    let minDistance = directions[0].targetCell(currentCell.point, currentCell).distanceSq(targetPosition);
    
    for (let i = 1; i < directions.length; ++i) {
      let distance = directions[i].targetCell(currentCell.point, currentCell).distanceSq(targetPosition);
      
      if (distance < minDistance) {
        minDistance = distance;
        min = i;
      }
    }

    return directions[min];
  }

  decreaseDots() {

  }

  consumeTarget(target) {
    target.consumedByEnemy(this._actor);
  }

  consumeActor(actor) {
    if (actor.consumedByEnemy(this._actor)) {
      this._actor.game.nextLive();
    }
  }

  consumedByPlayer(player) {
    return false;
  }
}
