var getPath = Ember.getPath;

Bootstrap.TextSupport = Ember.Mixin.create({
  valueBinding: 'parentView.value',
  placeholderBinding: 'parentView.placeholder',
  disabledBinding: 'parentView.disabled',
  maxlengthBinding: 'parentView.maxlength',
  nameBinding: 'parentView.label',
  attributeBindings: ['name']
});

