var get = Ember.get;

Bootstrap.ItemViewTitleSupport = Ember.Mixin.create({
  title: Ember.computed(function() {
    var parentView = get(this, 'parentView'),
        content, titleKey;
    content = get(this, 'content');
    if (parentView) {
      titleKey = get(parentView, 'itemTitleKey');
      if (titleKey) return get(content, titleKey) || content;
    }
    return content;
  }).property('content').cacheable()
});