require('ember-bootstrap/mixins/item_selection_support');
require('ember-bootstrap/mixins/item_view_href_support');

var Bootstrap = window.Bootstrap;
Bootstrap.PillItem = Ember.View.extend(Bootstrap.ItemSelectionSupport, Bootstrap.ItemViewHrefSupport, {
  template: Ember.Handlebars.compile('{{view view.item}}'),

  item: Ember.View.extend({
    tagName: 'a',
    template: Ember.Handlebars.compile('{{view.parentView.title}}'),
    attributeBindings: ['href'],
    hrefBinding: 'parentView.href'
  })
});
