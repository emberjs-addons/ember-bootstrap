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

test("a modal pane can be created and appended to DOM", function() {
  modalPane = Ember.ModalPane.create();
  Ember.run(function() {
    modalPane.append();
  });
  ok(modalPane.$().length, 'a modal pane has a layer in the DOM');
});

test("a modal pane binds heading property to layer", function() {
  var heading = 'Oh my heading';
  modalPane = Ember.ModalPane.create({ heading: heading });
  Ember.run(function() {
    modalPane.append();
  });
  equal(modalPane.$().find('.modal-header h3').text(), heading,
        'a modal pane binds heading property modal pane header h3 tag');
});

test("a modal pane binds message property to layer", function() {
  var message = 'Oh my message';
  modalPane = Ember.ModalPane.create({ message: message });
  Ember.run(function() {
    modalPane.append();
  });
  equal(modalPane.$().find('.modal-body>p').text(), message,
        'a modal pane binds message property to modal pane body');
});

test("a modal pane shows primary button if primary property is present", function() {
  var primaryText = 'Oh my primary';
  modalPane = Ember.ModalPane.create({ primary: primaryText });
  Ember.run(function() {
    modalPane.append();
  });
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
  Ember.run(function() {
    modalPane.append();
  });
  ok(modalPane.$().find('.modal-footer a.secondary').length, 'a modal pane displays secondary button');
  equal(modalPane.$().find('.modal-footer a.secondary').text(), secondaryText,
        'a modal pane binds secondary property to secondary button text');

  Ember.run(function() {
    modalPane.set('secondary', null);
  });
  ok(!modalPane.$().find('.modal-footer a.secondary').length, "a modal pane hides secondary button");
});

