var Bootstrap = window.Bootstrap;

Bootstrap.Forms.Select = Bootstrap.Forms.Field.extend({
  optionLabelPath: 'content',
  optionValuePath: 'content',

  inputField: Ember.Select.extend({
    contentBinding:         'parentView.content',

    optionLabelPathBinding: 'parentView.optionLabelPath',
    optionValuePathBinding: 'parentView.optionValuePath',

    valueBinding:           'parentView.value',
    selectionBinding:       'parentView.selection',
    promptBinding:          'parentView.prompt',
    multipleBinding:        'parentView.multiple',
    disabledBinding:        'parentView.disabled',
    classNameBindings:      ['parentView.inputClassNames'],
    name: Ember.computed(function() {
      return this.get('parentView.name') || this.get('parentView.label');
    }).property('parentView.name', 'parentView.label')    
  })
});
