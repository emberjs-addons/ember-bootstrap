var get = Ember.get, set = Ember.set, A = Ember.A;
var pagination;

module("Bootstrap.Pagination", {
  setup: function() {
  },
  teardown: function() {
    destroyIfNecessary(pagination);
  }
});

test("a pagination can be created and appended to DOM", function() {
  pagination = Bootstrap.Pagination.create();
  appendIntoDOM(pagination);

  ok(isAppendedToDOM(pagination), "a pagination has a layer in the DOM");
});

test("a pagination has content and defaults", function() {
  pagination = Bootstrap.Pagination.create({ content: new A([]) });
  appendIntoDOM(pagination);

  equal(get(pagination, "content.length"), 0, "the pagination content is empty");
  ok(pagination.$().hasClass("pagination"), "a pagination has 'pagination' as class name");
});

test("a pagination has content and defaults", function() {
  pagination = Bootstrap.Pagination.create({
    content: new A(["1", "2", "3"])
  });
  appendIntoDOM(pagination);
  equal(get(pagination, "content.length"), 3, "a pagination with content 1, 2, 3 should have a content length of three");
  equal(pagination.$("li").size(), 3, "a pagination with content 1, 2, 3 should have three li");
  Ember.run(function() {
    pagination.set("selection",  "1");
  });
  equal(pagination.$(".active").size(), 1, "a pagination being selected has an element with an active class");
  Ember.run(function() {
    pagination.set("selection",  "3");
  });
  equal(pagination.$(".active").size(), 1, "a pagination being selected has an element with an active class");
  ok(!pagination.$("li:first").hasClass("active"), "a pagination not being selected is not an element with an active class");
  ok(pagination.$("li:last").hasClass("active"), "a pagination being selected has an element with an active class");

  equal(pagination.$("li a[href='#']").size(), 3, "a pagination with 3 components have all '#' as href");
});

test("a pagination has content and defaults", function() {
  var o1 = Ember.Object.create({title:"1"});
  var o2 = Ember.Object.create({title:"2"});
  var o3 = Ember.Object.create({title:"3"});
  pagination = Bootstrap.Pagination.create({
    content: new A([o1, o2, o3])
  });
  appendIntoDOM(pagination);
  equal(get(pagination, "content.length"), 3, "a pagination with content 1, 2, 3 should have a content length of three");
  equal(pagination.$("li").size(), 3, "a pagination with content 1, 2, 3 should have three li");
  Ember.run(function() {
    pagination.set("selection",  o1);
  });
  equal(pagination.$(".active").size(), 1, "a pagination being selected has an element with an active class");
  Ember.run(function() {
    pagination.set("selection",  o3);
  });
  equal(pagination.$(".active").size(), 1, "a pagination being selected has an element with an active class");
  ok(!pagination.$("li:first").hasClass("active"), "a pagination not being selected is not an element with an active class");
  ok(pagination.$("li:last").hasClass("active"), "a pagination being selected has an element with an active class");
  
  equal(pagination.$("li a[href='#']").size(), 3, "a pagination with 3 components have all '#' as href");
});

test("a pagination has content and defaults", function() {
  var o1 = Ember.Object.create({title:"1", href:"1"});
  var o2 = Ember.Object.create({title:"2", href:"2"});
  var o3 = Ember.Object.create({title:"3", href:"3"});
  pagination = Bootstrap.Pagination.create({
    content: new A([o1, o2, o3])
  });
  appendIntoDOM(pagination);
  equal(get(pagination, "content.length"), 3, "a pagination with content 1, 2, 3 should have a content length of three");
  equal(pagination.$("li").size(), 3, "a pagination with content 1, 2, 3 should have three li");
  Ember.run(function() {
    pagination.set("selection",  o1);
  });
  equal(pagination.$(".active").size(), 1, "a pagination being selected has an element with an active class");
  Ember.run(function() {
    pagination.set("selection",  o3);
  });
  equal(pagination.$(".active").size(), 1, "a pagination being selected has an element with an active class");
  ok(!pagination.$("li:first").hasClass("active"), "a pagination not being selected is not an element with an active class");
  ok(pagination.$("li:last").hasClass("active"), "a pagination being selected has an element with an active class");
  
  equal(pagination.$("li a[href='#']").size(), 0, "a pagination with 3 components have no '#' as href");
  
  equal(pagination.$("li:first a").attr("href"), "1", "the first 'href' value is '1'");
  equal(pagination.$("li:last a").attr("href"), "3", "the last 'href' value is '3'");
});

