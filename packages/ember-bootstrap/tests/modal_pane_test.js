require('ember-bootstrap/~tests/test_helpers');

var application, modalPane;
var get = Ember.get, set = Ember.set;

module("Ember.ModalPane", {
  setup: function() {
    application = Ember.Application.create();
    get(application, 'eventDispatcher').setup();
  },
  teardown: function() {
    if (modalPane && !modalPane.get('isDestroyed')) {
      modalPane.destroy();
    }
  }
});

test("a modal pane can be created and appended to DOM using popup() call", function() {
  Ember.run(function() {
    modalPane = Ember.ModalPane.popup();
  });
  ok(modalPane.$().length, 'a modal pane has a layer in the DOM');
});

test("a modal pane can be created and appended to DOM", function() {
  modalPane = Ember.ModalPane.create();
  appendIntoDOM(modalPane);
  ok(modalPane.$().length, 'a modal pane has a layer in the DOM');
});

test("a modal pane binds heading property to layer", function() {
  var heading = 'Oh my heading';
  modalPane = Ember.ModalPane.create({ heading: heading });
  appendIntoDOM(modalPane);
  equal(modalPane.$().find('.modal-header h3').text(), heading,
        'a modal pane binds heading property modal pane header h3 tag');
});

test("a modal pane binds message property to layer", function() {
  var message = 'Oh my message';
  modalPane = Ember.ModalPane.create({ message: message });
  appendIntoDOM(modalPane);
  equal(modalPane.$().find('.modal-body>p').text(), message,
        'a modal pane binds message property to modal pane body');
});

test("a modal pane shows primary button if primary property is present", function() {
  var primaryText = 'Oh my primary';
  modalPane = Ember.ModalPane.create({ primary: primaryText });
  appendIntoDOM(modalPane);
  ok(modalPane.$().find('.modal-footer a.primary').length, 'a modal pane displays primary button');
  equal(modalPane.$().find('.modal-footer a.primary').text(), primaryText,
        'a modal pane binds primary property to primary button text');

  Ember.run(function() {
    modalPane.set('primary', null);
  });
  ok(!modalPane.$().find('.modal-footer a.primary').length, "a modal pane hides primary button");
});

test("a modal pane shows secondary button if secondary property is present", function() {
  var secondaryText = 'Oh my secondary';
  modalPane = Ember.ModalPane.create({ secondary: secondaryText });
  appendIntoDOM(modalPane);
  ok(modalPane.$().find('.modal-footer a.secondary').length, 'a modal pane displays secondary button');
  equal(modalPane.$().find('.modal-footer a.secondary').text(), secondaryText,
        'a modal pane binds secondary property to secondary button text');

  Ember.run(function() {
    modalPane.set('secondary', null);
  });
  ok(!modalPane.$().find('.modal-footer a.secondary').length, "a modal pane hides secondary button");
});

test("a modal pane does not get removed by clicking inside it", function() {
  modalPane = Ember.ModalPane.create();
  appendIntoDOM(modalPane);
  modalPane.$().click();
  ok(modalPane.$().length, "modal pane is still in the DOM");
});

test("a modal pane has a close button that removes it from the DOM", function() {
  var close;
  modalPane = Ember.ModalPane.create();
  appendIntoDOM(modalPane);
  clickRelLink(modalPane, 'close');
  ok(!modalPane.$().length, "modal pane is not in the DOM");
  ok(modalPane.get('isDestroyed'), "modal pane is destroyed");
});

test("a modal pane calls callback when close button clicked", function() {
  var callback = function() { callbackWasCalled = true },
      callbackWasCalled = false;
  modalPane = Ember.ModalPane.create({
    callback: callback
  });
  appendIntoDOM(modalPane);
  clickRelLink(modalPane, 'close');
  ok(callbackWasCalled, "modal pane calls given callback when close button clicked");
  ok(!modalPane.$().length, "modal pane is not in the DOM");
  ok(modalPane.get('isDestroyed'), "modal pane is destroyed");
});

test("a modal pane calls callback when primary button clicked and removes pane from the DOM", function() {
  var callback = function() { callbackWasCalled = true },
      callbackWasCalled = false;
  modalPane = Ember.ModalPane.create({
    primary: 'Primary button',
    callback: callback
  });
  appendIntoDOM(modalPane);
  clickRelLink(modalPane, 'primary');
  ok(callbackWasCalled, "modal pane calls given callback when primary button clicked");
  ok(!modalPane.$().length, "modal pane is not in the DOM");
  ok(modalPane.get('isDestroyed'), "modal pane is destroyed");
});

test("a modal pane calls callback when secondary button clicked and removes pane from the DOM", function() {
  var callback = function() { callbackWasCalled = true },
      callbackWasCalled = false;
  modalPane = Ember.ModalPane.create({
    secondary: 'Secondary button',
    callback: callback
  });
  appendIntoDOM(modalPane);
  clickRelLink(modalPane, 'secondary');
  ok(callbackWasCalled, "modal pane calls given callback when secondary button clicked");
  ok(!modalPane.$().length, "modal pane is not in the DOM");
  ok(modalPane.get('isDestroyed'), "modal pane is destroyed");
});

