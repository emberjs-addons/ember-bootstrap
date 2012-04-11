require("ember-bootstrap/views/type_support");

var get = Ember.get;

Bootstrap.Badge = Ember.View.extend(Bootstrap.TypeSupport, {
  typeName: 'badge',
  content: null
});
