var GameMenuLayer = cc.Layer.extend({
  ctor(items) {
    this._super();

    let visibleSize = cc.director.getVisibleSize();

    let background = new cc.DrawNode();
    background.drawRect(cc.p(0, 0), cc.p(visibleSize.width, visibleSize.height), cc.color(0, 0, 0, 127), 0);

    let menu = new Menu(items);

    help = new HelpLabel(this.getContentSize());

    this.addChild(background);
    this.addChild(help);
    this.addChild(menu);
  }
});
