var get = Ember.get, set = Ember.set, A = Ember.A;
var well;

module("Bootstrap.Well", {
  setup: function() {
  },
  teardown: function() {
    destroyIfNecessary(well);
  }
});

test("a well can be created and appended to DOM", function() {
  well = Bootstrap.Well.create();
  appendIntoDOM(well);
  ok(isAppendedToDOM(well), 'a well has a layer in the DOM');
});

test("a well binds content to innerHTML div", function() {
  well = Bootstrap.Well.create({ content: 'it is a well' });
  appendIntoDOM(well);
  equal(well.$().text(), 'it is a well', 'a well binds content in innerHTML');
  Ember.run(function() {
    well.set('content', 'the well changed');
  });
  equal(well.$().text(), 'the well changed', 'a well binds content in innerHTML');
});

