require("ember-bootstrap/mixins/add_classes_support");


var Bootstrap = window.Bootstrap;

Bootstrap.Forms.Select = Bootstrap.Forms.Field.extend({
  optionLabelPath: 'content',
  optionValuePath: 'content',

  inputField: Ember.Select.extend(Bootstrap.AddClassesSupport, {
    contentBinding:         'parentView.content',

    optionLabelPathBinding: 'parentView.optionLabelPath',
    optionValuePathBinding: 'parentView.optionValuePath',

    valueBinding:           'parentView.value',
    selectionBinding:       'parentView.selection',
    promptBinding:          'parentView.prompt',
    multipleBinding:        'parentView.multiple',
  })
});
