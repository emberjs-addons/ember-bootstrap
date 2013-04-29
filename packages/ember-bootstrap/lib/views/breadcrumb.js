require('ember-bootstrap/mixins/item_view_title_support');
require('ember-bootstrap/mixins/first_last_view_support');

var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.Breadcrumb = Ember.CollectionView.extend(Bootstrap.FirstLastViewSupport, {
  tagName: 'ul',
  classNames: ['breadcrumb'],
  divider: '/',
  arrayDidChange: function(content, start, removed, added) {
    var view, 
        index, 
        length,
        item,
        lastItemViewClass = get(this, 'lastItemViewClass'),
        itemViewClass = get(this, 'itemViewClass'),
        lastView;

    this._super.apply(this, arguments);

    if (!content)
      return;

    length = get(content, 'length');

    if (removed) {
      lastView = get(this, 'childViews.lastObject');

      if (lastItemViewClass.detectInstance(lastView))
        return;

      index = length - 1;

      view = this.createChildView(lastItemViewClass, {
        content: content[index],
        contentIndex: index
      });

      this.replace(index, 1, [view]);
    }

    if (added) {
      get(this, 'childViews').forEach(function(childView, index) {
        if (lastItemViewClass.detectInstance(childView) && index !== length - 1) {
          view = this.createChildView(itemViewClass, {
            content: content[index],
            contentIndex: index
          });

          this.replace(index, 1, [view]);
        }
      }, this);

    }

  },
  itemViewClass: Ember.View.extend(Bootstrap.ItemViewTitleSupport, {
    template: Ember.Handlebars.compile('<a href="#">{{view.title}}</a><span class="divider">{{view.parentView.divider}}</span>')
  }),
  lastItemViewClass: Ember.View.extend(Bootstrap.ItemViewTitleSupport, {
    classNames: ['active'],
    template: Ember.Handlebars.compile('{{view.title}}')
  })
});

// 1 2 3 
// 1 2 3 4 5 6
// [] 3 0 3

// 1 2 3 
// 1 2 3 4
// [] 3 0 1




