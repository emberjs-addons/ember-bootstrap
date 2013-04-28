var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.ItemViewHrefSupport = Ember.Mixin.create({
  href: Ember.computed(function() {
    var parentView = get(this, 'parentView'),
        content, hrefKey;
    content = get(this, 'content');
    if (parentView) {
      hrefKey = get(parentView, 'itemHrefKey') || 'link';
      return get(content, hrefKey) || '#';
    }
    return content;
  }).property('content').cacheable()
});
