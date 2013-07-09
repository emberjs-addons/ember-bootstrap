var object, field;

module("Bootstrap.Forms.Field", {
  setup: function() {
    object = Ember.Object.create();
    field = Bootstrap.Forms.Field.create({
      context: object,
      label: 'object'
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

test("should have the label", function() {
  append();
  equal(field.$().find('label.control-label').length, 1, "Every field needs to include a label");
});

test("should set the label value", function() {
  append();

  Ember.run(function() { field.set('label', 'foo'); });
  equal(field.$().find('label').text(), 'foo', "the label value should be foo");

  Ember.run(function() { field.set('label', 'bar'); });
  equal(field.$().find('label').text(), 'bar', "the label value should be bar");
});

test("should have the label for attribute", function() {
  append();

  equal(field.$().find('label').attr('for'), field.$().find('div.ember-bootstrap-extend').attr('id'), "the label for attribute should be the id of the input field");
});

test("should use the valueBinding value as a default label", function() {
  destroyIfNecessary(field);
  field = null;
  object = Ember.Object.create({
    foo: null
  });
  field = Bootstrap.Forms.Field.create({
    context: object,
    valueBinding: 'context.foo'
  });
  append();
  equal(field.$().find('label').text(), 'Foo', "the label value should be Foo (humanised)");

  Ember.run(function() { field.set('label', 'bar'); });
  equal(field.$().find('label').text(), 'bar', "the label value should be bar (not humanised)");

  Ember.run(function() { field.set('label', false); });
  equal(field.$().find('label').text(), "", "the field should not have a label when label='false'");
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

test("should display the label errors", function() {
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

test("should display the field errors", function() {
  destroyIfNecessary(field);
  field = null;
  object = Ember.Object.create({
    foo: null
  });
  field = Bootstrap.Forms.Field.create({
    context: object,
    valueBinding: 'context.foo'
  });
  append();
  object.set('errors', {foo: ["can't be null"]});
  object.set('isValid', false);
  ok(field.$().hasClass('error'), "the element should have the error tag");
  equal(field.$().find('.errors').text(), "can't be null", "the error should be displayed");

  object.set('errors', {foo: null});
  object.set('isValid', true);
  ok(!field.$().hasClass('error'), "the element should have the error tag");
  equal(field.$().find('.errors').text(), "", "no error should be display anymore");
  object.set('isValid', false);
  ok(!field.$().hasClass('error'), "the element should have the error tag");
  equal(field.$().find('.errors').text(), "", "no error should be display anymore");

  object.set('errors', {foo: []});
  object.set('isValid', true);
  ok(!field.$().hasClass('error'), "the element should not have the error tag");
  equal(field.$().find('.errors').text(), "", "no error should be display anymore");
  object.set('isValid', false);
  ok(!field.$().hasClass('error'), "the element should not have the error tag");
  equal(field.$().find('.errors').text(), "", "no error should be display anymore");
});

test("should display the nested object's field errors", function() {
  destroyIfNecessary(field);
  field = null;
  object = Ember.Object.create({
    foo: null,
    bar: Ember.Object.create({
      buz: null
    })
  });
  field = Bootstrap.Forms.Field.create({
    context: object,
    valueBinding: 'context.bar.buz'
  });

  append();
  object.set('bar.errors', {buz: ["can't be null"]});
  object.set('isValid', false);  // should listen on bar.isValid
  ok(field.$().hasClass('error'), "the element should have the error tag");
  equal(field.$().find('.errors').text(), "can't be null", "the error should be displayed");

  object.set('bar.errors', null);
  object.set('isValid', true);  // should listen on bar.isValid
  ok(!field.$().hasClass('error'), "the element should not have the error tag");
  equal(field.$().find('.errors').text(), "", "no error should be display anymore");
});



test("should display the help", function() {
  append();

  field.set('help', "Where in the world are you?");
  equal(field.$().find('.help-block').text(), "Where in the world are you?", "the help message should be displayed");

  field.set('help', null);
  equal(field.$().find('.help-block').text(), "", "the help message should not be displayed");
});
