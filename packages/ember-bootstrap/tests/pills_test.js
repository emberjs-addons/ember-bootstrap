var application, pills;
var get = Ember.get, set = Ember.set, A = Ember.A;

module("Ember.Pills", {
  setup: function() {
    application = Ember.Application.create();
    get(application, 'eventDispatcher').setup();
  },
  teardown: function() {
    if (pills && !pills.get('isDestroyed')) {
      pills.destroy();
    }
  }
});

test("pills can be created and appended to DOM", function() {
  pills = Ember.Pills.create({ content: A() });
  appendIntoDOM(pills);
  ok(pills.$().length, 'a pills pane has a layer in the DOM');
});

