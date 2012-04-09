require('ember-bootstrap/~tests/test_helpers');

var get = Ember.get, set = Ember.set, A = Ember.A;
var radioButtonGroup;

module("Bootstrap.RadioButtonGroup", {
  setup: function() {
    application = Ember.Application.create();
  },
  teardown: function() {
    Ember.run(function() {
      destroyIfNecessary(radioButtonGroup);
      application.destroy();
    });
  }
});

test("a button group can be created and appended to DOM", function() {
  radioButtonGroup = Bootstrap.RadioButtonGroup.create({ content: A() });
  appendIntoDOM(radioButtonGroup);
  ok(isAppendedToDOM(radioButtonGroup), 'a button has a layer in the DOM');
});

test("a button group can be created and appended to DOM", function() {
  radioButtonGroup = Bootstrap.RadioButtonGroup.create({
    content: A(["Left", "Right"])
  });
  appendIntoDOM(radioButtonGroup);
  layer = radioButtonGroup.$();
  equals(layer.find('a.btn').length, 2, 'a button group has a layer in the DOM');
  equals(jQuery(layer.find('a.btn')[0]).text(), 'Left', 'a button group has a layer in the DOM');
  equals(jQuery(layer.find('a.btn')[1]).text(), 'Right', 'a button group has a layer in the DOM');
});

test("a radio button group binds selection", function() {
  radioButtonGroup = Bootstrap.RadioButtonGroup.create({
    content: A(["One", "Two", "Three"])
  });
  appendIntoDOM(radioButtonGroup);
  radioButtonGroup.$('a.btn:contains(One)').trigger('click');
  equals(radioButtonGroup.get('selection'), 'One');
  radioButtonGroup.$('a.btn:contains(Two)').trigger('click');
  equals(radioButtonGroup.get('selection'), 'Two');
  radioButtonGroup.$('a.btn:contains(Three)').trigger('click');
  equals(radioButtonGroup.get('selection'), 'Three');
});

test("a radio button group sets first item as selection when allowsEmptySelection is false", function() {
  radioButtonGroup = Bootstrap.RadioButtonGroup.create({
    content: A(["One", "Two", "Three"]),
    allowsEmptySelection: false
  });
  appendIntoDOM(radioButtonGroup);
  equals(radioButtonGroup.get('selection'), 'One');
  radioButtonGroup.$('a.btn:contains(Two)').trigger('click');
  equals(radioButtonGroup.get('selection'), 'Two');
});

test("a radio button group unsets selection when allowsEmptySelection is true", function() {
  radioButtonGroup = Bootstrap.RadioButtonGroup.create({
    content: A(["One", "Two", "Three"]),
    allowsEmptySelection: true
  });
  appendIntoDOM(radioButtonGroup);
  radioButtonGroup.$('a.btn:contains(One)').trigger('click');
  equals(radioButtonGroup.get('selection'), 'One');
  radioButtonGroup.$('a.btn:contains(One)').trigger('click');
  equals(radioButtonGroup.get('selection'), null);
});

test("a radio button group does not unset selection when allowsEmptySelection is false", function() {
  radioButtonGroup = Bootstrap.RadioButtonGroup.create({
    content: A(["One", "Two", "Three"]),
    allowsEmptySelection: false
  });
  appendIntoDOM(radioButtonGroup);
  radioButtonGroup.$('a.btn:contains(One)').trigger('click');
  equals(radioButtonGroup.get('selection'), 'One');
  radioButtonGroup.$('a.btn:contains(One)').trigger('click');
  equals(radioButtonGroup.get('selection'), 'One');
});

