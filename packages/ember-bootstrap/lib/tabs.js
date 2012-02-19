Ember.Tabs = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-tabs'],
  tagName: 'ul',
  itemViewClass: Ember.PillItem,
  selection: null
});
