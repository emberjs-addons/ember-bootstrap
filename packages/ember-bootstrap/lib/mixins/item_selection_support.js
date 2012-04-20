var get = Ember.get, getPath = Ember.getPath, set = Ember.set;

Bootstrap.ItemSelectionSupport = Ember.Mixin.create({
  classNameBindings: ["isActive:active"],

  isActive: Ember.computed(function() {
    var selection = getPath(this, "parentView.selection"),
        content = get(this, "content");
    return selection === content;
  }).property("parentView.selection", "content").cacheable(),

  click: function(event) {
    var content = get(this, "content"),
        parentView = get(this, "parentView"),
        allowsEmptySelection = get(parentView, "allowsEmptySelection");
        selection = get(parentView, "selection");
    if (selection === content && allowsEmptySelection === true) {
      content = null;
    }
    set(parentView, "selection", content);
    return false;
  }
});
