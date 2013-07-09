var object, field;

module("Bootstrap.Forms.UneditableInput", {
  setup: function() {
    object = Ember.Object.create({
      name: null
    });
    field = Bootstrap.Forms.UneditableInput.create({
      context: object
    });
  },

  teardown: function() {
    destroyIfNecessary(field);
  }
});

function append() {
  Ember.run(function() {
    field.appendTo('#qunit-fixture');
  });
}


test("should have the field", function() {
  append();
  equal(field.$().find('span.uneditable-input').length, 1, "It needs to include the text field");
});

test("input value is updated when setting value property of view", function() {
  Ember.run(function() {
    field.set('value', 'foo');
    field.append();
  });
  var uneditableField = field.$().find('span.uneditable-input');

  equal(uneditableField.text(), "foo", "renders text field with value");

  Ember.run(function() { field.set('value', 'bar'); });

  equal(uneditableField.text(), "bar", "updates text field after value changes");
});

test("input name can be set from name or label", function() {
  Ember.run(function() {
    field.set('label', 'First Name');
    field.append();
  });
  var uneditableField = field.$().find('span.uneditable-input');
  equal(uneditableField.attr('name'), "First Name", "sets name from label");

  Ember.run(function() { field.set('label', 'first_name'); });

  equal(uneditableField.attr('name'), "first_name", "sets name from parent if available");
});

test("inputClasses can be set from parent", function() {
  Ember.run(function() {
    field.set('inputClassNames', ['input-small']);
    field.append();
  });
  var uneditableField = field.$().find('span.uneditable-input');
  equal(uneditableField.hasClass("input-small"), true, "sets classes on input");
});

test("should have the label for attribtue", function() {
  append();

  var uneditableField = field.$().find('span.uneditable-input');
  equal(field.$().find('label').attr('for'), uneditableField.attr('id'), "the label for attribute should be the id of the input field");
});
