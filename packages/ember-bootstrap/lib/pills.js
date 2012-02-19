Ember.Pills = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-pills'],
  classNameBindings: ['isStacked:nav-stacked'],
  tagName: 'ul',
  itemViewClass: Ember.PillItem,
  selection: null
});
