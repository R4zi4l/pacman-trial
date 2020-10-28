var SoundManager = cc.Node.extend({
  ctor() {
    this._super();
    this._backgroundAction;

    this._background = [
      {
        active: false,
        id: cc.audioEngine.playEffect(res.retreating_sound, true)
      }, {
        active: false,
        id: cc.audioEngine.playEffect(res.power_pellet_sound, true)
      }, {
        active: true,
        id: cc.audioEngine.playEffect(res.siren_1_sound, true)
      }
    ];

    this.pauseBackgroundEffects();
  },

  pauseBackgroundEffects() {
    for (let effect of this._background) {
      cc.audioEngine.pauseEffect(effect.id);
    }
  },

  playBackgroundEffects() {
    for (let effect of this._background) {
      if (effect.active) {
        cc.audioEngine.resumeEffect(effect.id);
        break;
      }
    }
  },

  playDeathEffect() {
    let sound;
    let action = cc.sequence([
      cc.callFunc(() => 
        sound = cc.audioEngine.playEffect(res.death_1_sound)
      ),
      cc.delayTime(1.5),
      cc.callFunc(() => (
        cc.audioEngine.stopEffect(sound), 
        cc.audioEngine.playEffect(res.death_2_sound)
      )),
      cc.delayTime(0.2),
      cc.callFunc(() => 
        cc.audioEngine.playEffect(res.death_2_sound)
      )
    ]);
  
    this.runAction(action);
  },

  playConsumeDotEffect() {
    let action = cc.sequence([
      cc.callFunc(() => 
        cc.audioEngine.playEffect(res.munch_1_sound)
      ),
      cc.delayTime(0.1),
      cc.callFunc(() => 
        cc.audioEngine.playEffect(res.munch_2_sound)
      )
    ]);
  
    this.runAction(action);
  },

  playConsumeBonusEffect() {
    let action = cc.sequence([
      cc.callFunc(() => 
        cc.audioEngine.playEffect(res.eat_fruit_sound)
      )
    ]);
  
    this.runAction(action);
  },

  playConsumeEnemyEffect() {
    let action = cc.sequence([
      cc.callFunc(() => 
        cc.audioEngine.playEffect(res.eat_ghost_sound)
      )
    ]);
  
    this.runAction(action);
  },

  toggleEnergizerBackground(flag) {
    this._background[SOUNDS_ENERGIZE_BACKGROUND].active = flag;
    this.pauseBackgroundEffects();
    this.playBackgroundEffects();
  },

  toggleDeadStateBackground(flag) {
    this._background[SOUNDS_DEAD_BACKGROUND].active = flag;
    this.pauseBackgroundEffects();
    this.playBackgroundEffects();
  },

  toggleDefaultBackground(flag) {
    this._background[SOUNDS_DEFAULT_BACKGROUND].active = flag;
    this.pauseBackgroundEffects();
    this.playBackgroundEffects();
  }
});
