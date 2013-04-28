var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.SizeSupport = Ember.Mixin.create({
  baseClassName: Ember.required(String),
  classNameBindings: ['sizeClass'],
  size: null, // mini, small || large
  sizeClass: Ember.computed(function() {
    var size = get(this, 'size'),
        baseClassName = get(this, 'baseClassName');
    return size ? baseClassName + '-' + size : null;
  }).property('size').cacheable()
});
