require("ember-bootstrap/mixins/item_selection_support");

var get = Ember.get, set = Ember.set;
var Bootstrap = window.Bootstrap;

Bootstrap.NavList = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-list'],
  tagName: 'ul',

  itemViewClass: Ember.View.extend(Bootstrap.ItemSelectionSupport, {
    // template: Ember.Handlebars.compile("<a href='#'>{{view.title}}</a>") JAH Update
    template: Ember.Handlebars.compile('<a {{bindAttr href="view.content.href"}} {{bindAttr class="view.content.class"}}>{{view.content.title}}</a>')
  })
});
