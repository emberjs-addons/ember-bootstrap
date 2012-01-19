var application, blockAlert;
var get = Ember.get, set = Ember.set, A = Ember.A;

module("Ember.BlockAlertMessage", {
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
  blockAlert = Ember.BlockAlertMessage.create();
  Ember.run(function() {
    blockAlert.append();
  });
  ok(blockAlert.$().length, 'a blockAlert pane has a layer in the DOM');
});

