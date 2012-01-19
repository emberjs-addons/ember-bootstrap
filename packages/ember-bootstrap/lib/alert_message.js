var get = Ember.get;

Ember.AlertMessage = Ember.View.extend({
  classNameBindings: 'type',
  classNames: ['alert-message'],
  template: Ember.Handlebars.compile('<a class="close" rel="close" href="#">×</a><p>{{message}}</p>'),
  type: 'warning',
  message: null,
  removeAfter: null,

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
