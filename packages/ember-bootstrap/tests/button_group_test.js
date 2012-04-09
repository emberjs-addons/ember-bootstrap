require('ember-bootstrap/~tests/test_helpers');

var get = Ember.get, set = Ember.set, A = Ember.A;
var buttonGroup;

module("Bootstrap.ButtonGroup", {
  setup: function() {
  },
  teardown: function() {
    Ember.run(function() {
      destroyIfNecessary(buttonGroup);
    });
  }
});

test("a button group can be created and appended to DOM", function() {
  buttonGroup = Bootstrap.ButtonGroup.create({ content: A() });
  appendIntoDOM(buttonGroup);
  ok(isAppendedToDOM(buttonGroup), 'a button has a layer in the DOM');
});

test("a button group can be created and appended to DOM", function() {
  buttonGroup = Bootstrap.ButtonGroup.create({
    content: A(["Left", "Right"])
  });
  appendIntoDOM(buttonGroup);
  layer = buttonGroup.$();
  equals(layer.find('a.btn').length, 2, 'a button group has a layer in the DOM');
  equals(jQuery(layer.find('a.btn')[0]).text(), 'Left', 'a button group has a layer in the DOM');
  equals(jQuery(layer.find('a.btn')[1]).text(), 'Right', 'a button group has a layer in the DOM');
});

