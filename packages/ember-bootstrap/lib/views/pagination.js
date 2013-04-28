require('ember-bootstrap/mixins/item_selection_support');
require('ember-bootstrap/mixins/item_view_href_support');

var get = Ember.get, set = Ember.set, A = Ember.A;
var Bootstrap = window.Bootstrap;

Bootstrap.Pagination = Ember.CollectionView.extend({
  tagName: 'ul',
  classNames: ['pagination'],
  itemTitleKey: 'title',
  itemHrefKey: 'href',
  init: function() {
    this._super();
    if (!this.get('content')) {
      this.set('content', new A([]));
    }
  },
  itemViewClass: Ember.View.extend(Bootstrap.ItemSelectionSupport, Bootstrap.ItemViewHrefSupport, {
    classNameBindings: ['content.disabled'],
    template: Ember.Handlebars.compile('<a {{bindAttr href="view.href"}}>{{view.title}}</a>')
  })
});
