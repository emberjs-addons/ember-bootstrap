Ember.Pills = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-pills'],
  tagName: 'ul',
  itemViewClass: Ember.PillItem,
  selection: null
});
