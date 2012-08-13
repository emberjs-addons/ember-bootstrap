var get = Ember.get, set = Ember.set, A = Ember.A;
var tabs;

module("Bootstrap.Tabs", {
  setup: function() {
  },
  teardown: function() {
    Ember.run(function() {
      destroyIfNecessary(tabs);
    });
  }
});

test("tabs can be created and appended to DOM", function() {
  tabs = Bootstrap.Tabs.create({ content: new A() });
  appendIntoDOM(tabs);
  ok(isAppendedToDOM(tabs), 'a tabs pane has a layer in the DOM');
});

test("tabs can be stacked", function() {
  tabs = Bootstrap.Tabs.create({ content: new A(), isStacked: true });
  appendIntoDOM(tabs);
  ok(tabs.$().hasClass('nav-stacked'), 'an alert binds type property to class');
});
