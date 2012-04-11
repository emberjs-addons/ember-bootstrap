// Not done! 


var get = Ember.get;

Bootstrap.Breadcrumb = Ember.CollectionView.extend({
  tagName: 'ul',
  classNames: ['breadcrumb'],
  itemViewClass: Ember.View.extend(Bootstrap.ItemSelectionSupport, {
    template: Ember.Handlebars.compile("<a href='#'>{{title}}</a>")
  })

});
