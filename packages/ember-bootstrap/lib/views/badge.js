require('ember-bootstrap/mixins/type_support');

var Bootstrap = window.Bootstrap;
Bootstrap.Badge = Ember.View.extend(Bootstrap.TypeSupport, {
  tagName: 'span',
  classNames: ['badge'],
  baseClassName: 'badge',
  template: Ember.Handlebars.compile('{{view.content}}')
});
