var application, pillItem;
var get = Ember.get, set = Ember.set;

module("Ember.PillItem", {
  setup: function() {
    application = Ember.Application.create();
    get(application, 'eventDispatcher').setup();
  },
  teardown: function() {
    if (pillItem && !pillItem.get('isDestroyed')) {
      pillItem.destroy();
    }
  }
});

test("a pill item can be created and appended to DOM", function() {
  pillItem = Ember.PillItem.create();
  Ember.run(function() {
    pillItem.append();
  });
  ok(pillItem.$().length, 'a pillItem pane has a layer in the DOM');
});

test("a pill item binds title property to DOM", function() {
  var title;
  pillItem = Ember.PillItem.create(), close;
  Ember.run(function() {
    pillItem.append();
    title = 'oh my output';
    pillItem.set('title', title);
  });
  equal(pillItem.$().find('a').text(), title, 'pill item binds given title to DOM');
});

