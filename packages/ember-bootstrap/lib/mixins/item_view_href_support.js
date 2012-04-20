var get = Ember.get;

Bootstrap.ItemViewHrefSupport = Ember.Mixin.create({
    href: Ember.computed(function() {
      var pV = get(this, "parentView"),
          content = get(this, "content");
      if (pV && content) {
        if ("string" === typeof content) {
          return content;
        } else {
          return get(content, get(pV, "itemHrefKey") || "href") || "#";
        }
      }
    }).property("parentView", "content").cacheable()
});
