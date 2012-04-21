require("ember-bootstrap/mixins/item_view_value_support");
require("ember-bootstrap/mixins/item_view_title_support");

var get = Ember.get, getPath = Ember.getPath, set = Ember.set;

Bootstrap.ItemSelectionSupport = Ember.Mixin.create(Bootstrap.ItemViewValueSupport, Bootstrap.ItemViewTitleSupport, {
  classNameBindings: ["isActive:active"],

  isActive: Ember.computed(function() {
    var parentView = get(this, 'parentView'),
        selection, value;
    if (!parentView) return false;
    selection = get(parentView, 'selection');
    value = get(this, 'value');
    return selection === value;
  }).property('parentView.selection', 'value').cacheable(),

  click: function(event) {
    var value = get(this, 'value'),
        parentView = get(this, 'parentView'),
        allowsEmptySelection = get(parentView, 'allowsEmptySelection');
        selection = get(parentView, 'selection');
    if (selection === value && allowsEmptySelection === true) {
      value = null;
    }
    set(parentView, 'selection', value);
    return false;
  }
});
