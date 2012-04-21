var get = Ember.get;

Bootstrap.ItemViewHrefSupport = Ember.Mixin.create({
  href: Ember.computed(function() {
    var parentView = get(this, 'parentView'),
        content, hrefKey;
    content = get(this, 'content');
    if (parentView) {
      hrefKey = get(parentView, 'itemHrefKey');
      if (hrefKey) return get(content, hrefKey) || "#";
    }
    return content;
  }).property('content').cacheable()
});
