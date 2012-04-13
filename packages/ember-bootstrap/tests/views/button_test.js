require('ember-bootstrap/~tests/test_helpers');

var get = Ember.get, set = Ember.set;
var button;

module("Bootstrap.Button", {
  setup: function() {
  },
  teardown: function() {
    Ember.run(function() {
      destroyIfNecessary(button);
    });
  }
});

test("a button can be created and appended to DOM", function() {
  button = Bootstrap.Button.create();
  appendIntoDOM(button);
  ok(isAppendedToDOM(button), 'a button has a layer in the DOM');
});

test("a button binds type property to layer class", function() {
  var type = 'error';
  button = Bootstrap.Button.create({ type: type });
  appendIntoDOM(button);
  ok(button.$().hasClass('btn-' + type), 'an button binds type property to class');
  type = 'success';
  // button.set('type', type);
  // ok(button.$().hasClass('btn-' + type), 'an button binds type property to class');
});

test("a button binds disabled class", function() {
  button = Bootstrap.Button.create({ disabled: true });
  appendIntoDOM(button);
  ok(button.$().hasClass('disabled'), 'an button binds disabled class');
});

test("a button binds size property to layer class", function() {
  var size = 'small';
  button = Bootstrap.Button.create({ size: size });
  appendIntoDOM(button);
  ok(button.$().hasClass('btn-' + size), 'an button binds size property to class');
  size = 'large';
  button.set('size', size);
  ok(button.$().hasClass('btn-' + size), 'an button binds size property to class');
});

