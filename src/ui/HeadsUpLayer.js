var HeadsUpLayer = cc.Layer.extend({
  ctor(manager) {
    this._super();
    this.__eventListeners = [];
    this.padding = 10;

    this.setAnchorPoint(0, 1);

    let level = this.createLabel(
      "Level:", 
      manager.level,
      "gameLevelChanged", 
      0,
      this.getContentSize().height
    );
    
    let live = this.createLabel(
      "Lives:", 
      manager.lives,
      "gameLivesChanged", 
      0,
      level.getPosition().y - level.getContentSize().height
    );

    let score = this.createLabel(
      "Score:", 
      manager.score,
      "gameScoreChanged", 
      this.getContentSize().width / 2,
      this.getContentSize().height
    );

    this.addChild(level);
    this.addChild(live);
    this.addChild(score);
  },

  createLabel(text, value, event, x, y) {
    let label = new cc.LabelTTF(text + " " + value, "Arial", 32);
    label.setAnchorPoint(0, 1);
    label.setPosition(x + this.padding, y - this.padding);

    let listener = cc.eventManager.addCustomListener(
      event,
      event => label.setString(text + " " + event.getUserData())
    );
    this.__eventListeners.push(listener);

    return label;
  },

  onExit() {
    this._super();

    for (let listener of this.__eventListeners) {
      cc.eventManager.removeListener(listener);
    }
  }
});
