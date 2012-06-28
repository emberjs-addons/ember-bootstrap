Bootstrap.Forms.Field = Ember.View.extend({
  tagName: 'div',
  classNames: ['control-group'],
  template: Ember.Handlebars.compile('\
    {{view view.labelView}}\
    <div class="controls">\
      {{view view.inputField}}\
      {{view view.errorsView}}\
    </div>'),

  labelView: Ember.View.extend({
    tagName: 'label',
    classNames: ['control-label'],
    template: Ember.Handlebars.compile('{{view.value}}'),

    value: Ember.computed(function(key, value) {
      var parent = this.get('parentView');

      if (value && value != parent.get('label')) {
        parent.set('label', value);
      } else {
        value = parent.get('label');
      }

      return Bootstrap.Forms.human(value);
    }).property('parentView.label'),

    forBinding: 'value',
    attributeBindings: ['for']
  }),

  inputField: Ember.View.extend({
    classNames: ['ember-bootstrap-extend'],
    tagName: 'div',
    template: Ember.Handlebars.compile('This class is not meant to be used directly, but extended.')
  }),

  errorsView: Ember.View.extend({
    tagName: 'div',
    classNames: ['errors', 'help-inline'],

    _updateContent: Ember.observer(function() {
      parent = this.get('parentView');

      if (parent !== null) {
        context = parent.get('bindingContext');
        label = parent.get('label');

        if (context !== null && !context.get('isValid')) {
          errors = context.get('errors');

          if (errors != null && errors[label] !== null) {
            parent.$().addClass('error')
            this.$().html(errors[label].join(', '));
          } else {
            parent.$().removeClass('error')
            this.$().html('');
          }
        } else {
          parent.$().removeClass('error')
          this.$().html('');
        }
      }
    }, 'parentView.bindingContext.isValid', 'parentView.label')
  })
});
