var get = Ember.get, set = Ember.set;
var application, alert;

module("Bootstrap.AlertMessage", {
  setup: function() {
    application = Ember.Application.create();
  },
  teardown: function() {
    Ember.run(function() {
      destroyIfNecessary(alert);
      destroyIfNecessary(application);
    });
  }
});

test("an alert can be created and appended to DOM", function() {
  alert = Bootstrap.AlertMessage.create();
  appendIntoDOM(alert);
  ok(isAppendedToDOM(alert), 'an alert has a layer in the DOM');
});

test("an alert binds type property to layer class", function() {
  var type = 'error';
  alert = Bootstrap.AlertMessage.create({ type: type });
  appendIntoDOM(alert);
  ok(alert.$().hasClass('alert-error'), 'an alert binds type property to class');
});

test("an alert binds message property to DOM", function() {
  var message;
  alert = Bootstrap.AlertMessage.create();
  Ember.run(function() {
    alert.append();
    message = 'oh my output';
    alert.set('message', message);
  });
  equal(alert.$().text(), '×'+message, 'alert binds given message to DOM');
});

test("an alert has a close button that removes it from the DOM", function() {
  var close;
  alert = Bootstrap.AlertMessage.create();
  appendIntoDOM(alert);
  clickRelLink(alert, 'close');
  ok(!isAppendedToDOM(alert), 'alert should not have a layer');
  ok(isDestroyed(alert), 'alert should be destroyed');
});

test("an alert removes itself from the DOM after given amount of time", function() {
  alert = Bootstrap.AlertMessage.create({
    removeAfter: 25
  });
  Ember.run(function() {
    alert.append();
    setTimeout(function() {
      start();
      ok(!isAppendedToDOM(alert), 'alert should not have a layer');
      ok(isDestroyed(alert), 'alert should be destroyed');
    }, 50);
  });
  ok(isAppendedToDOM(alert), 'alert should not have been removed immediately');
  ok(!isDestroyed(alert), 'alert should be destroyed immediately');
  stop();
});
