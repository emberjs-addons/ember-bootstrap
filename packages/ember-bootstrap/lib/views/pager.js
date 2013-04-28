require('ember-bootstrap/mixins/item_view_title_support');
require('ember-bootstrap/mixins/item_view_href_support');

var Bootstrap = window.Bootstrap;
Bootstrap.Pager = Ember.CollectionView.extend({
  tagName: 'ul',
  classNames: ['pager'],
  itemTitleKey: 'title',
  itemHrefKey: 'href',
  init: function() {
    this._super();
    if (!this.get('content')) {
      this.set('content', Ember.A([
                                  Ember.Object.create({ title: '&larr;' }), 
                                  Ember.Object.create({ title: '&rarr;' })
      ]));
    }
  },
  itemViewClass: Ember.View.extend(Bootstrap.ItemViewTitleSupport, Bootstrap.ItemViewHrefSupport, {
    classNameBindings: ['content.next', 'content.previous', 'content.disabled'],
    template: Ember.Handlebars.compile('<a {{bindAttr href="view.href"}}>{{{view.title}}}</a>')
  }),
  arrayDidChange: function(content, start, removed, added) {
    if (content) {
      Ember.assert('content must always has at the most 2 elements', content.get('length') <= 2);
    }
    return this._super(content, start, removed, added);
  }
});
