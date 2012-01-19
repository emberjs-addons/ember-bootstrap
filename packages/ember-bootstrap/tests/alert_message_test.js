var application, alert;
var get = Ember.get, set = Ember.set;

module("Ember.AlertMessage", {
  setup: function() {
    application = Ember.Application.create();
    get(application, 'eventDispatcher').setup();
  },
  teardown: function() {
    if (alert && !alert.get('isDestroyed')) {
      alert.destroy();
    }
  }
});

test("an alert can be created and appended to DOM", function() {
  alert = Ember.AlertMessage.create();
  Ember.run(function() {
    alert.append();
  });
  ok(alert.$().length, 'an alert has a layer in the DOM');
});

test("an alert binds type property to layer class", function() {
  var type = 'test-type';
  alert = Ember.AlertMessage.create({ type: type });
  Ember.run(function() {
    alert.append();
  });
  ok(alert.$().hasClass(type), 'an alert binds type property to class');
});

test("an alert binds message property to DOM", function() {
  var message;
  alert = Ember.AlertMessage.create();
  Ember.run(function() {
    alert.append();
    message = 'oh my output';
    alert.set('message', message);
  });
  equal(alert.$().find('p').text(), message, 'alert binds given message to DOM');
});

test("an alert has a close button that removes it from the DOM", function() {
  var close;
  alert = Ember.AlertMessage.create();
  Ember.run(function() {
    alert.append();
  });
  close = alert.$().find('a[rel=close]');
  ok(close.length, 'alert has a close button');
  close.click();
  ok(!alert.$().length, 'alert should not have a layer');
  ok(alert.get('isDestroyed'), 'alert should be destroyed');
});

test("an alert removes iteself from the DOM after given amount of time", function() {
  alert = Ember.AlertMessage.create({
    removeAfter: 25
  });
  Ember.run(function() {
    alert.append();
    setTimeout(function() {
      start();
      ok(!alert.$().length, 'alert should not have a layer');
      ok(alert.get('isDestroyed'), 'alert should be destroyed');
    }, 50);
  });
  ok(alert.$().length, 'alert should not have been removed immediately');
  ok(!alert.get('isDestroyed'), 'alert should be destroyed immediately');
  stop();
});
