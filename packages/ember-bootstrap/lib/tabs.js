Ember.Tabs = Ember.CollectionView.extend({
  classNames: ['tabs'],
  tagName: 'ul',
  itemViewClass: Ember.PillItem,
  selection: null
});
