Ember.Tabs = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-tabs'],
  classNameBindings: ['isStacked:nav-stacked'],
  tagName: 'ul',
  itemViewClass: Ember.PillItem,
  selection: null
});
