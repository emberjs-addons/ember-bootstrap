var application, tabs;
var get = Ember.get, set = Ember.set, A = Ember.A;

module("Ember.Tabs", {
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
  tabs = Ember.Tabs.create({ content: A() });
  Ember.run(function() {
    tabs.append();
  });
  ok(tabs.$().length, 'a tabs pane has a layer in the DOM');
});


