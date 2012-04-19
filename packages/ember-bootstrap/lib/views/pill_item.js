require("ember-bootstrap/views/item_selection_support");

Bootstrap.PillItem = Ember.View.extend(Bootstrap.ItemSelectionSupport, {
  template: Ember.Handlebars.compile('<a href="#">{{title}}</a>')
});
