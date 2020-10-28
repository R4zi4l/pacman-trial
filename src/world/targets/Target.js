var Target = cc.Sprite.extend({
  ctor(game, name, point, spriteSource) {
    this._super(spriteSource)
    this.game = game;
    this.name = name;

    this.setPosition(point);
  },

  update(dt) {

  },

  consumedByEnemy(enemy) {
    throw new Error("call to abstract method Target::consumedByEnemy");
  },

  consumedByPlayer(player) {
    throw new Error("call to abstract method Target::consumedByPlayer");
  }
});
