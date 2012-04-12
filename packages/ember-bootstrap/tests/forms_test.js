module("Bootstrap", {

});

test("human", function() {
  equal(Bootstrap.Forms.human(), undefined, "should not fail with undefined");

  equal(Bootstrap.Forms.human("hello world"), "Hello World", "should capitalize all the words");
  equal(Bootstrap.Forms.human("hello_world"), "Hello World", "should replace _ with spaces");
})
