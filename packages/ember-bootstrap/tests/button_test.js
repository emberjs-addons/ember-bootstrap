require('ember-bootstrap/~tests/test_helpers');

var application, button;
var get = Ember.get, set = Ember.set;

module("Bootstrap.Button", {
  setup: function() {
    application = Ember.Application.create();
    get(application, 'eventDispatcher').setup();
  },
  teardown: function() {
    if (button && !button.get('isDestroyed')) {
      button.destroy();
    }
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
  ok(button.$().hasClass('btn-error'), 'an button binds type property to class');
});

test("a button binds disabled class", function() {
  var type = 'error';
  button = Bootstrap.Button.create({ disabled: true });
  appendIntoDOM(button);
  ok(button.$().hasClass('disabled'), 'an button binds disabled class');
});

