var get = Ember.get, set = Ember.set, A = Ember.A, run = Ember.run;
var breadcrumb, single, many;

module('Bootstrap.Breadcrumb', {
  setup: function() {
    single = Ember.A(['Home']);
    many = Ember.A(['Home', 'Library', 'Data']);
  },
  teardown: function() {
    destroyIfNecessary(breadcrumb);
  }
});

test('a breadcrumb can be created, appended to DOM and is styled', function() {
  breadcrumb = Bootstrap.Breadcrumb.create();
  appendIntoDOM(breadcrumb);
  ok(isAppendedToDOM(breadcrumb), 'a breadcrumb has a layer in the DOM');

  ok(breadcrumb.$().hasClass('breadcrumb'), 'a breadcrumb has class named breadcrumb');
  run(function() {
    set(breadcrumb, 'content', new A(single));
  });
  equal(breadcrumb.$().children().filter('.active').size(), 1, 'a non empty breadcrumb should have a children with the active class');

});

test('a breadcrumb have children', function() {
  breadcrumb = Bootstrap.Breadcrumb.create();
  appendIntoDOM(breadcrumb);

  equal(breadcrumb.$('li').size(), 0, 'the breadcrumb with a single element does have a child');

  run(function() {
    set(breadcrumb, 'content', single);
  });
  equal(breadcrumb.$('li').size(), 1, 'the breadcrumb with a single element does have a child');

  run(function() {
    set(breadcrumb, 'content', many);
  });
  equal(breadcrumb.$('li').size(), 3, 'the breadcrumb with 3 elements have 3 children');
  equal(breadcrumb.$('a:first').text(), 'Home', 'the breadcrumb first item has text === Home and its and anchor');
  equal(breadcrumb.$('li:last').text(), 'Data', 'the breadcrumb last item has text === Data and does not have an anchor');

  run(function() {
    get(breadcrumb, 'content').pushObject('Another');
  });
  equal(breadcrumb.$('li').size(), 4, 'the breadcrumb with 4 elements have 4 children');
  equal(breadcrumb.$('a').size(), 3, 'the breadcrumb with 4 elements have 3 children with anchors');

  run(function() {
    get(breadcrumb, 'content').removeObject('Another');
  });
  equal(breadcrumb.$('li').size(), 3, 'the breadcrumb with 3 elements have 3 children');
  equal(breadcrumb.$('a').size(), 2, 'the breadcrumb with 3 elements have 2 children with anchors');


});

test('a breadcrumb have divider', function() {
  breadcrumb = Bootstrap.Breadcrumb.create();
  appendIntoDOM(breadcrumb);
  equal(breadcrumb.get('divider'), '/', 'a breadcrumb has / as default divider (test for backward compatibility).');
  breadcrumb.set('divider', '>');
  equal(breadcrumb.get('divider'), '>', 'the breadcrumb divider has been changed to >');

  run(function() {
    set(breadcrumb, 'content', new A(single));
  });
  equal(breadcrumb.$('.divider').size(), 0, 'the breadcrumb with a single element does not have divider');

  run(function() {
    set(breadcrumb, 'content', new A(many));
  });
  equal(breadcrumb.$('.divider').size(), 2, 'the breadcrumb with 3 elements have 2 dividers');

});



