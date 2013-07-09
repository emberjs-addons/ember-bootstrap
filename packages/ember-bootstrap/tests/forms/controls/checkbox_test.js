var object, field;

module("Bootstrap.Forms.Checkbox", {
  setup: function() {
    object = Ember.Object.create({
      name: null
    });
    field = Bootstrap.Forms.Checkbox.create({
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
  equal(field.$().find('input[type=checkbox]').length, 1, "It needs to include the text field");
});

test("checkbox is updated when setting value property of view", function() {
  Ember.run(function() {
    field.set('checked', true);
    field.append();
  });
  var checkboxField = field.$().find('input[type=checkbox]');

  equal(checkboxField[0].checked, true, "renders checkbox field checked");

  Ember.run(function() { field.set('checked', false); });

  equal(checkboxField[0].checked, false, "updates checkbox after value changes");
});

test("input attributes can be set", function() {
  Ember.run(function() {
    field.set('disabled', true);
    field.append();
  });
  var checkboxField = field.$().find('input[type=checkbox]');
  equal(checkboxField.prop('disabled'), true, "sets disabled from parent");
});

test("input name can be set from name or label", function() {
  Ember.run(function() {
    field.set('label', 'First Name');
    field.append();
  });
  var checkboxField = field.$().find('input[type=checkbox]');
  equal(checkboxField.attr('name'), "First Name", "sets name from label");

  Ember.run(function() { field.set('label', 'first_name'); });

  equal(checkboxField.attr('name'), "first_name", "sets name from parent if available");
});

test("inputClasses can be set from parent", function() {
  Ember.run(function() {
    field.set('inputClassNames', ['input-small']);
    field.append();
  });
  var checkboxField = field.$().find('input[type=checkbox]');
  equal(checkboxField.hasClass("input-small"), true, "sets classes on input");
});

test("should have the label for attribtue", function() {
  append();

  var checkboxField = field.$().find('input[type=checkbox]');
  equal(field.$().find('label').attr('for'), checkboxField.attr('id'), "the label for attribute should be the id of the input field");
});
