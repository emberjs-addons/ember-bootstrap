var get = Ember.get;

Bootstrap.Well = Ember.View.extend({
  template: Ember.Handlebars.compile('{{content}}'),
  classNames: 'well',
  content: null
});
