var StatisticsScene = cc.Scene.extend({
  ctor(manager) {
    this._super();
    this.manager = manager;
  },

  onEnter() {
    this._super();
    this.manager.resetGame();
  }
});
