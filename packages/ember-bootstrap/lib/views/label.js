require('ember-bootstrap/mixins/type_support');
var Bootstrap = window.Bootstrap;

Bootstrap.Label = Ember.View.extend(Bootstrap.TypeSupport, {
  tagName: 'span',
  classNames: ['label'],
  baseClassName: 'label',
  template: Ember.Handlebars.compile('{{view.content}}')
});
