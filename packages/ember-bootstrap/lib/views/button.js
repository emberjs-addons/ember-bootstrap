require("ember-bootstrap/mixins/type_support");
require("ember-bootstrap/mixins/size_support");

var get = Ember.get;

Bootstrap.Button = Ember.Button.extend(Bootstrap.TypeSupport, Bootstrap.SizeSupport, {
  classNames: ['btn'],
  classNameBindings: ['typeClass', 'sizeClass', 'disabled'],

  typeClass: Ember.computed(function() {
    var type = get(this, 'type');
    return type ? 'btn-' + type : null;
  }).property('type').cacheable(),

  sizeClass: Ember.computed(function() {
    var size = get(this, 'size');
    return size ? 'btn-' + size : null;
  }).property('size').cacheable(),

  baseClassName: 'btn'
});
