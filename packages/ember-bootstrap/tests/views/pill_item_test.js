var get = Ember.get, set = Ember.set, A = Ember.A;
var jQuery = window.jQuery;
var application, pillItem, parentView;

module("Bootstrap.PillItem", {
  setup: function() {
    application = Ember.Application.create();
  },
  teardown: function() {
    destroyIfNecessary(pillItem);
    destroyIfNecessary(parentView);
    destroyIfNecessary(application);
  }
});

test("a pill item can be created and appended to DOM", function() {
  pillItem = Bootstrap.PillItem.create();
  appendIntoDOM(pillItem);
  ok(isAppendedToDOM(pillItem), 'a pillItem pane has a layer in the DOM');
});

test("a pill item binds content property to DOM", function() {
  var content = 'oh my output';
  pillItem = Bootstrap.PillItem.create();
  pillItem.set('content', content);
  Ember.run(function() {
    pillItem.append();
  });
  equal(pillItem.$().find('a').text(), content, 'pill item binds given content to DOM');
});

test("a pill item binds parentView titles from content array to DOM", function() {
  var layer;
  parentView = Ember.CollectionView.create({
    tagName: 'ul',
    itemViewClass: Bootstrap.PillItem,
    content: new A(['Hello', 'Ohai'])
  });
  appendIntoDOM(parentView);
  layer = parentView.$();
  equal(layer.find('li a').length, 2, 'a nav list has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'a pill item has proper title');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'a pill item has proper title');
});

test("a pill item binds parentView titles from object to DOM", function() {
  var layer;
  parentView = Ember.CollectionView.create({
    tagName: 'ul',
    itemViewClass: Bootstrap.PillItem,
    content: new A([
      { title: 'Hello' },
      { title: 'Ohai' }
    ])
  });
  appendIntoDOM(parentView);
  layer = parentView.$();
  equal(layer.find('li a').length, 2, 'a parent has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).text(), 'Hello', 'a pill item has proper title');
  equal(jQuery(layer.find('li a')[1]).text(), 'Ohai', 'a pill item has proper title');
});

test("a pill item binds parentView link from object to DOM", function() {
  var layer;
  parentView = Ember.CollectionView.create({
    tagName: 'ul',
    itemViewClass: Bootstrap.PillItem,
    content: new A([
      { link: '/hello' },
      { }
    ])
  });
  appendIntoDOM(parentView);
  layer = parentView.$();
  equal(layer.find('li a').length, 2, 'a parent view has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).attr('href'), '/hello', 'a pill item has proper link');
  equal(jQuery(layer.find('li a')[1]).attr('href'), '#', 'a pill item has proper link');
});

test("a pill item binds parentView links from custom property to DOM", function() {
  var layer;
  parentView = Ember.CollectionView.create({
    tagName: 'ul',
    itemViewClass: Bootstrap.PillItem,
    itemHrefKey: 'myLink',
    content: new A([
      { myLink: '/hello' },
      { myLink: '/ohai' },
    ])
  });
  appendIntoDOM(parentView);
  layer = parentView.$();
  equal(layer.find('li a').length, 2, 'a parent view has a layer in the DOM');
  equal(jQuery(layer.find('li a')[0]).attr('href'), '/hello', 'a pill item has proper link');
  equal(jQuery(layer.find('li a')[1]).attr('href'), '/ohai', 'a pill item has proper link');
});

test("a pill sets selection on parentView when clicked", function() {
  parentView = Ember.CollectionView.create({
    tagName: 'ul',
    itemViewClass: Bootstrap.PillItem,
    content: new A(['A', 'B', 'C']),
    selection: null
  });
  appendIntoDOM(parentView);
  parentView.$().find('li:last').click(); // select the last pill
  equal(parentView.get('selection'), 'C', "pill item sets its content as a selection");
  parentView.$().find('li:first').click(); // select the first pill
  equal(parentView.get('selection'), 'A', "pill item sets its content as a selection");
});

test("a pill has active class when parent view has selection of item content", function() {
  parentView = Ember.CollectionView.create({
    tagName: 'ul',
    itemViewClass: Bootstrap.PillItem,
    content: new A(['A', 'B', 'C']),
    selection: 'A'
  });
  appendIntoDOM(parentView);
  ok(parentView.$().find('li:first').hasClass('active'), "selected item has active class");
  Ember.run(function() {
    parentView.set('selection', 'C');
  });
  ok(parentView.$().find('li:last').hasClass('active'), "only selected item has active class");
  ok(!parentView.$().find('li:first').hasClass('active'), "only selected item has active class");
});
