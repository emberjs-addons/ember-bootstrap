var get = Ember.get, set = Ember.set, A = Ember.A;
var blockAlert;

module("Bootstrap.BlockAlertMessage", {
  setup: function() {},
  teardown: function() {
    destroyIfNecessary(blockAlert);
  }
});

test("a block alert message can be created and appended to DOM", function() {
  blockAlert = Bootstrap.BlockAlertMessage.create();
  appendIntoDOM(blockAlert);
  ok(isAppendedToDOM(blockAlert), 'a blockAlert pane has a layer in the DOM');
});
