var get = Ember.get;

Bootstrap.ItemViewTitleSupport = Ember.Mixin.create({
    title: Ember.computed(function() {
      var pV = get(this, "parentView"),
          content = get(this, "content");
      if (pV && content) {
        if ("string" === typeof content) {
          return content;
        } else {
          return get(content, get(pV, "itemTitleKey") || "title");
        }
      }
    }).property("parentView", "content").cacheable()
});
