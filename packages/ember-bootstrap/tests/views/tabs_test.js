var get = Ember.get, set = Ember.set, A = Ember.A;
var jQuery = window.jQuery;
var tabs;

module("Bootstrap.Tabs", {
  setup: function() {
  },
  teardown: function() {
    destroyIfNecessary(tabs);
  }
});

test("tabs can be created and appended to DOM", function() {
  tabs = Bootstrap.Tabs.create({ content: new A() });
  appendIntoDOM(tabs);
  ok(isAppendedToDOM(tabs), 'a tabs pane has a layer in the DOM');
});

test("tabs can be stacked", function() {
  tabs = Bootstrap.Tabs.create({ content: new A(), isStacked: true });
  appendIntoDOM(tabs);
  ok(tabs.$().hasClass('nav-stacked'), 'an alert binds type property to class');
});

test("tabs binds titles from content array to DOM", function() {
  var layer;
  tabs = Bootstrap.Tabs.create({
    content: new A(['Hello', 'Ohai'])
  });
  appendIntoDOM(tabs);
  layer = tabs.$();
  equal(layer.find('li a').length, 2, 'tabs has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'tabs has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'tabs has a layer in the DOM');
});

test("tabs list binds titles from object to DOM", function() {
  var layer;
  tabs = Bootstrap.Tabs.create({
    content: new A([
      { title: 'Hello' },
      { title: 'Ohai' }
    ])
  });
  appendIntoDOM(tabs);
  layer = tabs.$();
  equal(layer.find('li a').length, 2, 'tabs has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'tabs has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'tabs has a layer in the DOM');
});

test("tabs binds titles from custom property to DOM", function() {
  var layer;
  tabs = Bootstrap.Tabs.create({
    itemTitleKey: 'myKey',
    content: new A([
      { myKey: 'Hello' },
      { myKey: 'Ohai' },
    ])
  });
  appendIntoDOM(tabs);
  layer = tabs.$();
  equal(layer.find('li a').length, 2, 'tabs has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'tabs has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'tabs has a layer in the DOM');
});

test("tabs binds links from object to DOM", function() {
  var layer;
  tabs = Bootstrap.Tabs.create({
    content: new A([
      { link: '/hello' },
      { }
    ])
  });
  appendIntoDOM(tabs);
  layer = tabs.$();
  equal(layer.find('li a').length, 2, 'tabs has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).attr('href'), '/hello', 'tabs has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).attr('href'), '#', 'tabs has a layer in the DOM');
});

test("tabs binds links from custom property to DOM", function() {
  var layer;
  tabs = Bootstrap.Tabs.create({
    itemHrefKey: 'myLink',
    content: new A([
      { myLink: '/hello' },
      { myLink: '/ohai' },
    ])
  });
  appendIntoDOM(tabs);
  layer = tabs.$();
  equal(layer.find('li a').length, 2, 'tabs has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).attr('href'), '/hello', 'tabs has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).attr('href'), '/ohai', 'tabs has a layer in the DOM');
});
