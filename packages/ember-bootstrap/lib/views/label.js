require("ember-bootstrap/views/type_support");

var get = Ember.get;

Bootstrap.Label = Ember.View.extend(Bootstrap.TypeSupport, {
  classNames: 'label',
  typeName: 'label',
  content: null
});
