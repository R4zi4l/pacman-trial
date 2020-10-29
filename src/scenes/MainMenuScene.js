var MainMenuScene = cc.Scene.extend({
  ctor(manager) {
    this._super();

    this.mainMenu = this.createMeinMenu(manager);
    this.mapMenu = this.createMapMenu(manager);
    this.helpLabel = new HelpLabel(this.getContentSize());

    this.addChild(this.helpLabel);
    this.addChild(this.mainMenu);
    this.addChild(this.mapMenu);
  },

  createMeinMenu(manager) {
    let title = new cc.MenuItemFont("Trial Pacman");
    title.setFontSize(48);

    let task = new cc.LabelTTF(
      "Разработать игру Pacman используя для рендеринга cocos2dx javascript. " +
      "Чем больше вещей из оригинального пакмена будет реализовано тем лучше, " +
      "но в любом случае должен быть лабиринт в котором игрок собирает точки когда все соберет игра заканчивается. " +
      "Необходимо использовать принцип ООП во время разработки, важна простота и понятность кода. " +
      "Игра должна запускаться в браузере и не требовать никакой установки.",
      "Arial",
      18,
      cc.size(600, 0),
      cc.TEXT_ALIGNMENT_CENTER
    );

    let menu = new Menu([
      title,
      new cc.MenuItemLabel(task),
      new cc.MenuItemFont(" "),
      new cc.MenuItemFont("New Game", () => manager.startGame()),
      new cc.MenuItemFont("Select Map", () => this.showMenu(this.mapMenu))
    ]);
    return menu;
  },

  createMapMenu(manager) {
    let title = new cc.MenuItemFont("Trial Pacman");
    title.setFontSize(48);

    let items = MAPS.map((map) => new cc.MenuItemFont(map.name, () => {
      manager.settings.map = map;
      this.showMenu(this.mainMenu);
    }));

    let menu = new Menu([
      title,
      new cc.MenuItemFont(" "),
      new cc.MenuItemFont("Select map:"),
      ...items,
      new cc.MenuItemFont(" "),
      new cc.MenuItemFont("Back", () => this.showMenu(this.mainMenu))
    ]);
    return menu;
  },

  onEnter() {
    this._super();
    this.showMenu(this.mainMenu);
  },

  showMenu(menu) {
    this.mainMenu.setVisible(menu === this.mainMenu);
    this.mapMenu.setVisible(menu === this.mapMenu);
  }
});
