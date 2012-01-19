Ember.Pills = Ember.CollectionView.extend({
  classNames: ['pills'],
  tagName: 'ul',
  itemViewClass: Ember.PillItem,
  selection: null
});
