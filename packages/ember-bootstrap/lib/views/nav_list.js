var Bootstrap = window.Bootstrap;
Bootstrap.NavList = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-list'],
  tagName: 'ul',
  itemViewClass: Bootstrap.PillItem,
  selection: null
});
