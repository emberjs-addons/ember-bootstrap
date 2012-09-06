var object, field;

module("Bootstrap.Forms.PasswordField", {
  setup: function() {
    object = Ember.Object.create({
      name: null
    });
    field = Bootstrap.Forms.PasswordField.create({
      bindingContext: object
    });
  },

  teardown: function() {
    field.destroy();
    field = null;
  }
});

function append() {
  Ember.run(function() {
    field.appendTo('#qunit-fixture');
  });
}


test("should have the field", function() {
  append();
  equal(field.$().find('input[type=password]').length, 1, "It needs to include the text field");
});

test("input value is updated when setting value property of view", function() {
  Ember.run(function() {
    field.set('value', 'foo');
    field.append();
  });
  var passwordField = field.$().find('input[type=password]');

  equal(passwordField.val(), "foo", "renders text field with value");

  Ember.run(function() { field.set('value', 'bar'); });

  equal(passwordField.val(), "bar", "updates text field after value changes");
});

test("input type and size can be set", function() {
  Ember.run(function() {
    field.set('type', 'number');
    field.set('size', '60');
    field.append();
  });
  var passwordField = field.$().find('input[type]');
  equal(passwordField.attr('type'), "number", "sets input type to number");
  equal(passwordField.attr('size'), "60", "sets input size of input");
});

test("input  attributes can be set", function() {
  Ember.run(function() {
    field.set('placeholder', "Password");
    field.set('disabled', true);
    field.set('maxlength', '60');
    field.append();
  });
  var passwordField = field.$().find('input[type=password]');
  equal(passwordField.attr('placeholder'), "Password", "sets input placeholder from parent");
  equal(passwordField.prop('disabled'), true, "sets disabled from parent");
  equal(passwordField.prop('maxlength'), 60, "sets maxlength from parent");
});

test("input name can be set from name or label", function() {
  Ember.run(function() {
    field.set('label', 'Password');
    field.append();
  });
  var passwordField = field.$().find('input[type=password]');
  equal(passwordField.attr('name'), "Password", "sets name from label");

  Ember.run(function() { field.set('label', 'password'); });

  equal(passwordField.attr('name'), "password", "sets name from parent if available");
});

test("inputClasses can be set from parent", function() {
  Ember.run(function() {
    field.set('inputClassNames', ['input-small']);
    field.append();
  });
  var passwordField = field.$().find('input[type=password]');
  equal(passwordField.hasClass("input-small"), true, "sets classes on input");
});
