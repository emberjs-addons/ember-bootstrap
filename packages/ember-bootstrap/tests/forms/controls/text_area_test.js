module("Bootstrap.Forms.TextArea", {
  setup: function() {
    object = Ember.Object.create({
      name: null
    });
    field = Bootstrap.Forms.TextArea.create({
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
  equal(field.$().find('textarea').length, 1, "It needs to include the text area");
});

test("input value is updated when setting value property of view", function() {
  Ember.run(function() {
    field.set('value', 'foo');
    field.append();
  });
  textArea = field.$().find('textarea')

  equal(textArea.val(), "foo", "renders text field with value");

  Ember.run(function() { field.set('value', 'bar'); });

  equal(textArea.val(), "bar", "updates text field after value changes");
});

test("input cols and rows can be set", function() {
  Ember.run(function() {
    field.set('cols', '60');
    field.set('rows', '3');
    field.append();
  });
  textArea = field.$().find('textarea')
  equal(textArea.attr('cols'), "60", "sets cols attribute on textarea");
  equal(textArea.attr('rows'), "3", "sets rows attribute on textarea");
});
