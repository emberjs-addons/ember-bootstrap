var get = Ember.get;
var fmt = Ember.String.fmt;
var Bootstrap = window.Bootstrap;

Bootstrap.ProgressBar = Ember.View.extend({
  classNames: ['progress'],
  classNameBindings: ['isStriped:progress-striped', 'isAnimated:active'],
  template: Ember.Handlebars.compile('<div class="bar" {{bindAttr style="view.style"}}></div>'),
  isAnimated: false,
  isStriped: false,
  progress: 0,

  style: Ember.computed(function() {
    var progress = get(this, 'progress');
    
    return fmt('width:%@%;', [progress]);
  }).property('progress').cacheable()
});
