var object, field;

module("Bootstrap.Forms.TextField", {
  setup: function() {
    object = Ember.Object.create({
      name: null
    });
    field = Bootstrap.Forms.TextField.create({
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
  equal(field.$().find('input[type=text]').length, 1, "It needs to include the text field");
});

test("input value is updated when setting value property of view", function() {
  Ember.run(function() {
    field.set('value', 'foo');
    field.append();
  });
  var textField = field.$().find('input[type=text]');

  equal(textField.val(), "foo", "renders text field with value");

  Ember.run(function() { field.set('value', 'bar'); });

  equal(textField.val(), "bar", "updates text field after value changes");
});

test("input type and size can be set", function() {
  Ember.run(function() {
    field.set('type', 'number');
    field.set('size', '60');
    field.append();
  });
  var textField = field.$().find('input[type]');
  equal(textField.attr('type'), "number", "sets input type to number");
  equal(textField.attr('size'), "60", "sets input size of input");
});

test("input  attributes can be set", function() {
  Ember.run(function() {
    field.set('placeholder', "First Name");
    field.set('disabled', true);
    field.set('maxlength', '60');
    field.append();
  });
  var textField = field.$().find('input[type=text]');
  equal(textField.attr('placeholder'), "First Name", "sets input placeholder from parent");
  equal(textField.prop('disabled'), true, "sets disabled from parent");
  equal(textField.prop('maxlength'), 60, "sets maxlength from parent");
});

test("input name can be set from name or label", function() {
  Ember.run(function() {
    field.set('label', 'First Name');
    field.append();
  });
  var textField = field.$().find('input[type=text]');
  equal(textField.attr('name'), "First Name", "sets name from label");

  Ember.run(function() { field.set('label', 'first_name'); });

  equal(textField.attr('name'), "first_name", "sets name from parent if available");
});

test("inputClasses can be set from parent", function() {
  Ember.run(function() {
    field.set('inputClassNames', ['input-small']);
    field.append();
  });
  var textField = field.$().find('input[type=text]');
  equal(textField.hasClass("input-small"), true, "sets classes on input");
});

test("should have the label for attribtue", function() {
  append();

  var textField = field.$().find('input[type=text]');
  equal(field.$().find('label').attr('for'), textField.attr('id'), "the label for attribute should be the id of the input field");
});
