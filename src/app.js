class GameManager {
  constructor() {
    let level;
    let lives;
    let score;
    let scene;

    Object.defineProperties(this, {
      level: {
        get: () => level,
        set: (value) => {
          level = value;

          let event = new cc.EventCustom("gameLevelChanged");
          event.setUserData(level);
          cc.eventManager.dispatchEvent(event);
        }
      },

      lives: {
        get: () => lives,
        set: (value) => {
          lives = value;

          let event = new cc.EventCustom("gameLivesChanged");
          event.setUserData(lives);
          cc.eventManager.dispatchEvent(event);
        }
      },

      score: {
        get: () => score,
        set: (value) => {
          score = value;

          let event = new cc.EventCustom("gameScoreChanged");
          event.setUserData(score);
          cc.eventManager.dispatchEvent(event);
        }
      },

      scene: {
        get: () => scene,
        set: (value) => {
          scene = value;
          cc.director.runScene(value);
        }
      },

      settings: {
        value: {
          map: MAPS[0]
        }
      }
    });
  }

  resetGame() {
    this.scene = new MainMenuScene(this);
    this.lives = GAME_BASE_LIVES;
    this.score = 0;
    this.level = GAME_BASE_LEVEL;
  }

  startGame() {
    if (this.settings.map) {
      this.scene = new GameScene(this, this.settings.map);
    }
  }

  finishGame() {
    this.scene = new StatisticsScene(this);
  }

  nextLevel() {
    this.level += 1;
    this.scene = new GameScene(this, this.settings.map);
  }
}

var gameManager = new GameManager;
