var get = Ember.get, set = Ember.set;
var Bootstrap = window.Bootstrap;

Bootstrap.TypeSupport = Ember.Mixin.create({
  baseClassName: Ember.required(String),
  classNameBindings: ['typeClass'],
  type: null, // success, warning, error, info || inverse
  typeClass: Ember.computed(function() {
    var type = get(this, 'type'),
        baseClassName = get(this, 'baseClassName');
    return type ? baseClassName + '-' + type : null;
  }).property('type').cacheable()
});
