var get = Ember.get, set = Ember.set, A = Ember.A;
var badge;

module("Bootstrap.Badge", {
  setup: function() {
  },
  teardown: function() {
    Ember.run(function() {
      destroyIfNecessary(badge);
    });
  }
});

test("a badge can be created and appended to DOM", function() {
  badge = Bootstrap.Badge.create();
  appendIntoDOM(badge);
  ok(isAppendedToDOM(badge), 'a badge has a layer in the DOM');
});

test("a badge binds badge class by default", function() {
  badge = Bootstrap.Badge.create();
  appendIntoDOM(badge);
  ok(badge.$().hasClass('badge'), 'a badge has badge class');
});

test("a badge binds content to innerHTML div", function() {
  badge = Bootstrap.Badge.create({ content: 'it is a badge' });
  appendIntoDOM(badge);
  equal(badge.$().text(), 'it is a badge', 'a badge binds content in innerHTML');
  Ember.run(function() {
    badge.set('content', 'the badge changed');
  });
  equal(badge.$().text(), 'the badge changed', 'a badge binds content in innerHTML');
});

test("a badge binds badge type class by default", function() {
  badge = Bootstrap.Badge.create({ type: 'success' });
  appendIntoDOM(badge);
  ok(badge.$().hasClass('badge-success'), 'a badge has badge-success class');
  Ember.run(function() {
    badge.set('type', 'success');
  });
  ok(badge.$().hasClass('badge-success'), 'a badge has badge-success class');
  Ember.run(function() {
    badge.set('type', 'warning');
  });
  ok(badge.$().hasClass('badge-warning'), 'a badge has badge-warning class');
  Ember.run(function() {
    badge.set('type', 'info');
  });
  ok(badge.$().hasClass('badge-info'), 'a badge has badge-info class');
});




