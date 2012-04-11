var get = Ember.get;

Bootstrap.Thumbnails = Ember.CollectionView.extend({
  tagName: 'ul',
  classNames: ['thumbnails'],
  content: null,

  thumbnailViewClass: Ember.View.extend({
  	tagName: 'a',
  	classNames: ['thumbnail']
  })
});
