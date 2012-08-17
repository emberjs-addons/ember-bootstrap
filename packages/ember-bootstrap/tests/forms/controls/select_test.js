var field, content;

module("Bootstrap.Forms.Select", {
  setup: function() {
    content = Ember.A([
      Ember.Object.create({firstName: "John", id: 1}),
      Ember.Object.create({firstName: "Jane", id: 2})
    ]);
    field = Bootstrap.Forms.Select.create({
      content: content,
      optionLabelPath: "content.firstName",
      optionValuePath: "content.id"
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
  equal(field.$().find('select').length, 1, "It needs to include the text area");
});

test("select value is updated when setting value property of view", function() {
  Ember.run(function() {
    field.append();
  });
  var select = field.$().find('select');

  equal(select.val(), "1", "renders select with value");
  equal(select.find('option:selected').text(), "John", "renders select with label");

  Ember.run(function() { field.set('selection', content.objectAt(1)); });

  equal(select.val(), "2", "updates select field after value changes");
  equal(select.find('option:selected').text(), "Jane", "updates select field after label changes");
});

test("should have the multiple", function() {
  Ember.run(function() {
    field.append();
  });
  var select = field.$().find('select');

  equal(select.attr('multiple'), null, "the select is not multiple");

  field.set('multiple', true);
  equal(select.attr('multiple'), 'multiple', "the select is multiple");
});

test("should have the prompt", function() {
  Ember.run(function() {
    field.append();
  });
  var select = field.$().find('select');
  field.set('prompt', 'Select Me');
  equal(select.find('option:eq(0)').text(), "Select Me", "the select has a prompt");
});
