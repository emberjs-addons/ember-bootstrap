require("ember-bootstrap/views/item_selection_support");

var get = Ember.get, getPath = Ember.getPath, set = Ember.set;

Bootstrap.PillItem = Ember.View.extend(Bootstrap.ItemSelectionSupport, {
  template: Ember.Handlebars.compile('<a href="#">{{content}}</a>')
});
