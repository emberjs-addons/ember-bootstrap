Ember.AlertMessage = Ember.View.extend({
  classNameBindings: 'type',
  classNames: 'alert-message',
  template: Ember.Handlebars.compile('<a class="close" rel="close" href="#">×</a><p>{{text}}</p>'),
  type: 'warning',

  click: function(event) {
    var target = jQuery(event.target),
        targetRel = target.attr('rel');
    if (targetRel === 'close') {
      this.destroy();
      return false;
    }
  }
});
