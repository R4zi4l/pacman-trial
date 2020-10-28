var Menu = cc.Menu.extend({
  ctor(items) {
    this._super();

    for (let item of items) {
      this.addChild(item);
    }

    this.alignItemsVertically();
    this.alignItemsVerticallyWithPadding(30);
  }
});
