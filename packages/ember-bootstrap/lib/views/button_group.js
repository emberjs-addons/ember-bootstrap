require("ember-bootstrap/views/button");

Bootstrap.ButtonGroup = Ember.CollectionView.extend({
  classNames: ['btn-group'],
  itemViewClass: Bootstrap.Button.extend({
    tagName: 'a',
    template: Ember.Handlebars.compile('{{view.content}}')
  })
});
