var get = Ember.get, set = Ember.set, A = Ember.A;
var jQuery = window.jQuery;
var navList;

module("Bootstrap.NavList", {
  setup: function() {
  },
  teardown: function() {
    destroyIfNecessary(navList);
  }
});

test("a navigation list can be created and appended to DOM", function() {
  navList = Bootstrap.NavList.create({ content: new A() });
  appendIntoDOM(navList);
  ok(isAppendedToDOM(navList), 'a nav list has a layer in the DOM');
});

test("a navigation list binds titles from content array to DOM", function() {
  var layer;
  navList = Bootstrap.NavList.create({
    content: new A(['Hello', 'Ohai'])
  });
  appendIntoDOM(navList);
  layer = navList.$();
  equal(layer.find('li a').length, 2, 'a nav list has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'a nav list has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'a nav list has a layer in the DOM');
});

test("a navigation list binds titles from object to DOM", function() {
  var layer;
  navList = Bootstrap.NavList.create({
    content: new A([
      { title: 'Hello' },
      { title: 'Ohai' }
    ])
  });
  appendIntoDOM(navList);
  layer = navList.$();
  equal(layer.find('li a').length, 2, 'a nav list has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'a nav list has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'a nav list has a layer in the DOM');
});

test("a navigation list binds titles from custom property to DOM", function() {
  var layer;
  navList = Bootstrap.NavList.create({
    itemTitleKey: 'myKey',
    content: new A([
      { myKey: 'Hello' },
      { myKey: 'Ohai' },
    ])
  });
  appendIntoDOM(navList);
  layer = navList.$();
  equal(layer.find('li a').length, 2, 'a nav list has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'a nav list has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'a nav list has a layer in the DOM');
});

test("a navigation list binds links from object to DOM", function() {
  var layer;
  navList = Bootstrap.NavList.create({
    content: new A([
      { link: '/hello' },
      { }
    ])
  });
  appendIntoDOM(navList);
  layer = navList.$();
  equal(layer.find('li a').length, 2, 'a nav list has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).attr('href'), '/hello', 'a nav list has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).attr('href'), '#', 'a nav list has a layer in the DOM');
});

test("a navigation list binds links from custom property to DOM", function() {
  var layer;
  navList = Bootstrap.NavList.create({
    itemHrefKey: 'myLink',
    content: new A([
      { myLink: '/hello' },
      { myLink: '/ohai' },
    ])
  });
  appendIntoDOM(navList);
  layer = navList.$();
  equal(layer.find('li a').length, 2, 'a nav list has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).attr('href'), '/hello', 'a nav list has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).attr('href'), '/ohai', 'a nav list has a layer in the DOM');
});
