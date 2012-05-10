var get = Ember.get;

Bootstrap.Button = Ember.Button.extend({
  classNames: ['btn'],
  classNameBindings: ['typeClass', 'sizeClass', 'disabled'],

  typeClass: Ember.computed(function() {
    var type = get(this, 'type');
    return type ? 'btn-' + type : null;
  }).property('type').cacheable(),

  sizeClass: Ember.computed(function() {
    var size = get(this, 'size');
    return size ? 'btn-' + size : null;
  }).property('size').cacheable()
});
