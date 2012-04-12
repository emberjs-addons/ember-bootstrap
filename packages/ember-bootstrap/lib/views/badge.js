require("ember-bootstrap/views/type_support");

var get = Ember.get;

Bootstrap.Badge = Ember.View.extend(Bootstrap.TypeSupport, {
  classNames: 'badge',
  typeName: 'badge',
  content: null
});
