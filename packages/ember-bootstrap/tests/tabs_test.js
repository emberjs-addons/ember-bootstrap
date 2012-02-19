var application, tabs;
var get = Ember.get, set = Ember.set, A = Ember.A;

module("Bootstrap.Tabs", {
  setup: function() {
    application = Ember.Application.create();
    get(application, 'eventDispatcher').setup();
  },
  teardown: function() {
    if (tabs && !tabs.get('isDestroyed')) {
      tabs.destroy();
    }
  }
});

test("tabs can be created and appended to DOM", function() {
  tabs = Bootstrap.Tabs.create({ content: A() });
  appendIntoDOM(tabs);
  ok(isAppendedToDOM(tabs), 'a tabs pane has a layer in the DOM');
});

test("tabs can be stacked", function() {
  tabs = Bootstrap.Tabs.create({ content: A(), isStacked: true });
  appendIntoDOM(tabs);
  ok(tabs.$().hasClass('nav-stacked'), 'an alert binds type property to class');
});

