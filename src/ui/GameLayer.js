var GameLayer = cc.Layer.extend({
  ctor(scene, map) {
    this._super();
    this.__eventListeners = [];
    this.scene = scene;

    let background = new cc.Sprite(map.background);
    background.setAnchorPoint(0, 0);

    this.targets = new cc.Layer;
    this.enemies = new cc.Layer;
    this.players = new cc.Layer;

    this.addChild(background);
    this.addChild(this.targets);
    this.addChild(this.enemies);
    this.addChild(this.players);

    let tiledmap = new cc.TMXTiledMap(map.tiledmap);

    this.grid = Grid.createFromTiledMap(tiledmap, {
      left: 0,
      bottom: 0,
      right: background.width,
      top: background.height
    });
  },

  onEnter() {
    this._super();
    
    this.resetTargets();
    this.resetActors();

    this.beginningAnimation(() => this.scheduleUpdate());

    let keyboard = cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed: (keyCode) => {
        switch (keyCode) {
          case KEYCODE_ARROW_UP: this.player.setNextDirection(UpDirection); break;
          case KEYCODE_ARROW_DOWN: this.player.setNextDirection(DownDirection); break;
          case KEYCODE_ARROW_LEFT: this.player.setNextDirection(LeftDirection); break;
          case KEYCODE_ARROW_RIGHT: this.player.setNextDirection(RightDirection); break;
        }
      }
    }, this);
    this.__eventListeners.push(keyboard);

    let x, y;
    let touch = cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: (touch) => {
        x = touch.getLocationX();
        y = touch.getLocationY();
        
        return true;
      },
      onTouchEnded: (touch) => {
        x = touch.getLocationX() - x;
        y = touch.getLocationY() - y;

        if (Math.abs(x) > Math.abs(y)) {
          this.player.setNextDirection(x > 0 ? RightDirection : LeftDirection);
        } else {
          this.player.setNextDirection(y > 0 ? UpDirection : DownDirection);
        }
        return true;
      }
    }, this);
    this.__eventListeners.push(touch);
  },

  onExit() {
    this._super();

    for (let listener of this.__eventListeners) {
      cc.eventManager.removeListener(listener);
    }
  },

  scheduleUpdate() {
    this._super();
    this.scene.sounds.playBackgroundEffects();
  },

  unscheduleUpdate() {
    this._super();
    this.scene.sounds.pauseBackgroundEffects();
  },

  resetActors() {
    this.prison = [];

    this.players.removeAllChildren();
    this.enemies.removeAllChildren();

    this.player = new Player(this);

    let shadow = new Shadow(this);
    let speedy = new Speedy(this);    
    let bashful = new Bashful(this);
    let pockey = new Pockey(this);

    shadow.setState(new PrisonState(0));
    speedy.setState(new PrisonState);
    bashful.setState(new PrisonState);
    pockey.setState(new PrisonState);

    this.players.addChild(this.player);

    this.enemies.addChild(shadow);
    this.enemies.addChild(speedy);
    this.enemies.addChild(bashful);
    this.enemies.addChild(pockey);
  },

  resetTargets() {
    let spawns = this.grid.spawns;

    this._dots = 0;
    this.assets = new PointsSet;

    this.targets.removeAllChildren();

    for (let point of spawns.dots) {
      let target = new Dot(this, point);
      this.targets.addChild(target);
      this._dots += 1;
      this.assets.set(point, target);
    }

    for (let point of spawns.energizers) {
      let target = new Energizer(this, point);
      this.targets.addChild(target);
      this._dots += 1;
      this.assets.set(point, target);
    }

    for (let point of spawns.slowdowns) {
      let target = new Slowdown(this, point);
      this.targets.addChild(target);
      this.assets.set(point, target);
    }

    let bonus = new Bonus(this, spawns.bonus);
    this.targets.addChild(bonus);
    this.assets.set(spawns.bonus, bonus);
  },

  nextLive() {  
    this.unscheduleUpdate();

    if (this.scene.manager.lives <= 0) {
      this.scene.sounds.playDeathEffect();
      this.failureAnimation(() => {
        this.scene.manager.finishGame();
      });
    } else {
      this.scene.sounds.playDeathEffect();
      this.failureAnimation(() => {
        this.scene.manager.lives -= 1;

        this.resetActors();

        this.beginningAnimation(() => this.scheduleUpdate());
      });
    }
  },

  consumeTarget(target) {
    this.targets.removeChild(target);
    this._dots -= 1;
    
    this.assets.remove(target.getPosition());

    let prisoner = this.prison[0];

    if (prisoner) {
      prisoner.getState().decreaseDots();
    }

    if (this._dots <= 0) {
      this.unscheduleUpdate();
      this.successAnimation(() => this.scene.manager.nextLevel());
    }
  },

  beginningAnimation(callback) {
    let player = this.player;

    player.setVisible(false);

    player.runAction(cc.sequence([
      cc.toggleVisibility(),
      cc.blink(2, 6)
    ]));

    this.runAction(cc.sequence([
      cc.delayTime(2),
      cc.callFunc(callback, this)
    ]));
  },

  successAnimation(callback) {
    for (let enemy of this.enemies.children) {
      enemy.runAction(cc.sequence([
        cc.blink(1, 2),
        cc.toggleVisibility()
      ]));
    }

    this.player.runAction(cc.sequence([
      cc.delayTime(1),
      cc.blink(1, 2),
      cc.toggleVisibility()
    ]));

    this.runAction(cc.sequence([
      cc.delayTime(2),
      cc.callFunc(callback, this)
    ]));
  },

  failureAnimation(callback) {
    for (let enemy of this.enemies.children) {
      enemy.runAction(cc.sequence([
        cc.toggleVisibility()
      ]));
    }

    let player = this.player;

    player.runAction(cc.sequence([
      cc.delayTime(0.2),
      cc.animate(new cc.Animation(player.getDeathAnimationFrames(), 0.1)),
      cc.toggleVisibility()
    ]));

    this.runAction(cc.sequence([
      cc.delayTime(2.1),
      cc.callFunc(callback, this)
    ]));
  },

  getLevel() {
    return this.scene.manager.level;
  },

  getDots() {
    return this._dots;
  },

  increaseScore(value) {
    this.scene.manager.score += value;
  },

  update(dt) {
    let grid = this.grid;

    const deltaX = grid.scaleX / 2;
    const deltaY = grid.scaleY / 2;

    let paths = [];

    for (let target of this.targets.children) {
      target.update(dt);
    }

    for (let enemy of this.enemies.children) {
      let points = enemy.update(dt);

      for (let point of points) {
        let targets = this.assets.get(point, deltaX, deltaY);

        for (let target of targets) {
          enemy.consumeTarget(target);
        }
      }

      paths.push([enemy, points]);
    }

    let player = this.player;
    let points = player.update(dt);

    for (let point of points) {
      let targets = this.assets.get(point, deltaX, deltaY);

      for (let target of targets) {
        player.consumeTarget(target);
      }
    }
    
    for (let path of paths) {
      if (grid.detectCollision(points, path[1])) {
        path[0].consumeActor(player);
        player.consumeActor(path[0]);
      }
    }
  }
});
