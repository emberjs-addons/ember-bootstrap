var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.FirstLastViewSupport = Ember.Mixin.create({
  createChildView: function(view, attrs) {
    if (attrs) {
      var content = get(this, "content");
      if (attrs.contentIndex === 0) {
        view = get(this, "firstItemViewClass") || view;
      }
      if (attrs.contentIndex === (content.get("length") - 1)) {
        view = get(this, "lastItemViewClass") || view;
      }
    }
    return this._super(view, attrs);
  }
});
