var HelpLabel = cc.Node.extend({
  ctor(parentSize) {
    this._super();

    this.padding = 20;

    this.setAnchorPoint(1, 1);
    this.setPosition(parentSize.width - this.padding, parentSize.height - this.padding);

    let lables = [
      "Controls:",
      "Esc - pause",
      "\u2191 - move up",
      "\u2193 - move down",
      "\u2190 - move left",
      "\u2192 - move right"
    ];

    let label;

    for (let text of lables) {
      label = this.createLabel(text, label);
      this.addChild(label);
    }
  },

  createLabel(text, previous) {
    let label = new cc.LabelTTF(text, "Arial", 18);
    label.setAnchorPoint(1, 1);

    if (previous) {
      let position = previous.getPosition();
      position.y -= previous.getContentSize().height + this.padding / 2;
      label.setPosition(position);
    }

    return label;
  }
});
