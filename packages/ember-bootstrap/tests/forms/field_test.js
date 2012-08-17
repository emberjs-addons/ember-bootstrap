var object, field;

module("Bootstrap.Forms.Field", {
  setup: function() {
    object = Ember.Object.create();
    field = Bootstrap.Forms.Field.create({
      bindingContext: object,
      label: 'object'
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

test("should have the label", function() {
  append();
  equal(field.$().find('label.control-label').length, 1, "Every field needs to include a label");
});

test("should set the label value", function() {
  append();

  Ember.run(function() { field.set('label', 'foo'); });
  equal(field.$().find('label').text(), 'Foo', "the label value should be foo");

  Ember.run(function() { field.set('label', 'bar'); });
  equal(field.$().find('label').text(), 'Bar', "the label value should be bar");
});

test("should have the controls", function() {
  append();
  equal(field.$().find('div.controls').length, 1, "Every field needs to include the controls");
});


test("should have the input", function() {
  append();
  equal(field.$().find('div.ember-bootstrap-extend').html(), 'This class is not meant to be used directly, but extended.', "Every field needs to include it's inputField");
});

test("should have the errors", function() {
  append();
  equal(field.$().find('div.errors').length, 1, "Every field needs to include the errors");
});

test("should display the errors", function() {
  append();

  object.set('errors', {object: ["can't be null"]});
  object.set('isValid', false);
  ok(field.$().hasClass('error'), "the element should have the error tag");
  equal(field.$().find('.errors').text(), "can't be null", "the error should be displayed");

  object.set('errors', null);
  object.set('isValid', true);
  ok(!field.$().hasClass('error'), "the element should not have the error tag");
  equal(field.$().find('.errors').text(), "", "no error should be display anymore");
});
