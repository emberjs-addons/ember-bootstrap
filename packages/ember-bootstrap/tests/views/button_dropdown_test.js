var get = Ember.get, set = Ember.set;
var application, controller, buttonDropdown;

module("Bootstrap.ButtonDropdown", {
  setup: function() {
    application = Ember.Application.create();
    controller = Ember.ArrayController.create({
        items: [
            Ember.Object.create({ label: 'First Link', actionName: 'testAction' }),
            Ember.Object.create({ label: 'Second Link', actionName: 'anotherAction', disabled: true })
        ]
    });
    buttonDropdown = Bootstrap.ButtonDropdown.create({ controller: controller });
  },
  teardown: function() {
    Ember.run(function() {
      destroyIfNecessary(buttonDropdown);
      destroyIfNecessary(application);
    });
  }
});

test("a button dropdown can be created and appended to DOM", function() {
    appendIntoDOM(buttonDropdown);
    ok(isAppendedToDOM(buttonDropdown), 'a button dropdown has a layer in the DOM');
});

test("can accept a list of items to use for the dropdown", function() {
    buttonDropdown.set('items', controller.get('items'));
    equal(2, buttonDropdown.get('items.length'), 'is aware of the items from the controller');
});

test("can accept a label for the dropdown's title", function() {
    buttonDropdown.set('label', 'My Label');
    equal('My Label', buttonDropdown.get('label'), 'is able to set a title for the dropdown');
});