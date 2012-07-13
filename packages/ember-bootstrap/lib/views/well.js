var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.Well = Ember.View.extend({
  template: Ember.Handlebars.compile('{{content}}'),
  classNames: 'well',
  content: null
});
