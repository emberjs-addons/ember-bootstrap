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

