var get = Ember.get, set = Ember.set, A = Ember.A;
var label;

module("Bootstrap.Label", {
  setup: function() {
  },
  teardown: function() {
    destroyIfNecessary(label);
  }
});

test("a label can be created and appended to DOM", function() {
  label = Bootstrap.Label.create();
  appendIntoDOM(label);
  ok(isAppendedToDOM(label), 'a label has a layer in the DOM');
});

test("a label binds label class by default", function() {
  label = Bootstrap.Label.create();
  appendIntoDOM(label);
  ok(label.$().hasClass('label'), 'a label has label class');
});

test("a label binds content to innerHTML div", function() {
  label = Bootstrap.Label.create({ content: 'it is a label' });
  appendIntoDOM(label);
  equal(label.$().text(), 'it is a label', 'a label binds content in innerHTML');
  Ember.run(function() {
    label.set('content', 'the label changed');
  });
  equal(label.$().text(), 'the label changed', 'a label binds content in innerHTML');
});

test("a label binds label type class by default", function() {
  label = Bootstrap.Label.create({ type: 'success' });
  appendIntoDOM(label);
  ok(label.$().hasClass('label-success'), 'a label has label-success class');
  Ember.run(function() {
    label.set('type', 'success');
  });
  ok(label.$().hasClass('label-success'), 'a label has label-success class');
  Ember.run(function() {
    label.set('type', 'warning');
  });
  ok(label.$().hasClass('label-warning'), 'a label has label-warning class');
  Ember.run(function() {
    label.set('type', 'info');
  });
  ok(label.$().hasClass('label-info'), 'a label has label-info class');
});




