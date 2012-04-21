require("ember-bootstrap/mixins/item_selection_support");

var get = Ember.get, set = Ember.set;

Bootstrap.NavList = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-list'],
  tagName: 'ul',
  itemTitleKey: 'title',
  itemViewClass: Em.View.extend(Bootstrap.ItemSelectionSupport, {
    template: Ember.Handlebars.compile('<a href="#">{{title}}</a>')
  })
});
