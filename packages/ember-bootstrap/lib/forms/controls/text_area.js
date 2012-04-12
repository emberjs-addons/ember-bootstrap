Bootstrap.Forms.TextArea = Bootstrap.Forms.Field.extend({

  inputField: Ember.TextArea.extend({
    valueBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    attributeBindings: ['name']
  })
});
