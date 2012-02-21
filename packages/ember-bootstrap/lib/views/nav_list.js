require("ember-bootstrap/views/item_selection_support");

var get = Ember.get, set = Ember.set;

Bootstrap.NavList = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-list'],
  tagName: 'ul',
  itemTitleKey: 'title',

  itemViewClass: SC.View.extend(Bootstrap.ItemSelectionSupport, {
    template: Ember.Handlebars.compile("<a href='#'>{{title}}</a>"),

    title: Ember.computed(function() {
      var pV = get(this, 'parentView'),
          content = get(this, 'content');
      if (pV && content) {
        if ('string' === typeof content) {
          return content;
        } else {
          return get(content, get(pV, 'itemTitleKey'));
        }
      }
    }).property('parentView', 'content').cacheable()
  })
});
