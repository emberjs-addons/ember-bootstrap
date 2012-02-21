var get = Ember.get;

Bootstrap.AlertMessage = Ember.View.extend({
  classNames: ['alert', 'alert-message'],
  classNameBindings: 'typeClass',
  template: Ember.Handlebars.compile('<a class="close" rel="close" href="#">×</a>{{{message}}}'),
  type: 'warning',
  message: null,
  removeAfter: null,

  typeClass: Ember.computed(function() {
    return 'alert-' + get(this, 'type');
  }).property('type').cacheable(),

  didInsertElement: function() {
    var removeAfter = get(this, 'removeAfter');
    if (removeAfter > 0) {
      Ember.run.later(this, 'destroy', removeAfter);
    }
  },

  click: function(event) {
    var target = jQuery(event.target),
        targetRel = target.attr('rel');
    if (targetRel === 'close') {
      this.destroy();
      return false;
    }
  }
});
