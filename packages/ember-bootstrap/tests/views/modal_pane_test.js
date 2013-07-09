var get = Ember.get, set = Ember.set;
var application, modalPane;

module("Bootstrap.ModalPane", {
  setup: function() {
    application = Ember.Application.create();
  },
  teardown: function() {
    destroyIfNecessary(modalPane);
    destroyIfNecessary(application);
  }
});

test("a modal pane can be created and appended to DOM using popup() call", function() {
  Ember.run(function() {
    modalPane = Bootstrap.ModalPane.popup();
  });
  ok(isAppendedToDOM(modalPane), 'a modal pane has a layer in the DOM');
});

test("a modal pane is appended to the application using popup() call", function() {
  destroyIfNecessary(application);
  var rootElement = Ember.$('<div id="app" />').appendTo('#qunit-fixture');
  application = Ember.Application.create({rootElement: "#app"});
  Ember.run(function() {
    modalPane = Bootstrap.ModalPane.popup();
  });
  ok((rootElement.find(modalPane.$()).length), 'a modal pane is appended to the application');
});

test("a modal pane can be created and appended to DOM", function() {
  modalPane = Bootstrap.ModalPane.create();
  appendIntoDOM(modalPane);
  ok(isAppendedToDOM(modalPane), 'a modal pane has a layer in the DOM');
});

test("a modal pane binds heading property to layer", function() {
  var heading = 'Oh my heading';
  modalPane = Bootstrap.ModalPane.create({ heading: heading });
  appendIntoDOM(modalPane);
  equal(modalPane.$().find('.modal-header h3').text(), heading,
        'a modal pane binds heading property modal pane header h3 tag');
});

test("a modal pane binds message property to layer", function() {
  var message = 'Oh my message';
  modalPane = Bootstrap.ModalPane.create({ message: message });
  appendIntoDOM(modalPane);
  equal(modalPane.$().find('.modal-body>p').text(), message,
        'a modal pane binds message property to modal pane body');
});

test("a modal pane shows primary button if primary property is present", function() {
  var primaryText = 'Oh my primary';
  modalPane = Bootstrap.ModalPane.create({ primary: primaryText });
  appendIntoDOM(modalPane);
  ok(modalPane.$().find('.modal-footer a.btn-primary').length, 'a modal pane displays primary button');
  equal(modalPane.$().find('.modal-footer a.btn-primary').text(), primaryText,
        'a modal pane binds primary property to primary button text');

  Ember.run(function() {
    modalPane.set('primary', null);
  });
  ok(!modalPane.$().find('.modal-footer a.btn-primary').length, "a modal pane hides primary button");
});

test("a modal pane shows secondary button if secondary property is present", function() {
  var secondaryText = 'Oh my secondary';
  modalPane = Bootstrap.ModalPane.create({ secondary: secondaryText });
  appendIntoDOM(modalPane);
  ok(modalPane.$().find('.modal-footer a.btn-secondary').length, 'a modal pane displays secondary button');
  equal(modalPane.$().find('.modal-footer a.btn-secondary').text(), secondaryText,
        'a modal pane binds secondary property to secondary button text');

  Ember.run(function() {
    modalPane.set('secondary', null);
  });
  ok(!modalPane.$().find('.modal-footer a.btn-secondary').length, "a modal pane hides secondary button");
});

test("a modal pane defines secondary button first so it sits to the left of the primary button if both are present", function() {
  var primaryText = 'Oh my primary',
      secondaryText = 'Oh my secondary';
  modalPane = Bootstrap.ModalPane.create({ primary: primaryText, secondary: secondaryText  });
  appendIntoDOM(modalPane);
  ok(modalPane.$().find('.modal-footer a.btn-secondary').next('a.btn-primary'), 'a modal pane defines secondary button first');
});

test("a modal pane footerViewClass may be extended", function() {
  modalPane = Bootstrap.ModalPane.create({
    footerViewClass: Ember.View.extend({
      classNames: ['custom-footer'],
      template: Ember.Handlebars.compile('custom footer')
    })
  });
  appendIntoDOM(modalPane);
  equal(modalPane.$().find('.modal-footer .custom-footer').text(), 'custom footer');
});

test("a modal pane does not get removed by clicking inside it", function() {
  modalPane = Bootstrap.ModalPane.create();
  appendIntoDOM(modalPane);
  modalPane.$().click();
  ok(isAppendedToDOM(modalPane), "modal pane is still in the DOM");
});

test("a modal pane has a close button that removes it from the DOM", function() {
  var close;
  modalPane = Bootstrap.ModalPane.create();
  appendIntoDOM(modalPane);
  clickRelLink(modalPane, 'close');
  ok(!isAppendedToDOM(modalPane), "modal pane is not in the DOM");
  ok(isDestroyed(modalPane), "modal pane is destroyed");
});

test("a modal pane calls callback when close button clicked", function() {
  var callback = function() { callbackWasCalled = true; },
      callbackWasCalled = false;
  modalPane = Bootstrap.ModalPane.create({
    callback: callback
  });
  appendIntoDOM(modalPane);
  clickRelLink(modalPane, 'close');
  ok(callbackWasCalled, "modal pane calls given callback when close button clicked");
  ok(!isAppendedToDOM(modalPane), "modal pane is not in the DOM");
  ok(isDestroyed(modalPane), "modal pane is destroyed");
});

test("a modal pane calls callback when primary button clicked and removes pane from the DOM", function() {
  var callback = function() { callbackWasCalled = true; },
      callbackWasCalled = false;
  modalPane = Bootstrap.ModalPane.create({
    primary: 'Primary button',
    callback: callback
  });
  appendIntoDOM(modalPane);
  clickRelLink(modalPane, 'primary');
  ok(callbackWasCalled, "modal pane calls given callback when primary button clicked");
  ok(!isAppendedToDOM(modalPane), "modal pane is not in the DOM");
  ok(isDestroyed(modalPane), "modal pane is destroyed");
});

test("a modal pane calls callback when primary button clicked which cancels removes pane from the DOM", function() {
  var callback = function() { callbackWasCalled = true; return false;},
      callbackWasCalled = false;
  modalPane = Bootstrap.ModalPane.create({
    primary: 'Primary button',
    callback: callback
  });
  appendIntoDOM(modalPane);
  clickRelLink(modalPane, 'primary');
  ok(callbackWasCalled, "modal pane calls given callback when primary button clicked");
  ok(isAppendedToDOM(modalPane), "modal pane is in the DOM");
  ok(!isDestroyed(modalPane), "modal pane is not destroyed");
});

test("a modal pane calls callback when primary button clicked which explicitly removes pane from the DOM", function() {
  var callback = function() { callbackWasCalled = true; return true;},
      callbackWasCalled = false;
  modalPane = Bootstrap.ModalPane.create({
    primary: 'Primary button',
    callback: callback
  });
  appendIntoDOM(modalPane);
  clickRelLink(modalPane, 'primary');
  ok(callbackWasCalled, "modal pane calls given callback when primary button clicked");
  ok(!isAppendedToDOM(modalPane), "modal pane is not in the DOM");
  ok(isDestroyed(modalPane), "modal pane is destroyed");
});

test("a modal pane calls callback which explicitly removes pane after second click from the DOM", function() {
  var callback = function() { callbackWasCalledCount++; return callbackWasCalledCount > 1;},
      callbackWasCalledCount = 0;
  modalPane = Bootstrap.ModalPane.create({
    primary: 'Primary button',
    callback: callback
  });
  appendIntoDOM(modalPane);
  clickRelLink(modalPane, 'primary');
  ok(isAppendedToDOM(modalPane), "modal pane is in the DOM");
  ok(!isDestroyed(modalPane), "modal pane is not destroyed");
  clickRelLink(modalPane, 'primary');
  ok(callbackWasCalledCount === 2, "modal pane calls given callback when primary button clicked");
  ok(!isAppendedToDOM(modalPane), "modal pane is not in the DOM");
  ok(isDestroyed(modalPane), "modal pane is destroyed");
});

test("a modal pane calls callback when secondary button clicked and removes pane from the DOM", function() {
  var callback = function() { callbackWasCalled = true; },
      callbackWasCalled = false;
  modalPane = Bootstrap.ModalPane.create({
    secondary: 'Secondary button',
    callback: callback
  });
  appendIntoDOM(modalPane);
  clickRelLink(modalPane, 'secondary');
  ok(callbackWasCalled, "modal pane calls given callback when secondary button clicked");
  ok(!isAppendedToDOM(modalPane), "modal pane is not in the DOM");
  ok(isDestroyed(modalPane), "modal pane is destroyed");
});

test("a modal pane removes itself from the DOM when escape pressed", function() {
  var callback = function() { callbackWasCalled = true; },
      callbackWasCalled = false,
      event;
  modalPane = Bootstrap.ModalPane.create({
    secondary: 'Secondary button',
    callback: callback
  });
  appendIntoDOM(modalPane);
  event = Ember.Object.create({ keyCode: 27 });
  Ember.run(function() {
    modalPane.keyPress(event);
  });
  ok(callbackWasCalled, "modal pane calls given callback when secondary button clicked");
  ok(!isAppendedToDOM(modalPane), "modal pane is not in the DOM");
  ok(isDestroyed(modalPane), "modal pane is destroyed");
});

test("a modal pane appends and removes backdrop to its parent", function() {
  modalPane = Bootstrap.ModalPane.create();
  ok(!documentHasSelector('body > .modal-backdrop'), "modal pane does not append backdrop before inserting into DOM");
  appendIntoDOM(modalPane);
  ok(documentHasSelector('body > .modal-backdrop'), "modal pane appends backdrop after inserting into DOM");
  destroyIfNecessary(modalPane);
  ok(!documentHasSelector('body > .modal-backdrop'), "modal pane removes backdrop after destroying");
});

test("a modal pane does not append or remove backdrop to its parent if showBackdrop is false", function() {
  modalPane = Bootstrap.ModalPane.create({ showBackdrop: false });
  appendIntoDOM(modalPane);
  ok(!documentHasSelector('body > .modal-backdrop'), "modal pane does not append backdrop after inserting into DOM");
});

