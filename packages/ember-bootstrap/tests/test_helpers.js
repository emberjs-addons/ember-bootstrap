clickRelLink = function(view, relName) {
  var selector = 'a[rel=' + relName + ']',
      element = view.$().find(selector);
  ok(element);
  element.click();
  return element;
};

appendIntoDOM = function(view) {
  Ember.run(function() {
    view.append() ;
  });
};

isAppendedToDOM = function(view) {
  return view.$().length > 0;
};

isDestroyed = function(object) {
  return object.get('isDestroyed');
};

documentHasSelector = function(selector) {
  return jQuery(selector).length > 0;
}
