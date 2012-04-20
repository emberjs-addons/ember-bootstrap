require("ember-bootstrap/mixins/type_support");
require("ember-bootstrap/mixins/size_support");

var get = Ember.get;

Bootstrap.Button = Ember.Button.extend(Bootstrap.TypeSupport, Bootstrap.SizeSupport, {
  classNames: ['btn'],
  classNameBindings: ['disabled'],
  baseClassName: 'btn'
});
