require("ember-bootstrap/mixins/item_selection_support");

var Bootstrap = window.Bootstrap;
Bootstrap.PillItem = Ember.View.extend(Bootstrap.ItemSelectionSupport, {
  template: Ember.Handlebars.compile('<a href="#">{{view.title}}</a>')
});
