require("ember-bootstrap/mixins/item_selection_support");
require("ember-bootstrap/mixins/item_view_title_support");

var get = Ember.get, set = Ember.set;

Bootstrap.NavList = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-list'],
  tagName: 'ul',

  itemViewClass: Em.View.extend(Bootstrap.ItemSelectionSupport, Bootstrap.ItemViewTitleSupport, {
    template: Ember.Handlebars.compile("<a href='#'>{{title}}</a>")
  })
});
