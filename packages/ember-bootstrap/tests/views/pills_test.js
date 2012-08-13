var get = Ember.get, set = Ember.set, A = Ember.A;
var application, pills;

module("Bootstrap.Pills", {
  setup: function() {
    application = Ember.Application.create();
  },
  teardown: function() {
    Ember.run(function() {
      destroyIfNecessary(pills);
      application.destroy();
    });
  }
});

test("pills can be created and appended to DOM", function() {
  pills = Bootstrap.Pills.create({ content: new A() });
  appendIntoDOM(pills);
  ok(isAppendedToDOM(pills), 'a pills pane has a layer in the DOM');
});

test("pills can be stacked", function() {
  pills = Bootstrap.Pills.create({ content: new A(), isStacked: true });
  appendIntoDOM(pills);
  ok(pills.$().hasClass('nav-stacked'), 'an alert binds type property to class');
});

