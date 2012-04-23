var get = Ember.get, getPath = Ember.getPath, set = Ember.set;

Bootstrap.ItemSelectionSupport = Ember.Mixin.create({
  classNameBindings: ['isActive:active'],

  title: Ember.computed(function() {
    var parentView = get(this, 'parentView'),
        content = get(this, 'content'),
        titleKey;
    if (parentView) {
      titleKey = get(parentView, 'itemTitleKey');
      if (titleKey) return get(content, titleKey);
    }
    return content;
  }).property('content', 'parentView').cacheable(),

  value: Ember.computed(function() {
    var parentView = get(this, 'parentView'),
        content = get(this, 'content'),
        valueKey;
    if (parentView) {
      valueKey = get(parentView, 'itemValueKey');
      if (valueKey) return get(content, valueKey);
    }
    return content;
  }).property('content', 'parentView').cacheable(),

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
        allowsEmptySelection = get(parentView, 'allowsEmptySelection'),
        selection = get(parentView, 'selection');
    if (allowsEmptySelection === true && selection === value) {
      value = null;
    }
    set(parentView, 'selection', value);
    return false;
  }
});
