var Bootstrap = window.Bootstrap;
Bootstrap.Forms.Field = Ember.View.extend({
  tagName: 'div',
  classNames: ['control-group'],
  labelCache: undefined,
  help: undefined,
  template: Ember.Handlebars.compile([
    '{{view view.labelView viewName="labelView"}}',
    '<div class="controls">',
    '  {{view view.inputField viewName="inputField"}}',
    '  {{view view.errorsView}}',
    '  {{view view.helpView}}',
    '</div>'].join("\n")),

  label: Ember.computed(function(key, value) {
    if(arguments.length === 1){
      if(this.get('labelCache') === undefined){
        var path = this.get('valueBinding._from');
        if (path) {
          path = path.split(".");
          return path[path.length - 1];
        }
      } else {
        return this.get('labelCache');
      }
    } else {
      this.set('labelCache', value);
      return value;
    }
  }).property(),

  labelView: Ember.View.extend({
    tagName: 'label',
    classNames: ['control-label'],
    template: Ember.Handlebars.compile('{{view.value}}'),

    value: Ember.computed(function(key, value) {
      var parent = this.get('parentView');

      if (value && value !== parent.get('label')) {
        parent.set('label', value);
      } else {
        value = parent.get('label');
      }

      // If the labelCache property is present on parent, then the 
      // label was set manually, and there's no need to humanise it.
      // Otherwise, it comes from the binding and needs to be 
      // humanised.
      return parent.get('labelCache') === undefined || parent.get('labelCache') === false ? 
        Bootstrap.Forms.human(value) : value;
    }).property('parentView.label'),

    inputElementId: 'for',
    forBinding: 'inputElementId',
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
      var parent = this.get('parentView');

      if (parent !== null) {
        var context = parent.get('context');

        if (context !== null && !context.get('isValid')) {
          var errors = context.get('errors');
          var path = parent.get('valueBinding._from');

          if (path) {
            path = path.split(".");
            path = path[path.length - 1];
          } else {
            path = parent.get('label');
          }

          if (errors !== undefined && path in errors) {
            parent.$().addClass('error');
            this.$().html(errors[path].join(', '));
          } else {
            parent.$().removeClass('error');
            this.$().html('');
          }
        } else {
          parent.$().removeClass('error');
          this.$().html('');
        }
      }
    }, 'parentView.context.isValid', 'parentView.label')
  }),

  helpView: Ember.View.extend({
    tagName: 'div',
    classNames: ['help-block'],
    template: Ember.Handlebars.compile('{{view.content}}'),
    contentBinding: 'parentView.help'
  }),

  didInsertElement: function() {
    this.set('labelView.inputElementId', this.get('inputField.elementId'));
  }
});
