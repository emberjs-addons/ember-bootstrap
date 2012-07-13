var getPath = Ember.getPath;
var Bootstrap = window.Bootstrap;

Bootstrap.TextSupport = Ember.Mixin.create({
  valueBinding: 'parentView.value',
  placeholderBinding: 'parentView.placeholder',
  disabledBinding: 'parentView.disabled',
  maxlengthBinding: 'parentView.maxlength',
  classNameBindings: 'parentView.inputClassNames',
  attributeBindings: ['name'],
  name: Ember.computed(function() {
    return getPath(this, 'parentView.name') || getPath(this, 'parentView.label');
  }).property('parentView.name', 'parentView.label').cacheable()
});
