clickRelLink = function(view, relName) {
  var selector = 'a[rel=' + relName + ']',
      element = view.$().find(selector);
  ok(element);
  element.click();
  return element;
}
