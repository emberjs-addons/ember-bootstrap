module("Bootstrap", {});

test("human", function() {
  equal(Bootstrap.Forms.human(), undefined,      "should not fail with undefined");
  equal(Bootstrap.Forms.human(false), undefined, "should swallow false values");

  equal(Bootstrap.Forms.human("hello there world"), "Hello There World", "should capitalize all the words");
  equal(Bootstrap.Forms.human("hello_there_world"), "Hello There World", "should replace _ with spaces");
  equal(Bootstrap.Forms.human("helloThereWorld"), "Hello There World", "should decamelize");

});
