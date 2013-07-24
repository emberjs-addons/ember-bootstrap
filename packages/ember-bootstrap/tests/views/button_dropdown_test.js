var get = Ember.get, set = Ember.set;
var application, controller, buttonDropdown;

module("Bootstrap.ButtonDropdown", {
  setup: function() {
    application = Ember.Application.create();
    controller = Ember.ArrayController.create({
      currentItem: null,

      content: Ember.A([
                       Ember.Object.create({ label: 'First Link', actionName: 'setItem' }),
                       Ember.Object.create({ label: 'Second Link', actionName: 'removeItem', disabled: true })
      ]),

      setItem: function(item) {
        this.set('currentItem', item);
      },
      removeItem: function(item) {
        this.set('currentItem', null);
      }
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
  buttonDropdown.set('items', controller.get('content'));
  equal(buttonDropdown.get('items.length'), 2, 'is aware of the items from the controller');
});

test("can accept a label for the dropdown's title", function() {
  buttonDropdown.set('label', 'My Label');
  equal(buttonDropdown.get('label'), 'My Label', 'is able to set a title for the dropdown');
});

test("can append an item to the dropdown", function() {
  buttonDropdown.set('items', controller.get('content'));
  appendIntoDOM(buttonDropdown);
  var view = buttonDropdown.$();
  equal(view.find('li').length, 2);

  Ember.run(function() {
    controller.get('content').pushObject(Ember.Object.create({ label: 'Third Link', actionName: 'noop' }));
  });

  equal(view.find('li').length, 3);
});

test("can remove an item from the dropdown", function() {
  buttonDropdown.set('items', controller.get('content'));
  appendIntoDOM(buttonDropdown);
  var view = buttonDropdown.$();
  equal(view.find('li').length, 2, 'Can add an element from the dropdown list');

  Ember.run(function() {
    var secondObject = controller.get('content').findProperty('label', 'Second Link');
    controller.get('content').removeObject(secondObject);
  });

  equal(view.find('li').length, 1, 'Can remove an element from the dropdown list');
});

test("can change the value of an inserted item", function() {
  buttonDropdown.set('items', controller.get('content'));
  appendIntoDOM(buttonDropdown);
  var view = buttonDropdown.$(),
  item = controller.get('content.firstObject');

  equal(view.find('li').first().text(), 'First Link', 'The first item has it\'s original value');
  item.set('label', 'Changed Value');
  equal(view.find('li').first().text(), 'Changed Value', 'The first item has changed it\'s value in the dom');
});

test("can change the action of an inserted item", function() {
  buttonDropdown.set('items', controller.get('content'));
  appendIntoDOM(buttonDropdown);
  var view = buttonDropdown.$(),
  item = controller.get('content.firstObject');

  controller.set('currentItem', 'invalid item');
  item.set('actionName', 'removeItem');
  view.find('li a').first().click();
  equal(controller.get('currentItem'), null, 'the current item has been nullified');
});

test("can click on an item", function() {
  buttonDropdown.set('items', controller.get('content'));
  appendIntoDOM(buttonDropdown);
  var view = buttonDropdown.$(),
  item = controller.get('content.firstObject');

  equal(controller.get('currentItem'), null, 'the current item is not yet defined');
  view.find('li a').first().click();
  equal(controller.get('currentItem'), item, 'the current item is defined');
});

test("cannot click on a disabled item", function() {
  buttonDropdown.set('items', controller.get('content'));
  appendIntoDOM(buttonDropdown);
  var view = buttonDropdown.$(),
  item = controller.get('content.firstObject');

  item.set('disabled', true);
  equal(controller.get('currentItem'), null, 'the current item is not yet defined');
  view.find('li a').last().click();
  equal(controller.get('currentItem'), null, 'the current item is not yet defined');
});
