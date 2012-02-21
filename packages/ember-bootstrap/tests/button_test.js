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
  alert = Bootstrap.AlertMessage.create({ type: type });
  appendIntoDOM(alert);
  ok(alert.$().hasClass('btn-error'), 'an alert binds type property to class');
});

