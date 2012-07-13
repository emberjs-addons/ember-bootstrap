var jQuery = window.jQuery;
window.clickRelLink = function(view, relName) {
  var selector = 'a[rel=' + relName + ']',
      element = view.$().find(selector);
  ok(element);
  element.click();
  return element;
};

window.appendIntoDOM = function(view) {
  Ember.run(function() {
    view.append() ;
  });
};

window.isAppendedToDOM = function(view) {
  return view.$().length > 0;
};

window.isDestroyed = function(object) {
  return object.get('isDestroyed');
};

window.documentHasSelector = function(selector) {
  return jQuery(selector).length > 0;
};

window.destroyIfNecessary = function(object) {
  if (object && !object.get('isDestroyed')) {
    object.destroy();
  }
};
