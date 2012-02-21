require('ember-bootstrap/~tests/test_helpers');

var application, navList;
var get = Ember.get, set = Ember.set, A = Ember.A;

module("Bootstrap.NavList", {
  setup: function() {
    application = Ember.Application.create();
    get(application, 'eventDispatcher').setup();
  },
  teardown: function() {
    if (navList && !navList.get('isDestroyed')) {
      navList.destroy();
    }
  }
});

test("a navigation list can be created and appended to DOM", function() {
  navList = Bootstrap.NavList.create({ content: A() });
  appendIntoDOM(navList);
  ok(isAppendedToDOM(navList), 'a navList has a layer in the DOM');
});

test("a navigation list binds titles from content array to DOM", function() {
  var layer;
  navList = Bootstrap.NavList.create({
    content: A(['Hello', 'Ohai'])
  });
  appendIntoDOM(navList);
  layer = navList.$();
  equals(layer.find('li a').length, 2, 'a navList has a layer in the DOM');
  equals(jQuery(layer.find('li a')[0]).text(), 'Hello', 'a navList has a layer in the DOM');
  equals(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'a navList has a layer in the DOM');
});

test("a navigation list binds titles from object to DOM", function() {
  var layer;
  navList = Bootstrap.NavList.create({
    content: A([
      { title: 'Hello' },
      { title: 'Ohai' }
    ])
  });
  appendIntoDOM(navList);
  layer = navList.$();
  equals(layer.find('li a').length, 2, 'a navList has a layer in the DOM');
  equals(jQuery(layer.find('li a')[0]).text(), 'Hello', 'a navList has a layer in the DOM');
  equals(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'a navList has a layer in the DOM');
});

test("a navigation list binds titles from custom property to DOM", function() {
  var layer;
  navList = Bootstrap.NavList.create({
    itemTitleKey: 'myKey',
    content: A([
      { myKey: 'Hello' },
      { myKey: 'Ohai' },
    ])
  });
  appendIntoDOM(navList);
  layer = navList.$();
  equals(layer.find('li a').length, 2, 'a navList has a layer in the DOM');
  equals(jQuery(layer.find('li a')[0]).text(), 'Hello', 'a navList has a layer in the DOM');
  equals(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'a navList has a layer in the DOM');
});


