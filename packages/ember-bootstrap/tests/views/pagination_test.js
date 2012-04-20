var get = Ember.get, getPath = Ember.getPath, set = Ember.set, A = Ember.A;
var pagination;

module("Bootstrap.Pagination", {
  setup: function() {
  },
  teardown: function() {
    Ember.run(function() {
      destroyIfNecessary(pagination);
    });
  }
});

test("a pagination can be created and appended to DOM", function() {
  pagination = Bootstrap.Pagination.create();
  appendIntoDOM(pagination);
  
  ok(isAppendedToDOM(pagination), "a pagination has a layer in the DOM");
});

test("a pagination has content and defaults", function() {
  pagination = Bootstrap.Pagination.create({ content: A([]) });
  appendIntoDOM(pagination);
  
  equal(getPath(pagination, "content.length"), 0, "the pagination content is empty");
  ok(pagination.$().hasClass("pagination"), "a pagination has 'pagination' as class name");
});

test("a pagination has content and defaults", function() {
  pagination = Bootstrap.Pagination.create({
    content: A(["1", "2", "3"])
  });
  appendIntoDOM(pagination);
  equal(getPath(pagination, "content.length"), 3, "a pagination with content 1, 2, 3 should have a content length of three");
  equal(pagination.$("li").size(), 3, "a pagination with content 1, 2, 3 should have three li");
  Ember.run(function() {
    pagination.set("selection",  "2");
  });
  equal(pagination.$(".active").size(), 1, "a pagination being selected has an element with an active class");
});

