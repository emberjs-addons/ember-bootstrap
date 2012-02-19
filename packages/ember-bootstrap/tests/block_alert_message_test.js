var application, blockAlert;
var get = Ember.get, set = Ember.set, A = Ember.A;

module("Bootstrap.BlockAlertMessage", {
  setup: function() {
    application = Ember.Application.create();
    get(application, 'eventDispatcher').setup();
  },
  teardown: function() {
    if (blockAlert && !blockAlert.get('isDestroyed')) {
      blockAlert.destroy();
    }
  }
});

test("a block alert message can be created and appended to DOM", function() {
  blockAlert = Bootstrap.BlockAlertMessage.create();
  appendIntoDOM(blockAlert);
  ok(isAppendedToDOM(blockAlert), 'a blockAlert pane has a layer in the DOM');
});

