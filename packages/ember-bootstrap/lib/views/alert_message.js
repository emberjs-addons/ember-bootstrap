require("ember-bootstrap/mixins/type_support");

var get = Ember.get;

Bootstrap.AlertMessage = Ember.View.extend(Bootstrap.TypeSupport, {
  classNames: ['alert', 'alert-message'],
  baseClassName: 'alert',
  template: Ember.Handlebars.compile('<a class="close" rel="close" href="#">×</a>{{{message}}}'),
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
