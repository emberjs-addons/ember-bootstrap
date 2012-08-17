var get = Ember.get, set = Ember.set, A = Ember.A;
var application, pillItem;

module("Bootstrap.PillItem", {
  setup: function() {
    application = Ember.Application.create();
  },
  teardown: function() {
    Ember.run(function() {
      destroyIfNecessary(pillItem);
      application.destroy();
    });
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

test("a pill sets selection on parentView when clicked", function() {
  var parentView = Ember.CollectionView.create({
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
  parentView.destroy();
});

test("a pill has active class when parent view has selection of item content", function() {
  var parentView = Ember.CollectionView.create({
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
  parentView.destroy();
});

