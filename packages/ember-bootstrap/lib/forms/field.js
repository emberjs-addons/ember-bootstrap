Bootstrap.Forms.Field = Ember.View.extend({
  tagName: 'div',
  classNameBindings: [':form-group', 'isValid:has-no-error:has-error'],
  labelCache: undefined,
  help: undefined,
  isValid: true,
  template: Ember.Handlebars.compile([
    '{{view view.labelView viewName="labelView"}}',
    '{{view view.inputField viewName="inputField"}}',
    '{{view view.errorsView}}',
    '{{view view.helpView}}'].join("\n")),

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
    classNames: ['ember-bootstrap-extend', 'form-control'],
    tagName: 'div',
    template: Ember.Handlebars.compile('This class is not meant to be used directly, but extended.')
  }),

  errorsView: Ember.View.extend({
    tagName: 'div',
    classNames: ['errors', 'help-inline'],
    template: Ember.Handlebars.compile('{{view.message}}'),

    message: Ember.computed(function(key, value) {
      var parent = this.get('parentView');

      if (parent != null) {
        var binding = parent.get('valueBinding._from');
        var fieldName = null;
        var object = null;

        if (binding) {
          binding = binding.replace("_parentView.", "").split(".");
          fieldName = binding[binding.length - 1];
          object = parent.get(binding.slice(0, binding.length-1).join('.'));
        } else {
          fieldName = parent.get('label');
          object = parent.get('context');
        }

        if (object && !object.get('isValid')) {
          var errors = object.get('errors');

          if (errors && fieldName in errors && !Ember.isEmpty(errors[fieldName])) {
            parent.set('isValid', false);
            return errors[fieldName].join(', ');
          } else {
            parent.set('isValid', true);
            return '';
          }
        } else {
          parent.set('isValid', true);
          return '';
        }
      }
    }).property('parentView.context.isValid', 'parentView.label')
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
