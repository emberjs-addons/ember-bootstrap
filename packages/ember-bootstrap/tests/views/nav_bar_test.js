var get = Ember.get, set = Ember.set, A = Ember.A;
var jQuery = window.jQuery;
var navBar;

module("Bootstrap.NavBar", {
  setup: function() {
  },
  teardown: function() {
    destroyIfNecessary(navBar);
  }
});

test("a navigation bar can be created and appended to DOM", function() {
  navBar = Bootstrap.NavBar.create({ content: new A(), title: "Greetings" });
  appendIntoDOM(navBar);
  ok(isAppendedToDOM(navBar), 'a nav bar has a layer in the DOM');
});

test("a navigation bar binds title and adds to the brand", function() {
  var layer;
  navBar = Bootstrap.NavBar.create({ content: new A(), title: "Greetings" });
  appendIntoDOM(navBar);
  layer = navBar.$();
  equal(layer.find('div.navbar-inner a.brand').length, 1, 'a nav bar has a brand title');
});

test("a navigation bar doesn't binds title if it isn't set", function() {
  var layer;
  navBar = Bootstrap.NavBar.create({ content: new A() });
  appendIntoDOM(navBar);
  layer = navBar.$();
  equal(layer.find('div.navbar-inner a.brand').length, 0, 'a nav bar has no brand title');
});

test("a navigation bar binds titles from content array to DOM", function() {
  var layer;
  navBar = Bootstrap.NavBar.create({
    content: new A(['Hello', 'Ohai'])
  });
  appendIntoDOM(navBar);
  layer = navBar.$();
  equal(layer.find('div ul li').length, 2, 'a nav bar has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'a nav bar has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'a nav bar has a layer in the DOM');
});

test("a navigation bar binds titles from object to DOM", function() {
  var layer;
  navBar = Bootstrap.NavBar.create({
    content: new A([
      { title: 'Hello' },
      { title: 'Ohai' }
    ])
  });
  appendIntoDOM(navBar);
  layer = navBar.$();
  equal(layer.find('li a').length, 2, 'a nav bar has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'a nav bar has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'a nav bar has a layer in the DOM');
});

test("a navigation bar binds titles from custom property to DOM", function() {
  var layer;
  navBar = Bootstrap.NavBar.create({
    itemTitleKey: 'myKey',
    content: new A([
      { myKey: 'Hello' },
      { myKey: 'Ohai' },
    ])
  });
  appendIntoDOM(navBar);
  layer = navBar.$();
  equal(layer.find('li a').length, 2, 'a nav bar has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'a nav bar has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'a nav bar has a layer in the DOM');
});

test("a navigation bar binds links from object to DOM", function() {
  var layer;
  navBar = Bootstrap.NavBar.create({
    content: new A([
      { link: '/hello' },
      { }
    ])
  });
  appendIntoDOM(navBar);
  layer = navBar.$();
  equal(layer.find('li a').length, 2, 'a nav bar has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).attr('href'), '/hello', 'a nav bar has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).attr('href'), '#', 'a nav bar has a layer in the DOM');
});

test("a navigation bar binds links from custom property to DOM", function() {
  var layer;
  navBar = Bootstrap.NavBar.create({
    itemHrefKey: 'myLink',
    content: new A([
      { myLink: '/hello' },
      { myLink: '/ohai' }
    ])
  });
  appendIntoDOM(navBar);
  layer = navBar.$();
  equal(layer.find('li a').length, 2, 'a nav bar has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).attr('href'), '/hello', 'a nav bar has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).attr('href'), '/ohai', 'a nav bar has a layer in the DOM');
});

test("a navigation bar binds selection from the view", function() {
  var layer;
  var content = new A(['Hello', 'Ohai']);
  navBar = Bootstrap.NavBar.create({
    content: content,
    selection: content[0]
  });
  appendIntoDOM(navBar);
  layer = navBar.$();
  equal(layer.find('li.active a').length, 1, 'a nav bar has a layer in the DOM');
  equal(jQuery(layer.find('li.active a')[0]).text(), 'Hello', 'a nav bar has a layer in the DOM');
});
