var GameScene = cc.Scene.extend({
  ctor(manager, map) {
    this._super();
    this.__pausedActions = [];
    this.__eventListeners = [];
    this.manager = manager;
    this.map = map;

    this.sounds = new SoundManager;
    this.addChild(this.sounds);
  },

  createMenuLayer(manager) {
    let menu = new GameMenuLayer([
      new cc.MenuItemFont("Resume", () => this.resumeGame()),
      new cc.MenuItemFont("Finish", () => manager.finishGame())
    ]);
    return menu;
  },

  onEnter() {
    this._super();

    let listener = cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed: (keyCode) => {
        switch (keyCode) {
          case KEYCODE_ESC: this.pauseGame(); break;
        }
      }
    }, this);
    this.__eventListeners.push(listener);

    cc.spriteFrameCache.addSpriteFrames(res.actors_plist);

    this.menuLayer = this.createMenuLayer(this.manager);
    this.menuLayer.setVisible(false);
    
    this.headsUpLayer = new HeadsUpLayer(this.manager);
    this.gameLayer = new GameLayer(this, this.map);
    
    this.addChild(this.gameLayer);
    this.addChild(this.headsUpLayer);
    this.addChild(this.menuLayer);
  },

  onExit() {
    this._super();

    for (let listener of this.__eventListeners) {
      cc.eventManager.removeListener(listener);
    }

    cc.spriteFrameCache.removeSpriteFramesFromFile(res.actors_plist);
  },

  pauseGame() {
    this.menuLayer.setVisible(true);
    this.__pausedActions = this.actionManager.pauseAllRunningActions();
    this.gameLayer.unscheduleUpdate();
  },

  resumeGame() {
    this.menuLayer.setVisible(false);
    this.actionManager.resumeTargets(this.__pausedActions);
    this.__pausedActions = [];
    this.gameLayer.scheduleUpdate();
  }
});
