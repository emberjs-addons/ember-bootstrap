Bootstrap.Forms.TextField = Bootstrap.Forms.Field.extend({

  inputField: Ember.TextField.extend({
    valueBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    attributeBindings: ['name']
  })
});
