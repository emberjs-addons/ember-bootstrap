var get = Ember.get, set = Ember.set, A = Ember.A;
var pager;

module("Bootstrap.Pager", {
  setup: function() {
  },
  teardown: function() {
    destroyIfNecessary(pager);
  }
});

test("a pager can be created and appended to DOM", function() {
  pager = Bootstrap.Pager.create();
  appendIntoDOM(pager);
  ok(isAppendedToDOM(pager), "a pager has a layer in the DOM");
});

test("a pager has defaults", function() {
  pager = Bootstrap.Pager.create();
  appendIntoDOM(pager);
  equal(pager.$("li").size(), 2, "a pager has 2 children");

  ok(!pager.$().children(":first").hasClass("previous"), "the first pager child does not have previous class");
  ok(!pager.$().children(":last").hasClass("next"), "the last (second) pager child does not have next class");

  equal(pager.$().children(":first").text(), "←", "the first pager child text should be '&larr;'");
  equal(pager.$().children(":last").text(), "→", "the last (second) pager child text should be '&arr;'");
});

test("a pager binds content to innerHTML anchor", function() {
  pager = Bootstrap.Pager.create({ content: new A([Ember.Object.create({title:"previous"}), Ember.Object.create({title:"next"})]) });
  appendIntoDOM(pager);
  equal(pager.$().children(":first").text(), "previous", "the first pager child text should be 'previous'");
  equal(pager.$().children(":last").text(), "next", "the last (second) pager child text should be 'next'");
  Ember.run(function() {
    pager.set("content.firstObject.title", "previous");
    pager.set("content.lastObject.title", "next");
  });
  equal(pager.$().children(":first").text(), "previous", "the first pager child text should be 'previous'");
  equal(pager.$().children(":last").text(), "next", "the last (second) pager child text should be 'next'");
  Ember.run(function() {
    pager.set("content", new A([Ember.Object.create({title:"< previous"}), Ember.Object.create({title:"next >"})]) );
  });
  equal(pager.$().children(":first").text(), "< previous", "the first pager child text should be '< previous'");
  equal(pager.$().children(":last").text(), "next >", "the last (second) pager child text should be 'next >'");
});

test("a pager binds previous/next attributes to classes", function() {
  pager = Bootstrap.Pager.create();
  appendIntoDOM(pager);
  Ember.run(function() {
    pager.set("content.firstObject.previous", true);
    pager.set("content.lastObject.next", true);
  });  
  ok(pager.$().children(":first").hasClass("previous"), "the first pager child has a previous class");
  ok(pager.$().children(":last").hasClass("next"), "the last (second) pager child has a next class");
});

test("a pager binds disabled attributes to classes", function() {
  pager = Bootstrap.Pager.create();
  appendIntoDOM(pager);
  Ember.run(function() {
    pager.set("content.firstObject.disabled", true);
  });  
  ok(pager.$().children(":first").hasClass("disabled"), "the first pager child has a 'disabled' class");
  ok(!pager.$().children(":last").hasClass("disabled"), "the last (second) pager child does not have a 'disabled' class");
  Ember.run(function() {
    pager.set("content.firstObject.disabled", false);
    pager.set("content.lastObject.disabled", true);
  });  
  ok(!pager.$().children(":first").hasClass("disabled"), "the first pager child has a 'disabled' class");
  ok(pager.$().children(":last").hasClass("disabled"), "the last (second) pager child does not have a 'disabled' class");
});

// TODO Test the href....
