var get = Ember.get, set = Ember.set, A = Ember.A;
var jQuery = window.jQuery;
var application, pills;

module("Bootstrap.Pills", {
  setup: function() {
    application = Ember.Application.create();
  },
  teardown: function() {
    destroyIfNecessary(pills);
    destroyIfNecessary(application);
  }
});

test("pills can be created and appended to DOM", function() {
  pills = Bootstrap.Pills.create({ content: new A() });
  appendIntoDOM(pills);
  ok(isAppendedToDOM(pills), 'a pills pane has a layer in the DOM');
});

test("pills can be stacked", function() {
  pills = Bootstrap.Pills.create({ content: new A(), isStacked: true });
  appendIntoDOM(pills);
  ok(pills.$().hasClass('nav-stacked'), 'an alert binds type property to class');
});

test("pills binds titles from content array to DOM", function() {
  var layer;
  pills = Bootstrap.Pills.create({
    content: new A(['Hello', 'Ohai'])
  });
  appendIntoDOM(pills);
  layer = pills.$();
  equal(layer.find('li a').length, 2, 'pills has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'pills has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'pills has a layer in the DOM');
});

test("pills list binds titles from object to DOM", function() {
  var layer;
  pills = Bootstrap.Pills.create({
    content: new A([
      { title: 'Hello' },
      { title: 'Ohai' }
    ])
  });
  appendIntoDOM(pills);
  layer = pills.$();
  equal(layer.find('li a').length, 2, 'pills has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'pills has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'pills has a layer in the DOM');
});

test("pills binds titles from custom property to DOM", function() {
  var layer;
  pills = Bootstrap.Pills.create({
    itemTitleKey: 'myKey',
    content: new A([
      { myKey: 'Hello' },
      { myKey: 'Ohai' },
    ])
  });
  appendIntoDOM(pills);
  layer = pills.$();
  equal(layer.find('li a').length, 2, 'pills has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'pills has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'pills has a layer in the DOM');
});

test("pills binds links from object to DOM", function() {
  var layer;
  pills = Bootstrap.Pills.create({
    content: new A([
      { link: '/hello' },
      { }
    ])
  });
  appendIntoDOM(pills);
  layer = pills.$();
  equal(layer.find('li a').length, 2, 'pills has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).attr('href'), '/hello', 'pills has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).attr('href'), '#', 'pills has a layer in the DOM');
});

test("pills binds links from custom property to DOM", function() {
  var layer;
  pills = Bootstrap.Pills.create({
    itemHrefKey: 'myLink',
    content: new A([
      { myLink: '/hello' },
      { myLink: '/ohai' },
    ])
  });
  appendIntoDOM(pills);
  layer = pills.$();
  equal(layer.find('li a').length, 2, 'pills has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).attr('href'), '/hello', 'pills has a layer in the DOM');
  equal(jQuery(layer.find('li a')[1]).attr('href'), '/ohai', 'pills has a layer in the DOM');
});
