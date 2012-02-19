var application, pills;
var get = Ember.get, set = Ember.set, A = Ember.A;

module("Bootstrap.Pills", {
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
  pills = Bootstrap.Pills.create({ content: A() });
  appendIntoDOM(pills);
  ok(isAppendedToDOM(pills), 'a pills pane has a layer in the DOM');
});

test("pills can be stacked", function() {
  pills = Bootstrap.Pills.create({ content: A(), isStacked: true });
  appendIntoDOM(pills);
  ok(pills.$().hasClass('nav-stacked'), 'an alert binds type property to class');
});

