module("Bootstrap.Forms.TextField", {
  setup: function() {
    object = Ember.Object.create({
      name: null
    });
    field = Bootstrap.Forms.TextField.create({
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
  equal(field.$().find('input[type=text]').length, 1, "It needs to include the text field");
});

test("input value is updated when setting value property of view", function() {
  Ember.run(function() {
    field.set('value', 'foo');
    field.append();
  });
  textField = field.$().find('input[type=text]')

  equal(textField.val(), "foo", "renders text field with value");

  Ember.run(function() { field.set('value', 'bar'); });

  equal(textField.val(), "bar", "updates text field after value changes");
});
