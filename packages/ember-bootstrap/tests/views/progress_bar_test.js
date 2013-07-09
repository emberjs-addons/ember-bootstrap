var get = Ember.get, set = Ember.set, A = Ember.A;
var progressBar;

module("Bootstrap.ProgressBar", {
  setup: function() {
  },
  teardown: function() {
    destroyIfNecessary(progressBar);
  }
});

test("a progress bar can be created and appended to DOM", function() {
  progressBar = Bootstrap.ProgressBar.create();
  appendIntoDOM(progressBar);
  ok(isAppendedToDOM(progressBar), 'a progress bar has a layer in the DOM');
});

test("a progress bar binds progress as a width to inner bar div", function() {
  progressBar = Bootstrap.ProgressBar.create({ progress: 50 });
  appendIntoDOM(progressBar);
  equal(progressBar.$().find('.bar').attr('style'), 'width:50%;',
        'a progress bar binds progress as inner bar width');
});

test("a progress bar binds striped class based on isStriped", function() {
  progressBar = Bootstrap.ProgressBar.create({ isStriped: true, progress: 50 });
  appendIntoDOM(progressBar);
  ok(progressBar.$().hasClass('progress-striped'), 'a progress bar has striped class');
});

test("a progress bar binds active class based on isAnimated", function() {
  progressBar = Bootstrap.ProgressBar.create({ isStriped: true, isAnimated: true, progress: 50 });
  appendIntoDOM(progressBar);
  ok(progressBar.$().hasClass('progress-striped'), 'a progress bar has striped class');
});

