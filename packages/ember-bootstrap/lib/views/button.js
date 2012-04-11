var get = Ember.get;

Bootstrap.Button = Ember.Button.extend({
  classNames: ['btn'],
  classNameBindings: ['typeClass', 'sizeClass', 'disabled'],
  size: 'small',

  typeClass: Ember.computed(function() {
  	var type = get(this, 'type');
    return type ? 'btn-' + type : null;
  }).property('type').cacheable(),
  
  sizeClass: Ember.computed(function() {
    return 'btn-' + get(this, 'size');
  }).property('size').cacheable()
});
