var get = Ember.get, getPath = Ember.getPath, set = Ember.set;

Bootstrap.ItemSelectionSupport = Ember.Mixin.create({
  classNameBindings: ['isActive:active'],

  title: Ember.computed(function() {
    var parentView = get(this, 'parentView'),
        content, titleKey;
    content = get(this, 'content');
    if (parentView) {
      titleKey = get(parentView, 'itemTitleKey');
      if (titleKey) return get(content, titleKey);
    }
    return content;
  }).property('content').cacheable(),

  value: Ember.computed(function() {
    var parentView = get(this, 'parentView'),
        content, valueKey;
    if (!parentView) return null;
    content = get(this, 'content');
    valueKey = get(parentView, 'itemValueKey');
    if (valueKey) return get(content, valueKey);
    return content;
  }).property('content').cacheable(),

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
